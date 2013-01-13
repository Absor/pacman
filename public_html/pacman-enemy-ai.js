pacman.ai = {
    // parameters:
    // oldMovement  - ghost's old movement so we can know where we can't go
    //                = where we came from
    // ownPosition  - ghost's position
    // movementGrid - movementGrid to use to check where we can move
    setUpDirections: function(oldMovement, ownPosition, movementGrid) {
        var directions = [];

        // add directions to array if the direction has no walls or other
        // obstacles and it is not the direction where we are coming from
        
        // can go up?
        if (oldMovement.y !== 1 &&
                movementGrid[ownPosition.row - 1][ownPosition.col]) {
            directions.push({distance: null, x: 0, y: -1});
        }
        // can go right?
        if (oldMovement.x !== -1 &&
                movementGrid[ownPosition.row][ownPosition.col + 1]) {
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
    // parameters:
    // directions     - directions array we set up with setUpDirections
    // ownPosition    - ghost's position so we can count distances to target
    //                  with directions array
    // targetPosition - ghost's target
    setDistances: function(directions, ownPosition, targetPosition) {
        // go through all directions in the array
        $.each(directions, function(index, direction) {
            // use tool function to calculate euclidean distance between ghost
            // and the target
            direction.distance = pacman.tools.distanceBetween(
                    ownPosition.col + direction.x,
                    ownPosition.row + direction.y,
                    targetPosition.col,
                    targetPosition.row);
        });
    }
};

// all ais only need to offer function getMovement that takes parameters
// oldMovement  - ghost's old movement (for knowing where not to go usually)
// ownPosition  - ghost's position (for route search)
// mode         - ghost's mode (for different behaviour for different modes
// forcedTarget - forced target (overriding normal target)

// Blinky
pacman.ai.blinky = (function() {
    function getMovement(oldMovement, ownPosition, mode, forcedTarget) {
        // uses player movement grid in normal mode, changes movement grid while using home area (coming out/going in)
        var movementGrid;
        // set up where ghost is able to go
        var directions;

        if (forcedTarget !== null) {
            movementGrid = pacman.enemyMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
            pacman.ai.setDistances(directions, ownPosition, forcedTarget);
        } else {
            movementGrid = pacman.playerMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
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
                    var randomIndex = Math.floor(Math.random() * directions.length);
                    return directions[randomIndex];
                    break;
            }
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
    function getMovement(oldMovement, ownPosition, mode, forcedTarget) {
        // uses player movement grid in normal mode, changes movement grid while using home area (coming out/going in)
        var movementGrid;
        // set up where ghost is able to go
        var directions;

        if (forcedTarget !== null) {
            movementGrid = pacman.enemyMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
            pacman.ai.setDistances(directions, ownPosition, forcedTarget);
        } else {
            movementGrid = pacman.playerMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
            // move by mode
            switch (mode) {
                case "scatter":
                    // targets upper left corner in scatter mode
                    pacman.ai.setDistances(directions, ownPosition, {row: 0, col: 0});
                    break;
                case "chase":
                    // targets 4 squares in front of pac-man in chase mode
                    var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
                    var playerMovement = pacman.player.movement;
                    var targetPosition = {
                        col: playerPosition.col + 4 * playerMovement.x,
                        row: playerPosition.row + 4 * playerMovement.y
                    };
                    pacman.ai.setDistances(directions, ownPosition, targetPosition);
                    break;
                case "fright":
                    // random direction in fright mode
                    var randomIndex = Math.floor(Math.random() * directions.length);
                    return directions[randomIndex];
                    break;
            }
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

// Inky
pacman.ai.inky = (function() {
    function getMovement(oldMovement, ownPosition, mode, forcedTarget) {
        // uses player movement grid in normal mode, changes movement grid while using home area (coming out/going in)
        var movementGrid;
        // set up where ghost is able to go
        var directions;

        if (forcedTarget !== null) {
            movementGrid = pacman.enemyMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
            pacman.ai.setDistances(directions, ownPosition, forcedTarget);
        } else {
            movementGrid = pacman.playerMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
            // move by mode
            switch (mode) {
                case "scatter":
                    // targets bottom right corner in scatter mode
                    pacman.ai.setDistances(directions, ownPosition, {row: pacman.fieldInUse.height, col: pacman.fieldInUse.width});
                    break;
                case "chase":
                    // target tile is pointed by drawing a vector from blinky to 2 tiles in front of pacman and doubling it
                    var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
                    var playerMovement = pacman.player.movement;
                    var playerPosition2 = {
                        row: playerPosition.row + 2 * playerMovement.y,
                        col: playerPosition.col + 2 * playerMovement.x
                    };
                    var blinkyPosition = pacman.tools.getTilePosition(pacman.ghosts[0].position);
                    var difference = {
                        row: playerPosition2.row - blinkyPosition.row,
                        col: playerPosition2.col - blinkyPosition.col
                    };
                    var targetPosition = {
                        row: playerPosition2.row + difference.row,
                        col: playerPosition2.col + difference.col
                    };
                    pacman.ai.setDistances(directions, ownPosition, targetPosition);
                    break;
                case "fright":
                    // random direction in fright mode
                    var randomIndex = Math.floor(Math.random() * directions.length);
                    return directions[randomIndex];
                    break;
            }
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


// Clyde
pacman.ai.clyde = (function() {
    function getMovement(oldMovement, ownPosition, mode, forcedTarget) {
        // uses player movement grid in normal mode, changes movement grid while using home area (coming out/going in)
        var movementGrid;
        // set up where ghost is able to go
        var directions;

        if (forcedTarget !== null) {
            movementGrid = pacman.enemyMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
            pacman.ai.setDistances(directions, ownPosition, forcedTarget);
        } else {
            movementGrid = pacman.playerMovement;
            directions = pacman.ai.setUpDirections(oldMovement, ownPosition, movementGrid);
            // move by mode
            switch (mode) {
                case "scatter":
                    // targets bottom left corner in scatter mode
                    pacman.ai.setDistances(directions, ownPosition, {row: pacman.fieldInUse.height, col: 0});
                    break;
                case "chase":
                    // targets pac-man in chase mode if distance from pac-man is greater than 8
                    // otherwise uses scatter target
                    var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
                    if (pacman.tools.distanceBetween(playerPosition.col, playerPosition.row, ownPosition.col, ownPosition.row) > 8) {
                        pacman.ai.setDistances(directions, ownPosition, playerPosition);
                    } else {
                        pacman.ai.setDistances(directions, ownPosition, {row: pacman.fieldInUse.height, col: 0});
                    }
                    break;
                case "fright":
                    // random direction in fright mode
                    var randomIndex = Math.floor(Math.random() * directions.length);
                    return directions[randomIndex];
                    break;
            }
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
