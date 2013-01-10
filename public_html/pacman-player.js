pacman.Player = function() {
    // position and movement
    this.position = pacman.playerStart;
    this.movement = {x: -1, y: 0, objectRotation: 180};
    this.newMovement = this.movement;
    this.mode = "chase";

    // paper object
    this.paperObject = pacman.paper.path();
    this.paperObject.attr(pacman.svg.pacman(this.position, this.movement.objectRotation));
    this.paperObject.attr("fill", pacman.config.colours.pacman);
    this.paperObject.attr("stroke", "none");

    this.animate = function() {
        this.paperObject.attr(pacman.svg.pacman(this.position, this.movement.objectRotation));
    };

    this.move = function() {
        var speedLeft = pacman.tools.playerSpeed(this.mode);

        // move as far as possible in the direction we are going (in current tile)

        // going left
        if (this.movement.x < 0 && this.position.x % pacman.config.tileSize < speedLeft) {
            var distance = this.position.x % pacman.config.tileSize;
            this.position.x -= distance;
            speedLeft -= distance;
        }
        // going right
        else if (this.movement.x > 0 && this.position.x % pacman.config.tileSize + speedLeft > pacman.config.tileSize) {
            var distance = pacman.config.tileSize - this.position.x % pacman.config.tileSize;
            this.position.x += distance;
            speedLeft -= distance;
        }
        // going up
        else if (this.movement.y < 0 && this.position.y % pacman.config.tileSize < speedLeft) {
            var distance = this.position.y % pacman.config.tileSize;
            this.position.y -= distance;
            speedLeft -= distance;
        }
        // going down
        else if (this.movement.y > 0 && this.position.y % pacman.config.tileSize + speedLeft > pacman.config.tileSize) {
            var distance = pacman.config.tileSize - this.position.y % pacman.config.tileSize;
            this.position.y += distance;
            speedLeft -= distance;
        }

        // move the rest of the distance

        // check if we can move with new input
        var newMovementNewPosition = {
            x: this.position.x + this.newMovement.x * speedLeft,
            y: this.position.y + this.newMovement.y * speedLeft
        };
        if (this.canMove(newMovementNewPosition)) {
            this.position = newMovementNewPosition;
            // if we can move, change movement to new movement
            this.movement = this.newMovement;
            return;
        }

        // if we cant move with new, try with old
        var oldMovementNewPosition = {
            x: this.position.x + this.movement.x * speedLeft,
            y: this.position.y + this.movement.y * speedLeft
        };
        if (this.canMove(oldMovementNewPosition)) {
            this.position = oldMovementNewPosition;
            this.newMovement = this.movement;
            return;
        }
    };

    this.canMove = function(position) {
        // test every corner of pac-man to see if he can fully fit into new position
        // upper left
        var ulRow = Math.floor(position.y / pacman.config.tileSize);
        var ulCol = Math.floor(position.x / pacman.config.tileSize);
        if (!pacman.playerMovement[ulRow][ulCol]) {
            return false;
        }
        // upper right (row is the same as upper left)
        var urCol = Math.floor((position.x + pacman.config.tileSize - 0.001) / pacman.config.tileSize);
        if (!pacman.playerMovement[ulRow][urCol]) {
            return false;
        }
        // bottom left (col is the same as upper left)
        var blRow = Math.floor((position.y + pacman.config.tileSize - 0.001) / pacman.config.tileSize);
        if (!pacman.playerMovement[blRow][ulCol]) {
            return false;
        }
        // bottom right (upper right column and bottom left row)
        if (!pacman.playerMovement[blRow][urCol]) {
            return false;
        }
        return true;
    };
    
    this.eat = function() {
        // where is pac-man
        var playerPosition = pacman.tools.getTilePosition(this.position);
        // check if there are pellets in pac-man's position and if yes, remove from game and add points
        if (pacman.pellets[playerPosition.row][playerPosition.col] !== undefined) {
            if (pacman.pellets[playerPosition.row][playerPosition.col].isPowerPellet) {
                // if pellet is a power pellet, enter fright mode
                pacman.fright();
                pacman.stats.addPoints(50);
            } else {
                // normal pellet
                pacman.stats.addPoints(10);
            }
            // remove object from raphael paper
            pacman.pellets[playerPosition.row][playerPosition.col].remove();
            // remove from the container grid
            pacman.pellets[playerPosition.row][playerPosition.col] = undefined;
        }
    };
    
    this.checkCollisions = function() {
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
        $.each(pacman.ghosts, function(index, ghost) {
            var ghostPosition = pacman.tools.getTilePosition(ghost.position);
            if (playerPosition.row === ghostPosition.row && playerPosition.col === ghostPosition.col) {
                // handle collision
                // ghost in fright mode: kill ghost
                if (ghost.mode === "fright") {
                    ghost.die();
                    // TODO POINTS
                }
                // ghost in chase mode: -1 life and reset game
                if (ghost.mode === "chase") {
                    if (pacman.stats.removeLife()) {
                        stop();
                        death();
                    } else {
                        stop();
                        end();
                    }
                }
            }
        });
    };
};
