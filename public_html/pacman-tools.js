// "toolset"
// helper functions
pacman.tools = (function() {
    // returns movement in x and y directions: 0 = right, 1 = down, 2 = left, 3 = up
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

    // euclidean distance between two points
    function distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    // gives position in grid by pixel position
    function getTilePosition(position) {
        return {
            row: Math.floor(position.y / pacman.config.tileSize),
            col: Math.floor(position.x / pacman.config.tileSize)
        };
    }

    // ascending sorter
    function sortByDistance(a, b) {
        return a.distance - b.distance;
    }

    // speed functions
    function baseSpeed() {
        return pacman.config.tileSize / 10;
    }

    function playerSpeed(mode) {
        var base = baseSpeed();
        var level = pacman.stats.level;
        switch (mode) {
            case "fright":
                // in fright mode: levels 1-14 (85+level)% of base speed
                if (level < 15) {
                    return (85 + level) / 100 * base;
                }
                // after level 14 100% of base speed
                return base;
                break;
            default:
                // in other modes: levels 1-20 (80+level)% of base speed
                if (level <= 20) {
                    return (80 + level) / 100 * base;
                }
                // drops to 90% base speed after level 20
                return 0.9 * base;
                break;
        }
    }

    function enemySpeed(mode, elroyLevel) {
        var base = baseSpeed();
        var level = pacman.stats.level;
        switch (mode) {
            // while dead 150% base speed
            case "dead":
                return 1.5 * base;
                // in fright mode slow down to 60% base speed
            case "fright":
                return 0.6 * base;
            default:
                // in other modes: levels 1-19 (75 + level + elroyLevel * 5)%  base speed
                if (level < 20) {
                    return (75 + level + elroyLevel * 5) / 100 * base;
                }
                // after level 19 (95 + elroyLevel * 5)% base speed
                return (0.95 + elroyLevel * 5) * base;

        }
    }

    // calculates bonus symbol point by level
    function symbolPoints() {
        var level = pacman.stats.level;
        if (level <= 5) {
            return level * 200 - 100;
        }
        if (level < 10) {
            return level * 500;
        }
        return 5000;
    }

    // returns elroy level 1 dots left limit
    function elroyLevel() {
        var level = pacman.stats.level;
        // levels 1-2
        if (level <= 2) {
            return 30;
        }
        // levels 3-5
        if (level <= 5) {
            return 40;
        }
        // levels 6-8
        if (level <= 8) {
            return 50;
        }
        // levels 9-11
        if (level <= 11) {
            return 60;
        }
        // levels 12-14
        if (level <= 14) {
            return 80;
        }
        // levels 15-17
        if (level <= 17) {
            return 100;
        }
        // all the rest
        return 120;
    }

    return {
        getMovement: getMovement,
        distanceBetween: distanceBetween,
        getTilePosition: getTilePosition,
        sortByDistance: sortByDistance,
        playerSpeed: playerSpeed,
        enemySpeed: enemySpeed,
        elroyLevel: elroyLevel
    };
})();
