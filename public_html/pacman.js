var pacman = (function() {
    var points = 0;
    $("#points").html(points);

    function addPoints(amount) {
        points += amount;
        $("#points").html(points);
    }

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
        checkCollisions();

        // eat everything at pac-man's position
        eat();

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

    function start() {
        setInterval(tick, 1000 / 60);
        chase();
    }

    function checkCollisions() {
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
        $.each(pacman.ghosts, function(index, ghost) {
            var ghostPosition = pacman.tools.getTilePosition(ghost.position);
            if (playerPosition.row === ghostPosition.row && playerPosition.col === ghostPosition.col) {
                // handle collision
                // ghost in fright mode: kill ghost
                // ghost in chase mode: -1 life and reset game
                console.log("DÖD");
                return;
            }
        });
    }

    //
    function eat() {
        // where is pac-man
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
        // check if there are pellets in pac-man's position and if yes, remove from game and add points
        if (pacman.pellets[playerPosition.row][playerPosition.col] !== undefined) {
            if (pacman.pellets[playerPosition.row][playerPosition.col].isPowerPellet) {
                // if pellet is a power pellet, enter fright mode
                fright();
                pacman.addPoints(50);
            } else {
                // normal pellet
                pacman.addPoints(10);
            }
            // remove object from raphael paper
            pacman.pellets[playerPosition.row][playerPosition.col].remove();
            // remove from the container grid
            pacman.pellets[playerPosition.row][playerPosition.col] = undefined;
        }
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
        pacman.modeInterval = setInterval(chase, 15000);
    }

    function setGhostMode(mode) {
        $.each(pacman.ghosts, function(index, ghost) {
            if (ghost.mode === "scatter" || ghost.mode === "chase" || ghost.mode === "fright") {
                ghost.mode = mode;
            }
        });
    }

    // reset game: move everything to start position
    function reset() {

    }

    return {
        start: start,
        addPoints: addPoints
    };
})();

$(document).ready(function() {
    // animation frame
    pacman.frame = 0;
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
