pacman.ai = [];

// Blinky
pacman.ai[0] = (function() {
    function getMovement(oldMovement, ownPosition, mode) {
        var playerPosition = pacman.player.getTilePosition();
        var directions = [];
        var i = 0;
        if (pacman.badArea[ownPosition.row][ownPosition.col]) {
            // can go up?
            if (oldMovement.y !== 1 && pacman.enemyMovement[ownPosition.row - 1][ownPosition.col]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row - 1 - pacman.goodTarget.row, 2) + Math.pow(ownPosition.col - pacman.goodTarget.col, 2));
                directions[i] = {distance: distance, x: 0, y: -1};
                i++;
            }
            // can go right?
            if (oldMovement.x !== -1 && pacman.enemyMovement[ownPosition.row][ownPosition.col + 1]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row - pacman.goodTarget.row, 2) + Math.pow(ownPosition.col + 1 - pacman.goodTarget.col, 2));
                directions[i] = {distance: distance, x: 1, y: 0};
                i++;
            }
            // can go down?
            if (oldMovement.y !== -1 && pacman.enemyMovement[ownPosition.row + 1][ownPosition.col]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row + 1 - pacman.goodTarget.row, 2) + Math.pow(ownPosition.col - pacman.goodTarget.col, 2));
                directions[i] = {distance: distance, x: 0, y: 1};
                i++;
            }
            // can go left?
            if (oldMovement.x !== 1 && pacman.enemyMovement[ownPosition.row][ownPosition.col - 1]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row - pacman.goodTarget.row, 2) + Math.pow(ownPosition.col - 1 - pacman.goodTarget.col, 2));
                directions[i] = {distance: distance, x: -1, y: 0};
                i++;
            }

            directions.sort(function(a, b) {
                return a.distance - b.distance;
            });
            return directions[0];
        } else {
            // can go up?
            if (oldMovement.y !== 1 && pacman.enemyMovement[ownPosition.row - 1][ownPosition.col] && !pacman.badArea[ownPosition.row - 1][ownPosition.col]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row - 1 - playerPosition.row, 2) + Math.pow(ownPosition.col - playerPosition.col, 2));
                directions[i] = {distance: distance, x: 0, y: -1};
                i++;
            }
            // can go right?
            if (oldMovement.x !== -1 && pacman.enemyMovement[ownPosition.row][ownPosition.col + 1] && !pacman.badArea[ownPosition.row][ownPosition.col + 1]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row - playerPosition.row, 2) + Math.pow(ownPosition.col + 1 - playerPosition.col, 2));
                directions[i] = {distance: distance, x: 1, y: 0};
                i++;
            }
            // can go down?
            if (oldMovement.y !== -1 && pacman.enemyMovement[ownPosition.row + 1][ownPosition.col] && !pacman.badArea[ownPosition.row + 1][ownPosition.col]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row + 1 - playerPosition.row, 2) + Math.pow(ownPosition.col - playerPosition.col, 2));
                directions[i] = {distance: distance, x: 0, y: 1};
                i++;
            }
            // can go left?
            if (oldMovement.x !== 1 && pacman.enemyMovement[ownPosition.row][ownPosition.col - 1] && !pacman.badArea[ownPosition.row][ownPosition.col - 1]) {
                var distance = Math.sqrt(Math.pow(ownPosition.row - playerPosition.row, 2) + Math.pow(ownPosition.col - 1 - playerPosition.col, 2));
                directions[i] = {distance: distance, x: -1, y: 0};
                i++;
            }

            directions.sort(function(a, b) {
                return a.distance - b.distance;
            });
            return directions[0];
        }
    }

    return {
        getMovement: getMovement
    };
})();

// Pinky
pacman.ai[1] = (function() {
    function getMovement(ownPosition, mode) {
        var playerPosition = pacman.player.getTilePosition();
    }

    return {
        getMovement: getMovement
    };
})();

// Inky
pacman.ai[2] = (function() {
    function getMovement(ownPosition, mode) {
        var playerPosition = pacman.player.getTilePosition();
    }

    return {
        getMovement: getMovement
    };
})();


// Clyde
pacman.ai[3] = (function() {
    function getMovement(ownPosition) {
        var playerPosition = pacman.player.getTilePosition();
    }

    return {
        getMovement: getMovement
    };
})();