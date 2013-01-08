pacman.ai = {
    setUpDirections: function(oldMovement, ownPosition, movementGrid) {
        var directions = [];

        // can go up?
        if (oldMovement.y !== 1 && movementGrid[ownPosition.row - 1][ownPosition.col]) {
            directions.push({distance: null, x: 0, y: -1});
        }
        // can go right?
        if (oldMovement.x !== -1 && movementGrid[ownPosition.row][ownPosition.col + 1]) {
            directions.push({distance: null, x: 1, y: 0});
        }
        // can go down?
        if (oldMovement.y !== -1 && movementGrid[ownPosition.row + 1][ownPosition.col]) {
            directions.push({distance: null, x: 0, y: 1});
        }
        // can go left?
        if (oldMovement.x !== 1 && movementGrid[ownPosition.row][ownPosition.col - 1]) {
            directions.push({distance: null, x: -1, y: 0});
        }
        return directions;
    },
    setDistances: function(directions, ownPosition, targetPosition) {
        $.each(directions, function(index, direction) {
            direction.distance = pacman.tools.distanceBetween(ownPosition.col + direction.x,
                    ownPosition.row + direction.y, targetPosition.col, targetPosition.row);
        });
    }
};

// Blinky
pacman.ai.blinky = (function() {
    function getMovement(oldMovement, ownPosition, mode) {

        var movementGrid = pacman.playerMovement;

        var directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);

        switch (mode) {
            case "scatter":
                pacman.ai.setDistances(directions, ownPosition, {row: 0, col: pacman.fieldInUse.width});
                break;
            case "chase":
                var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
                pacman.ai.setDistances(directions, ownPosition, playerPosition);
                break;
            case "fright":
                pacman.ai.setDistances(directions, ownPosition, pacman.goodTarget);
                break;
            case "dead":
                movementGrid = pacman.enemyMovement;
                directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
                pacman.ai.setDistances(directions, ownPosition, pacman.ghostHome);
                break;
            case "out":
                movementGrid = pacman.enemyMovement;
                directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
                pacman.ai.setDistances(directions, ownPosition, pacman.goodTarget);
                break;
        }

        directions.sort(pacman.tools.sortByDistance);

        return directions[0];
    }

    return {
        getMovement: getMovement
    };
})();

// Pinky
pacman.ai.pinky = (function() {
    function getMovement(ownPosition, mode) {
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
    }

    return {
        getMovement: getMovement
    };
})();

// Inky
pacman.ai.inky = (function() {
    function getMovement(ownPosition, mode) {
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
    }

    return {
        getMovement: getMovement
    };
})();


// Clyde
pacman.ai.clyde = (function() {
    function getMovement(ownPosition) {
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
    }

    return {
        getMovement: getMovement
    };
})();