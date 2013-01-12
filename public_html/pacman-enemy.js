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
    this.leftEye.attr(pacman.svg.ghostEye("left", this.position));
    this.leftPupil = pacman.paper.circle(0, 0, 0);
    this.leftPupil.attr(pacman.svg.ghostPupil("left", this.position, this.movement));
    // right eye
    this.rightEye = pacman.paper.circle(0, 0, 0);
    this.rightEye.attr(pacman.svg.ghostEye("right", this.position));
    this.rightPupil = pacman.paper.circle(0, 0, 0);
    this.rightPupil.attr(pacman.svg.ghostPupil("right", this.position, this.movement));

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

        if (this.goingOverMiddle(speed)) {
            this.align();
            this.movement = this.ai.getMovement(this.movement, this.position, this.mode, this.forcedTarget);
        }

        this.doMovement(this.movement, speed);
        
        this.correctPosition();
    };

    this.goingOverMiddle = function(speed) {

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

    this.setMode = function(mode) {
        if (mode === this.mode) {
            return;
        }
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
            return;
        }
        // otherwise
        this.colour = pacman.config.colours.ghost[this.name];
        this.body.show();
    };
};
