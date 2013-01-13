var pacman = (function() {
    // animation frame
    var frame = 0;

    var screen;

    // blinky gains speed when there are specific amounts of pellets left,
    // this is called elroy mode, blinky gains this twice per level
    // elroy trigger levels
    var elroy1Trigger = 0;
    var elroy2Trigger = 0;

    function updateElroy() {
        elroy1Trigger = pacman.tools.elroyLevel();
        elroy2Trigger = elroy1Trigger / 2;
    }

    // game loop
    function tick() {
        pacman.frame++;
        pacman.frame %= 30;
        // check if there is any input and if yes, add new input to pac-man
        var movement = pacman.keyhandler.getMovement();
        if (movement !== null) {
            pacman.player.newMovement = movement;
        }
        // move all
        moveObjects();

        // animate all
        animateObjects();

        // collisions
        pacman.player.checkCollisions();
        // eat everything at pac-man's position and if ate something check for elroy trigger
        if (pacman.player.eat()) {
            if (pacman.pelletCount === elroy1Trigger) {
                pacman.ghosts[0].elroyLevel = 1;
            } else if (pacman.pelletCount === elroy2Trigger) {
                pacman.ghosts[0].elroyLevel = 2;
            } else if (pacman.pelletCount === 0) {
                // next level!
                nextLevel();
            }
        }
    }

    // object group functions

    function moveObjects() {
        // move pac-man
        pacman.player.move();
        // move ghosts
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.move();
        });
    }

    function animateObjects() {
        // Pac-Man
        pacman.player.animate();
        // ghosts
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.animate();
        });
    }

    function setObjectsMode(mode) {
        // pac-man
        pacman.player.setMode(mode);
        // ghosts
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.setMode(mode);
        });
    }

    function resetObjects() {
        pacman.player.reset();
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.reset();
        });
    }

    // mode start and interval functions

    function startMode(mode) {
        pacman.mode = mode;
        setObjectsMode(mode);
    }

    function startChase() {

        startMode("chase");
        pacman.modeTimeout = setTimeout(startScatter, 15000);
    }

    function startFright() {
        pacman.stats.frightStart();
        pacman.blinkTimer = 3;
        startMode("fright");
        clearTimeout(pacman.modeTimeout);
        clearTimeout(pacman.phaseEndInterval);
        pacman.modeTimeout = setTimeout(frightPhaseEnd, 7000);
    }

    function frightPhaseEnd() {
        pacman.phaseEndTimer = 3;
        pacman.phaseEndInterval = setInterval(blink, 1000);
    }

    function blink() {
        if (pacman.phaseEndTimer === 0) {
            clearInterval(pacman.phaseEndInterval);
            startChase();
        } else {
            pacman.svg.blinkGhosts();
            pacman.phaseEndTimer--;
        }
    }

    function startScatter() {
        startMode("scatter");
        pacman.modeTimeout = setTimeout(startChase, 5000);
    }

    // game control functions

    function nextLevel() {
        stop();
        pacman.stats.addLevel();
        pacman.updateElroy();
        pacman.fieldBuilder.renewPellets();
        resetObjects();
        animateObjects();
        startWithCountDown(2);
    }

    function startWithCountDown(time) {
        pacman.countdownTimer = time;
        pacman.countDownInterval = setInterval(start, 1000);
    }

    // start game
    function start() {
        if (pacman.countdownTimer <= 0 || pacman.countdownTimer === undefined) {
            clearInterval(pacman.countDownInterval);
            pacman.gameInterval = setInterval(tick, 1000 / 60);
            startChase();
        } else {
            pacman.svg.animateCountdownNumber(pacman.playerStart, pacman.countdownTimer);
            pacman.countdownTimer--;
        }
    }

    // stop game
    function stop() {
        clearTimers();
    }

    // ends game
    function end() {
        setupEnd();
    }

    // hides ghosts and plays animation when pac-man dies
    function death(callback) {
        stop();
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.body.hide();
            ghost.leftEye.hide();
            ghost.rightEye.hide();
            ghost.leftPupil.hide();
            ghost.rightPupil.hide();
        });
        pacman.svg.animatePlayerDeath(callback);
    }

    // resets objects after death and shows ghosts again
    function continueAfterDeath() {
        resetObjects();
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.body.show();
            ghost.leftEye.show();
            ghost.rightEye.show();
            ghost.leftPupil.show();
            ghost.rightPupil.show();
        });
        animateObjects();
        startWithCountDown(1);
    }

    // start screen
    function setupStart() {
        // build starting screen (atm playfield, not startscreen)
        pacman.fieldBuilder.buildStartScreen();
        
        // show top scores too
        pacman.stats.getTopScores();
        
        // what screen is in use
        screen = "start";
    }

    // play screen
    function setupPlayField() {
        pacman.fieldBuilder.buildPlayField();
        
        // add ghosts
        pacman.ghosts = [];
        pacman.ghosts.push(new pacman.Enemy("blinky", pacman.enemyStarts[0]));
        pacman.ghosts.push(new pacman.Enemy("inky", pacman.enemyStarts[1]));
        pacman.ghosts.push(new pacman.Enemy("pinky", pacman.enemyStarts[2]));
        pacman.ghosts.push(new pacman.Enemy("clyde", pacman.enemyStarts[3]));

        // add player
        pacman.player = new pacman.Player();

        pacman.updateElroy();

        // to make object visible on screen
        animateObjects();
        
        // new game, reset stats
        pacman.stats.resetStats();

        // what screen is in use
        screen = "play";
    }

    // end screen
    function setupEnd() {
        // build starting screen (atm playfield, not startscreen)
        pacman.fieldBuilder.buildEndScreen();
        
        // send score
        pacman.stats.sendPoints();

        // what screen is in use
        screen = "end";
    }

    function enterEvent() {
        clearTimers();
        if (screen === "play") {
            stop();
            setupStart();
        } else if (screen === "start") {
            setupPlayField();
            startWithCountDown(2);
        } else if (screen === "end") {
            setupStart();
        }
    }

    function clearTimers() {
        clearInterval(pacman.gameInterval);
        clearInterval(pacman.phaseEndTimer);
        clearInterval(pacman.countDownInterval);
        clearTimeout(pacman.modeTimeout);
    }

    return {
        setupStart: setupStart,
        setupPlayField: setupPlayField,
        startWithCountDown: startWithCountDown,
        start: start,
        death: death,
        continueAfterDeath: continueAfterDeath,
        end: end,
        frame: frame,
        startFright: startFright,
        resetObjects: resetObjects,
        updateElroy: updateElroy,
        enterEvent: enterEvent
    };
})();

$(document).ready(function() {
    // create paper
    pacman.paper = Raphael(pacman.config.containerId, 0, 0);

    // bind keyhandler
    $(document).keydown(function(eventInfo) {
        pacman.keyhandler.keydown(eventInfo.keyCode);
    });
    $(document).keyup(function(eventInfo) {
        pacman.keyhandler.keyup(eventInfo.keyCode);
    });

    // start with start screen
    pacman.setupStart();
});
