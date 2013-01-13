pacman.Player = function() {
    // position and movement
    this.position = pacman.playerStart;
    this.originalStart = pacman.playerStart;
    this.movement = {x: -1, y: 0, objectRotation: 180};
    this.newMovement = this.movement;
    this.mode = "chase";

    // paper object
    this.paperObject = pacman.paper.path();

    this.animate = function() {
        this.paperObject.attr(pacman.svg.pacmanBody(this.position, this.movement.objectRotation));
    };

    this.move = function() {
        var speed = pacman.tools.playerSpeed(this.mode);

        if (this.isChangingDirection() && this.canChangeDirection() && this.canMove(this.newMovement, speed)) {
            // if reversing direction, just move, otherwise align to center and move
            if (this.movement.x === (-1) * this.newMovement.x && this.movement.y === (-1) * this.newMovement.y) {
                this.doMovement(this.newMovement, speed);
            } else {
                this.align();
                this.doMovement(this.newMovement, speed);
            }

            // start using new movement
            this.movement = this.newMovement;
        } else {
            // if no change in direction or we just can't move to new position

            // if pac-man can move just move
            if (this.canMove(this.movement, speed)) {
                this.doMovement(this.movement, speed);
            } else {
                // if pac-man can't move align to center
                this.align();
            }

            // cancel the new movement because we used old
            this.newMovement = this.movement;
        }

        // check if pac-man is outside the grid and correct it
        this.correctPosition();
    };

    this.isChangingDirection = function() {
        // if new movement is something else than old movement return true
        if (this.movement.x !== this.newMovement.x || this.movement.y !== this.newMovement.y) {
            return true;
        }
        return false;
    };

    this.canChangeDirection = function() {
        // can always reverse direction
        if (this.movement.x === (-1) * this.newMovement.x && this.movement.y === (-1) * this.newMovement.y) {
            return true;
        }
        // otherwise can change direction if close enough to middle of the current tile
        var tilePosition = pacman.tools.getTilePosition(this.position);
        var tileMiddlePosition = {
            x: pacman.config.tileSize * tilePosition.col + pacman.config.tileSize / 2,
            y: pacman.config.tileSize * tilePosition.row + pacman.config.tileSize / 2
        };

        var distanceFromMiddle = pacman.tools.distanceBetween(this.position.x,
                this.position.y, tileMiddlePosition.x, tileMiddlePosition.y);
        if (distanceFromMiddle < pacman.config.tileSize / 8) {
            return true;
        }
        return false;
    };

    this.align = function() {
        // moves object to the middle of current tile
        var tilePosition = pacman.tools.getTilePosition(this.position);
        var tileMiddlePosition = {
            x: pacman.config.tileSize * tilePosition.col + pacman.config.tileSize / 2,
            y: pacman.config.tileSize * tilePosition.row + pacman.config.tileSize / 2
        };
        this.position = tileMiddlePosition;
    };

    this.canMove = function(movement, speed) {
        // motion side edge position
        var edgePosition = {
            x: this.position.x + (pacman.config.tileSize / 2 + speed) * movement.x,
            y: this.position.y + (pacman.config.tileSize / 2 + speed) * movement.y
        };
        // what tile is the edge in
        var tilePosition = pacman.tools.getTilePosition(edgePosition);
        // if the tile is good to move in (undefined for moving outside the grid)
        if (pacman.playerMovement[tilePosition.row] === undefined ||
                pacman.playerMovement[tilePosition.row][tilePosition.col] === undefined ||
                pacman.playerMovement[tilePosition.row][tilePosition.col]) {
            return true;
        }
        return false;
    };

    this.doMovement = function(movement, speed) {
        var newPosition = {
            x: this.position.x + speed * movement.x,
            y: this.position.y + speed * movement.y
        };
        this.position = newPosition;
    };

    // moves object to the other side if it moves outside grid
    this.correctPosition = function() {
        // going out from left
        if (this.position.x < 0) {
            this.position.x += pacman.config.tileSize * pacman.fieldInUse.width;
        }
        // going out from right
        if (this.position.x > pacman.config.tileSize * pacman.fieldInUse.width) {
            this.position.x -= pacman.config.tileSize * pacman.fieldInUse.width;
        }
        // going out from top
        if (this.position.y < 0) {
            this.position.y += pacman.config.tileSize * pacman.fieldInUse.height;
        }
        // going out from bottom
        if (this.position.y > pacman.config.tileSize * pacman.fieldInUse.height) {
            this.position.y -= pacman.config.tileSize * pacman.fieldInUse.height;
        }
    };

    this.eat = function() {
        // where is pac-man
        var playerPosition = pacman.tools.getTilePosition(this.position);
        // check if there are pellets in pac-man's position and if yes, remove from game and add points
        if (pacman.pellets[playerPosition.row][playerPosition.col] !== undefined &&
                !pacman.pellets[playerPosition.row][playerPosition.col].eaten) {
            // reduce pellet count
            pacman.pelletCount--;
            // points
            if (pacman.pellets[playerPosition.row][playerPosition.col].isPowerPellet) {
                // if pellet is a power pellet, enter fright mode
                pacman.startFright();
                pacman.stats.addPoints(50);
            } else {
                // normal pellet
                pacman.stats.addPoints(10);
            }
            // hide object from raphael paper and set eaten to true
            pacman.pellets[playerPosition.row][playerPosition.col].hide();
            pacman.pellets[playerPosition.row][playerPosition.col].eaten = true;
            return true;
        }
        return false;
    };

    this.checkCollisions = function() {
        var playerPosition = pacman.tools.getTilePosition(pacman.player.position);
        $.each(pacman.ghosts, function(index, ghost) {
            var ghostPosition = pacman.tools.getTilePosition(ghost.position);
            if (playerPosition.row === ghostPosition.row && playerPosition.col === ghostPosition.col) {
                // handle collision
                // ghost in fright mode: kill ghost
                if (ghost.mode === "fright") {
                    ghost.setMode("dead");
                    pacman.stats.addGhostPoints();
                } else if (ghost.mode !== "dead") {
                    if (pacman.stats.removeLife()) {
                        // return true if there are lifes left
                        pacman.death(pacman.continueAfterDeath);
                    } else {
                        // no lifes left so end game
                        pacman.death(pacman.end);
                    }
                }
            }
        });
    };

    this.setMode = function(mode) {
        this.mode = mode;
    };

    // resets position and movements to start conditions
    this.reset = function() {
        this.position = pacman.playerStart;
        this.movement = {x: -1, y: 0, objectRotation: 180};
        this.newMovement = this.movement;
        this.mode = "chase";
    };
};
