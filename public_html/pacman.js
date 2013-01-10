var pacman = (function() {
    // animation frame
    var frame = 0;
    
    // show point counter
    pacman.stats.addPoints(0);

    function tick() {
        pacman.frame++;
        pacman.frame %= 30;

        var movement = pacman.keyhandler.getMovement();
        if (movement.objectRotation !== null) {
            pacman.player.newMovement = movement;
        }

        // move pac-man
        pacman.player.move();
        // move ghosts
        $.each(pacman.ghosts, function(index, ghost) {
            ghost.move();
        });

        // collisions
        pacman.player.checkCollisions();

        // eat everything at pac-man's position
        pacman.player.eat();

        animateObjects();
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
        chase();
    }

    // stop game
    function stop() {
        clearInterval(pacman.gameInterval);
    }

    // functions for controlling modes
    function chase() {
        pacman.mode = "chase";
        setGhostMode(pacman.mode);
        clearInterval(pacman.modeInterval);
        pacman.modeInterval = setInterval(scatter, 15000);
    }

    function scatter() {
        pacman.mode = "scatter";
        setGhostMode(pacman.mode);
        clearInterval(pacman.modeInterval);
        pacman.modeInterval = setInterval(chase, 5000);
    }

    function fright() {
        pacman.mode = "fright";
        setGhostMode(pacman.mode);
        clearInterval(pacman.modeInterval);
        pacman.modeInterval = setInterval(chase, 10000);
    }

    function setGhostMode(mode) {
        $.each(pacman.ghosts, function(index, ghost) {
            if (ghost.mode === "scatter" || ghost.mode === "chase" || ghost.mode === "fright") {
                if ((ghost.mode !== "fright" && mode === "fright") || (ghost.mode === "fright" && mode !== "fright")) {
                    ghost.changeColour();
                }
                ghost.mode = mode;
            }
        });
    }

    function death() {
        console.log("reset");
        reset();
        setTimeout(start, 4000);
    }

    function reset() {
        pacman.tools.reset(player);
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
        frame: frame
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
        getLevel: getLevel
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
