pacman.Enemy = function(name, startPosition) {
    // position and movement
    this.name = name;
    this.originalStart = startPosition;
    this.position = startPosition;
    this.ai = pacman.ai["blinky"];
    this.movement = {x: -1, y: 0};
    this.mode = "out";

    // paper object
    this.paperObject = pacman.paper.path();
    this.paperObject.attr(pacman.svg.ghost(this.position));
    this.paperObject.attr("fill", pacman.config.colours.ghost[this.name]);
    this.paperObject.attr("stroke", "none");

    this.animate = function() {
        this.paperObject.attr(pacman.svg.ghost(this.position));
    };

    this.move = function() {
        var speedLeft = pacman.config.speeds.enemy;

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

        // if we get to crossroads, ask ai for where to go
        if (this.position.x % pacman.config.tileSize === 0 && this.position.y % pacman.config.tileSize === 0) {
            var ownPosition = {row: this.position.y / pacman.config.tileSize, col: this.position.x / pacman.config.tileSize};

            if (this.mode === "dead" && pacman.ghostHome.row === ownPosition.row && pacman.ghostHome.col === ownPosition.col) {
                this.mode = "out";
            } else if (this.mode === "out" && pacman.goodTarget.row === ownPosition.row && pacman.goodTarget.col === ownPosition.col) {
                this.mode = pacman.mode;
            }

            var newMovement = this.ai.getMovement(this.movement, ownPosition, this.mode);
            if (newMovement !== undefined) {
                this.movement = newMovement;
            }
        }

        // continue movement
        var newPosition = {
            x: this.position.x + this.movement.x * speedLeft,
            y: this.position.y + this.movement.y * speedLeft
        };

        this.position = newPosition;

        // if we move outside the field
        if (this.position.x < 0) {
            this.position.x += pacman.config.tileSize * pacman.fieldInUse.width;
        }
        if (this.position.x > pacman.config.tileSize * pacman.fieldInUse.width) {
            this.position.x -= pacman.config.tileSize * pacman.fieldInUse.width;
        }
    };
};