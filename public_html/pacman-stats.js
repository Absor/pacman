pacman.stats = (function() {
    var points = 0;
    var level = 1;
    var lives = 2;
    var ghostPoints = 200;


    function addPoints(amount) {
        var before = points % 10000;
        points += amount;
        var after = points % 10000;
        // every 10000 points give a life
        if (after < before) {
            addLife();
        }
        updateView();
    }

    function addGhostPoints() {
        // add ghost points to counter
        addPoints(ghostPoints);
        // after kill next "bounty" doubles
        ghostPoints *= 2;
        updateView();
    }

    // when fright mode start reset points amount that player can get from killing ghosts
    function frightStart() {
        ghostPoints = 200;
    }

    function addLife() {
        lives++;
        updateView();
    }

    // removes one life, if no more lifes are left, returns false, otherwise true
    function removeLife() {
        lives--;
        updateView();
        if (lives < 0) {
            return false;
        }
        return true;
    }

    // adds one to level counter
    function addLevel() {
        level++;
        pacman.updateElroy();
    }

    function updateView() {
        $("#points").html("Points: " + points);
        $("#lives").html("Lives: " + lives);
        $("#level").html("Level: " + level);
    }

    function resetStats() {
        points = 0;
        level = 1;
        lives = 2;
        updateView();
    }

    function sendPoints() {
        // http://aqueous-ravine-5531.herokuapp.com/app/games/1/scores/
    }

    function getTopScores() {

    }

    return {
        frightStart: frightStart,
        addPoints: addPoints,
        addGhostPoints: addGhostPoints,
        removeLife: removeLife,
        addLevel: addLevel,
        level: level,
        updateView: updateView,
        resetStats: resetStats,
        sendPoints: sendPoints,
        getTopScores: getTopScores
    };
})();