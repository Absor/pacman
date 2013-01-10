var pacman = (function() {
    // starting points 0, add points to view
    var points = 0;
    $("#points").html(points);

    // starting level
    var level = 1;

    // animation frame
    var frame = 0;

    // lifes
    var lifes = 2;

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

    // start game
    function start() {
        pacman.gameInterval = setInterval(tick, 1000 / 60);
        chase();
    }

    // stop game
    function stop() {
        clearInterval(pacman.gameInterval);
    }

    function checkCollisions() {
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
        $.each(pacman.ghosts, function(index, ghost) {
            var ghostPosition = pacman.tools.getTilePosition(ghost.position);
            if (playerPosition.row === ghostPosition.row && playerPosition.col === ghostPosition.col) {
                // handle collision
                // ghost in fright mode: kill ghost
                if (ghost.mode === "fright") {
                    ghost.die();
                    // TODO POINTS
                }
                // ghost in chase mode: -1 life and reset game
                if (ghost.mode === "chase") {
                    pacman.lifes--;
                    if (pacman.lifes < 0) {
                        stop();
                        end();
                    } else {
                        stop();
                        death();
                    }
                }
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
                addPoints(50);
            } else {
                // normal pellet
                addPoints(10);
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
        addPoints: addPoints,
        level: level,
        frame: frame,
        lifes: lifes
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
