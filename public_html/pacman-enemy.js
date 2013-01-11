pacman.Enemy = function(name, startPosition) {
    this.name = name;
    
    // position and movement
    this.originalStart = startPosition;
    this.position = startPosition;
    this.movement = {x: -1, y: 0};
    // ghost mode
    this.mode = "chase";
    this.forcedTarget = pacman.goodTarget;
    this.elroyLevel = 0;
    
    this.ai = pacman.ai[this.name];
    
    this.colour = pacman.config.colours.ghost[this.name];


    // paper objects
    // body
    this.body = pacman.paper.path();
    this.body.attr(pacman.svg.ghostBody(this.position, this.colour));
    // left eye
    this.leftEye = pacman.paper.circle(0, 0, 0);
    this.leftEye.attr(pacman.svg.eye("left", this.position));
    this.leftPupil = pacman.paper.circle(0, 0, 0);
    this.leftPupil.attr(pacman.svg.pupil("left", this.position, this.movement));
    // right eye
    this.rightEye = pacman.paper.circle(0, 0, 0);
    this.rightEye.attr(pacman.svg.eye("right", this.position));
    this.rightPupil = pacman.paper.circle(0, 0, 0);
    this.rightPupil.attr(pacman.svg.pupil("right", this.position, this.movement));

    this.animate = function() {
        // animate body
        this.body.attr(pacman.svg.ghostBody(this.position, this.colour));
        // animate left eye and pupil
        this.leftEye.attr(pacman.svg.eye("left", this.position));
        this.leftPupil.attr(pacman.svg.pupil("left", this.position, this.movement));
        // animate right eye and pupil
        this.rightEye.attr(pacman.svg.eye("right", this.position));
        this.rightPupil.attr(pacman.svg.pupil("right", this.position, this.movement));
    };

    this.move = function() {
        var speedLeft = pacman.tools.enemySpeed(this.mode, this.elroyLevel);

        // TODO half speed when in tunnel area

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
            var ownPosition = pacman.tools.getTilePosition(this.position);

            // if ghost is dead and reaches safe target, start going inside home
            if (this.mode === "dead" && pacman.goodTarget.row === ownPosition.row && pacman.goodTarget.col === ownPosition.col) {
                this.forcedTarget = pacman.ghostHome;
            }
            // if ghost is going dead and reaches home position, start going out
            else if (this.mode === "dead" && pacman.ghostHome.row === ownPosition.row && pacman.ghostHome.col === ownPosition.col) {
                this.forcedTarget = pacman.goodTarget;
                // can't change from dead so change mode first
                this.mode = "";
                this.setMode(pacman.mode);
            }
            // if ghost is going out and reaches safe target, clear forced target
            else if (this.forcedTarget !== null && pacman.goodTarget.row === ownPosition.row && pacman.goodTarget.col === ownPosition.col) {
                this.forcedTarget = null;
            }

            var newMovement = this.ai.getMovement(this.movement, ownPosition, this.mode, this.forcedTarget);
            // if new movement didnt return anything (going outside the grid), don't change movement/direction
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
        // TODO
        // left
        if (this.position.x < 0) {
            this.position.x += pacman.config.tileSize * pacman.fieldInUse.width;
        }
        // right
        if (this.position.x > pacman.config.tileSize * pacman.fieldInUse.width) {
            this.position.x -= pacman.config.tileSize * pacman.fieldInUse.width;
        }
        // up
        // down
    };

    this.setMode = function(mode) {
        if (mode === this.mode) {
            return;
        }
        switch (mode) {
            // can only turn to chase, scatter or frightened if not dead
            case "chase":
            case "scatter":
            case "fright":
                if (this.mode === "dead") {
                    break;
                }
                // can always turn dead or going out
            case "dead":
                this.mode = mode;
                this.forcedTarget = pacman.goodTarget;
                break;
        }

        // set right colours and visibility depending on mode
        // if dead
        if (this.mode === "dead") {
            this.body.hide();
            return;
        }
        // if frightened
        if (this.mode === "fright") {
            this.colour = pacman.config.colours.frightGhost;
            return;
        }
        // otherwise
        this.colour = pacman.config.colours.ghost[this.name];
        this.body.show();
    };
};
