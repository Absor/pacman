// "toolset"
// helper functions
pacman.tools = (function() {
    function getMovement(direction) {
        switch (direction) {
            case 0:
                return {x: 1, y: 0};
            case 1:
                return {x: 0, y: 1};
            case 2:
                return {x: -1, y: 0};
            case 3:
                return {x: 0, y: -1};
        }
    }

    // Euclidean distance between two points
    function distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    // Gives position in grid by pixel position
    function getTilePosition(position) {
        return {
            row: Math.floor((position.y + pacman.config.tileSize / 2) / pacman.config.tileSize),
            col: Math.floor((position.x + pacman.config.tileSize / 2) / pacman.config.tileSize)
        };
    }

    function sortByDistance(a, b) {
        return a.distance - b.distance;
    }

    return {
        getMovement: getMovement,
        distanceBetween: distanceBetween,
        getTilePosition: getTilePosition,
        sortByDistance: sortByDistance
    };
})();
