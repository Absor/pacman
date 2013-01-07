var pacman = (function() {
    var points = 0;
    $("#points").html(points);

    function addPoints(amount) {
        points += amount;
        $("#points").html(points);
    }

    function getPoints() {
        return points;
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

    return {
        tick: tick,
        addPoints: addPoints,
        getPoints: getPoints
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

    // build starting screen
    pacman.fieldBuilder.buildField(pacman.config.playField1);

    // add player
    pacman.player = new pacman.Player();

    // add ghosts
    pacman.ghosts = [];
    pacman.ghosts.push(new pacman.Enemy("blinky", pacman.enemyStarts[0]));
    pacman.ghosts.push(new pacman.Enemy("pinky", pacman.enemyStarts[1]));
    pacman.ghosts.push(new pacman.Enemy("inky", pacman.enemyStarts[2]));
    pacman.ghosts.push(new pacman.Enemy("clyde", pacman.enemyStarts[3]));

    // roll game
    setInterval(pacman.tick, 1000 / 60);
});