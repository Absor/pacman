pacman.svg = (function() {
    function player(position, rotation) {
        var r = pacman.config.tileSize / 2;
        var x = position.x + r;
        var y = position.y + r;
        // the angles for mouth movement
        var startAngle = Math.sin((pacman.frame / 30) * Math.PI) * 30;
        var endAngle = 359 - startAngle;

        var flag = (endAngle - startAngle) > 180;
        startAngle = (startAngle % 360) * Math.PI / 180;
        endAngle = (endAngle % 360) * Math.PI / 180;
        
        return {
            x: x,
            y: y,
            path: [["M", x, y], ["l", r * Math.cos(startAngle), r * Math.sin(startAngle)], ["A", r, r, 0, +flag, 1, x + r * Math.cos(endAngle), y + r * Math.sin(endAngle)], ["z"]],
            transform: ["r", rotation, x, y]
        };
    }

    function enemy(position) {
        var r = pacman.config.tileSize / 2;
        var x = position.x + r;
        var y = position.y + r;
        
        return {
            x: x,
            y: y,
            path: [["M", x - r, y + r], ["c", 0, -3*r, 2*r, -3*r, 2*r, 0], ["z"]]
        };
    }

    return {
        pacman: player,
        ghost: enemy
    };
})();