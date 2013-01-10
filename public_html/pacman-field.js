pacman.fieldBuilder = (function() {

    function buildField(fieldContainer) {
        pacman.fieldInUse = fieldContainer;
        // clear paper
        pacman.paper.clear();
        // set size
        var paperWidth = fieldContainer.width * pacman.config.tileSize;
        var paperHeight = fieldContainer.height * pacman.config.tileSize;
        pacman.paper.setSize(paperWidth, paperHeight);
        // create background
        var background = pacman.paper.rect(0, 0, paperWidth, paperHeight);
        background.attr("fill", pacman.config.colours.background);
        // movement fields for player and enemies
        pacman.playerMovement = [];
        pacman.enemyMovement = [];
        // container for pellets
        pacman.pellets = [];
        // container for enemy start locations
        pacman.enemyStarts = [];
        // bad areas for ghosts
        // go through the field string
        for (var row = 0; row < fieldContainer.height; row++) {
            pacman.playerMovement[row] = [];
            pacman.enemyMovement[row] = [];
            pacman.pellets[row] = [];
            for (var col = 0; col < fieldContainer.width; col++) {
                pacman.playerMovement[row][col] = true;
                pacman.enemyMovement[row][col] = true;
                switch (fieldContainer.field[row].charAt(col)) {
                    case "W":
                        // if it's a wall
                        createWall(row, col);
                        pacman.playerMovement[row][col] = false;
                        pacman.enemyMovement[row][col] = false;
                        break;
                    case "G":
                        // if it's a ghost room gate
                        createGate(row, col);
                        pacman.playerMovement[row][col] = false;
                        // is also bad
                        break;
                    case "C":
                        // if it's a candy
                        createPellet(row, col);
                        break;
                    case "U":
                        // if it's a powerup
                        createPowerPellet(row, col);
                        break;
                    case "P":
                        // if it's the player starting spot
                        setPlayerStart(row, col);
                        break;
                    case "H":
                        // if it's the enemy starting spot
                        setEnemyStart(row, col);
                        // is also bad
                        break;
                    case "B":
                        // bad area, ghosts can't stay here
                        break;
                    case "Z":
                        pacman.goodTarget = {row: row, col: col};
                        break;
                    case "X":
                        pacman.ghostHome = {row: row, col: col};
                        break;
                }
            }
        }
    }

    // helper functions
    function createWall(row, col) {
        var wall = pacman.paper.rect(
                col * pacman.config.tileSize + pacman.config.tileSize / 6,
                row * pacman.config.tileSize + pacman.config.tileSize / 6,
                pacman.config.tileSize / 1.5,
                pacman.config.tileSize / 1.5);
        wall.attr("fill", pacman.config.colours.wall);
        wall.attr("stroke", "none");
    }

    function createGate(row, col) {
        var gate = pacman.paper.rect(
                col * pacman.config.tileSize + pacman.config.tileSize / 6,
                row * pacman.config.tileSize + pacman.config.tileSize / 6,
                pacman.config.tileSize / 1.5,
                pacman.config.tileSize / 1.5);
        gate.attr("fill", pacman.config.colours.gate);
        gate.attr("stroke", "none");
    }

    function createPellet(row, col) {
        var pellet = pacman.paper.rect(
                col * pacman.config.tileSize + pacman.config.tileSize / (8 / 3),
                row * pacman.config.tileSize + pacman.config.tileSize / (8 / 3),
                pacman.config.tileSize / 4,
                pacman.config.tileSize / 4);
        pellet.attr("fill", pacman.config.colours.pellet);
        pellet.attr("stroke", "none");
        pacman.pellets[row][col] = pellet;
    }

    function createPowerPellet(row, col) {
        var powerPellet = pacman.paper.rect(
                col * pacman.config.tileSize + pacman.config.tileSize / (10 / 3),
                row * pacman.config.tileSize + pacman.config.tileSize / (10 / 3),
                pacman.config.tileSize / 2.5,
                pacman.config.tileSize / 2.5);
        powerPellet.attr("fill", pacman.config.colours.powerPellet);
        powerPellet.attr("stroke", "none");
        // animate power pellet: scale to 1.5 times the size and back
        var anim = Raphael.animation({
            "50%": {
                transform: "s1.5"
            },
            "100%": {
                transform: ""
            }
        }, 1000).repeat("Infinity");
        powerPellet.animate(anim);
        powerPellet.isPowerPellet = true;
        pacman.pellets[row][col] = powerPellet;
    }

    function setPlayerStart(row, col) {
        pacman.playerStart = {
            x: col * pacman.config.tileSize + pacman.config.tileSize / 2,
            y: row * pacman.config.tileSize
        };
    }

    function setEnemyStart(row, col) {
        pacman.enemyStarts.push({
            x: col * pacman.config.tileSize + pacman.config.tileSize / 2,
            y: row * pacman.config.tileSize
        });
    }

    return {
        buildField: buildField
    };
})();