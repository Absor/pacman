pacman.Enemy = function(name, startPosition) {
    this.name = name;

    // position and movement
    this.originalStart = startPosition;
    this.position = startPosition;
    this.movement = {x: -1, y: 0};
    this.untilNextTile = pacman.config.tileSize / 2;
    // ghost mode
    this.mode = "chase";
    this.forcedTarget = pacman.goodTarget;
    this.elroyLevel = 0;

    this.ai = pacman.ai[this.name];

    this.colour = pacman.config.colours.ghost[this.name];


    // paper objects
    // body
    this.body = pacman.paper.path();
    // left eye
    this.leftEye = pacman.paper.circle(0, 0, 0);
    this.leftPupil = pacman.paper.circle(0, 0, 0);
    // right eye
    this.rightEye = pacman.paper.circle(0, 0, 0);
    this.rightPupil = pacman.paper.circle(0, 0, 0);

    this.animate = function() {
        // animate body
        this.body.attr(pacman.svg.ghostBody(this.position, this.colour));
        // animate left eye and pupil
        this.leftEye.attr(pacman.svg.ghostEye("left", this.position));
        this.leftPupil.attr(pacman.svg.ghostPupil("left", this.position, this.movement));
        // animate right eye and pupil
        this.rightEye.attr(pacman.svg.ghostEye("right", this.position));
        this.rightPupil.attr(pacman.svg.ghostPupil("right", this.position, this.movement));
    };

    this.move = function() {
        var speed = pacman.tools.enemySpeed(this.mode, this.elroyLevel);
        var ownTilePosition = pacman.tools.getTilePosition(this.position);
        
        // half speed if in tunnel and not dead
        if (this.mode !== "dead" && pacman.slowMovement[ownTilePosition.row][ownTilePosition.col]) {
            speed /= 2;
        }

        if (speed <= this.untilNextTile) {
            this.untilNextTile -= speed;
            this.doMovement(speed);
        } else {
            // if we go over the middle (speed > the distance to next tile)
            this.doMovement(this.untilNextTile);
            // now ghost is in the middle of the tile, time to do decisions

            // if we are at the good target
            if (pacman.goodTarget.col === ownTilePosition.col &&
                    pacman.goodTarget.row === ownTilePosition.row) {
                // and dead, start going in
                if (this.mode === "dead") {
                    this.forcedTarget = pacman.ghostHome;
                } else {
                    // if not dead clear forced target
                    this.forcedTarget = null;
                }
            } else if (this.mode === "dead" && pacman.ghostHome.col === ownTilePosition.col &&
                    pacman.ghostHome.row === ownTilePosition.row) {
                // if ghost is home and dead, reset to chase
                this.mode = "";
                this.setMode("chase");
                // target force to get out of pen
                this.forcedTarget = pacman.goodTarget;
            }

            var newMovement = this.ai.getMovement(this.movement, ownTilePosition, this.mode, this.forcedTarget);
            if (newMovement !== undefined) {
                this.movement = newMovement;
            }
            var speedLeft = speed - this.untilNextTile;
            this.doMovement(speedLeft);
            this.untilNextTile = pacman.config.tileSize - speedLeft;
        }

        // corrects position if we move outside the grid
        this.correctPosition();
    };

    this.doMovement = function(speed) {
        var newPosition = {
            x: this.position.x + speed * this.movement.x,
            y: this.position.y + speed * this.movement.y
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

    this.setMode = function(mode) {
        switch (mode) {
            // can only turn to chase, scatter or frightened if not dead
            case "chase":
            case "scatter":
            case "fright":
                if (this.mode !== "dead") {
                    this.mode = mode;
                }
                break;
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
            this.body.show();
            return;
        }
        // otherwise
        this.colour = pacman.config.colours.ghost[this.name];
        this.body.show();
    };

    // resets position, movement and mode to start conditions
    this.reset = function() {
        this.position = this.originalStart;
        this.movement = {x: -1, y: 0};
        this.untilNextTile = pacman.config.tileSize / 2;
        this.setMode("chase");
        this.forcedTarget = pacman.goodTarget;
    };
};
