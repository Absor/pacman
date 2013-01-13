pacman.keyhandler = (function() {
    var keys = [];
    for (var i = 0; i < 256; i++) {
        keys[i] = false;
    }

    function up() {
        return keys[38] || keys[175] || keys[87];
    }

    function down() {
        return keys[40] || keys[176] || keys[83];
    }

    function left() {
        return keys[37] || keys[178] || keys[65];
    }

    function right() {
        return keys[39] || keys[177] || keys[68];
    }

    function keydown(keycode) {
        keys[keycode] = true;
        if (keycode === 13) {
            pacman.enterEvent();
        }
    }

    function keyup(keycode) {
        keys[keycode] = false;
    }

    function getMovement() {
        var movement = {
            x: 0,
            y: 0,
            objectRotation: null
        };

        // else if because we allow only one way movement at a time
        if (up()) {
            movement.y = -1;
            movement.objectRotation = 270;
        } else if (down()) {
            movement.y = 1;
            movement.objectRotation = 90;
        } else if (left()) {
            movement.x = -1;
            movement.objectRotation = 180;
        } else if (right()) {
            movement.x = 1;
            movement.objectRotation = 0;
        }

        if (movement.objectRotation === null) {
            return null;
        }
        return movement;
    }

    return {
        keydown: keydown,
        keyup: keyup,
        getMovement: getMovement
    };
})();
