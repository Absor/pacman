pacman.ai = {
    setUpDirections: function(oldMovement, ownPosition, movementGrid) {
        var directions = [];

        // add directions to array if the direction has no walls or other obstacles
        // and it is not the direction where we are coming from
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
    // calculates distances for all directions in given array to target position
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

        // uses player movement grid in normal mode, changes movement grid while using home area (coming out/going in)
        var movementGrid = pacman.playerMovement;

        // set up where ghost is able to go
        var directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);

        // move by mode
        switch (mode) {
            case "scatter":
                // targets upper right corner in scatter mode
                pacman.ai.setDistances(directions, ownPosition, {row: 0, col: pacman.fieldInUse.width});
                break;
            case "chase":
                // targets pac-man in chase mode
                var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
                pacman.ai.setDistances(directions, ownPosition, playerPosition);
                break;
            case "fright":
                // random direction in fright mode
                var randomIndex = Math.floor(Math.random() * directions.length)
                return directions[randomIndex];
                break;
            case "out":
                movementGrid = pacman.enemyMovement;
            case "dead":
                // targets safe spot outside home area
                directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
                pacman.ai.setDistances(directions, ownPosition, pacman.goodTarget);
                break;
            case "in":
                // targets home spot inside home area
                movementGrid = pacman.enemyMovement;
                directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
                pacman.ai.setDistances(directions, ownPosition, pacman.ghostHome);
                break;
        }

        // sort directions by distances (shortest will be first)
        directions.sort(pacman.tools.sortByDistance);
        // and return first (shortest)
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
