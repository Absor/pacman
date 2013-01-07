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
                console.log("DÖD");
                return;
            }
        });
    }

    // functions for controlling modes
    function chase() {
        pacman.mode = "chase";
        clearInterval(pacman.modeInterval);
        pacman.modeInterval = setInterval(scatter, 15000);
    }

    function scatter() {
        pacman.mode = "scatter";
        clearInterval(pacman.modeInterval);
        pacman.modeInterval = setInterval(chase, 5000);
    }

    function fright() {
        pacman.mode = "fright";
        clearInterval(pacman.modeInterval);
        pacman.modeInterval = setInterval(chase, 15000);
    }

    // reset game: move everything to start position
    function reset() {

    }

    return {
        start: start,
        addPoints: addPoints,
        fright: fright
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