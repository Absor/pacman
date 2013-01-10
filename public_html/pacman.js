var pacman = (function() {
    // animation frame
    var frame = 0;

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
        // collisions
        pacman.player.checkCollisions();
        // eat everything at pac-man's position
        pacman.player.eat();
        // animate all
        animateObjects();
    }

    function moveObjects() {
        // move pac-man
        pacman.player.move();
        // move ghosts
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.move();
        });
    }

    // helper functions
    function animateObjects() {
        // Pac-Man
        pacman.player.animate();
        // ghosts
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.animate();
        });
    }

    // start game
    function start() {
        pacman.gameInterval = setInterval(tick, 1000 / 60);
        startChase();
    }

    // stop game
    function stop() {
        clearInterval(pacman.gameInterval);
    }

    function startMode(mode) {
        pacman.mode = mode;
        pacman.player.setMode(mode);
        setGhostMode(mode);
    }

    function setGhostMode(mode) {
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.setMode(mode);
        });
    }

    function startChase() {
        startMode("chase");
        pacman.modeTimeout = setTimeout(startScatter, 15000);
    }

    function startFright() {
        startMode("fright");
        clearTimeout(pacman.modeTimeout);
        pacman.modeTimeout = setTimeout(startChase, 10000);
    }

    function startScatter() {
        startMode("scatter");
        pacman.modeTimeout = setTimeout(startChase, 5000);
    }

    function death() {
        console.log("reset");
        reset();
        setTimeout(start, 4000);
    }

    function reset() {
        pacman.tools.reset(pacman.player);
        $.each(pacman.ghosts, function(index, ghost) {
            pacman.tools.reset(ghost);
        });
    }

    // ends game
    function end() {
        console.log("end");
    }

    return {
        start: start,
        reset: reset,
        frame: frame,
        startFright: startFright
    };
})();

pacman.stats = (function() {
    var points = 0;
    var level = 1;
    var lifes = 2;

    function addPoints(amount) {
        points += amount;
        $("#points").html(points);
    }

    // removes one life, if no more lifes are left, returns false, otherwise true
    function removeLife() {
        lifes--;
        if (lifes < 0) {
            return false;
        }
        return true;
    }

    // adds one to level counter
    function nextLevel() {
        level++;
    }

    // return current level
    function getLevel() {
        return level;
    }

    return {
        addPoints: addPoints,
        removeLife: removeLife,
        nextLevel: nextLevel,
        level: getLevel
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

    // build starting screen (atm playfield, not startscreen)
    pacman.fieldBuilder.buildField(pacman.config.playField1);

    // add player
    pacman.player = new pacman.Player();

    // add ghosts
    pacman.ghosts = [];
    pacman.ghosts.push(new pacman.Enemy("blinky", pacman.enemyStarts[0]));
    pacman.ghosts.push(new pacman.Enemy("inky", pacman.enemyStarts[1]));
    pacman.ghosts.push(new pacman.Enemy("pinky", pacman.enemyStarts[2]));
    pacman.ghosts.push(new pacman.Enemy("clyde", pacman.enemyStarts[3]));

    // roll game
    pacman.start();
});
