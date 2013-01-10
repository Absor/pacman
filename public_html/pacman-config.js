// Characters to construct the fields
// W = wall
// C = candy (pellet)
// P = player / Pac-Man
// U = power-up (power pellet)
// S = score area
// L = life / fruit counter area
// G = ghost room gate
// H = ghost start
// X = ghost home (reset spot)
// N = no coin area (empty corridor)
// B = bad area

pacman.config = {
    containerId: "pacman",
    tileSize: 20,
    colours: {
        pacman: "rgb(255, 255, 0)",
        frightGhost: "rgb(0, 0, 255)",
        ghost: {
            blinky: "rgb(255, 0, 0)",
            inky: "rgb(0, 245, 255)",
            pinky: "rgb(255, 192, 203)",
            clyde: "rgb(255, 215, 0)"
        },
        background: "rgb(0, 0, 0)",
        wall: "rgb(0, 100, 200)",
        gate: "rgb(255, 0, 0)",
        pellet: "rgb(255, 255, 0)",
        powerPellet: "rgb(255, 255, 255)"
    },
    playField1: {
        width: 28,
        height: 31,
        field: [
            "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
            "WCCCCCCCCCCCCWWCCCCCCCCCCCCW",
            "WCWWWWCWWWWWCWWCWWWWWCWWWWCW",
            "WUWWWWCWWWWWCWWCWWWWWCWWWWUW",
            "WCWWWWCWWWWWCWWCWWWWWCWWWWCW",
            "WCCCCCCCCCCCCCCCCCCCCCCCCCCW",
            "WCWWWWCWWCWWWWWWWWCWWCWWWWCW",
            "WCWWWWCWWCWWWWWWWWCWWCWWWWCW",
            "WCCCCCCWWCCCCWWCCCCWWCCCCCCW",
            "WWWWWWCWWWWWNWWNWWWWWCWWWWWW",
            "WWWWWWCWWWWWNWWNWWWWWCWWWWWW",
            "WWWWWWCWWNNNNHZNNNNWWCWWWWWW",
            "WWWWWWCWWNWWWGGWWWNWWCWWWWWW",
            "WWWWWWCWWNWBBBBBBWNWWCWWWWWW",
            "NNNNNNCNNNWHBHXHBWNNNCNNNNNN",
            "WWWWWWCWWNWBBBBBBWNWWCWWWWWW",
            "WWWWWWCWWNWWWWWWWWNWWCWWWWWW",
            "WWWWWWCWWNNNNNNNNNNWWCWWWWWW",
            "WWWWWWCWWNWWWWWWWWNWWCWWWWWW",
            "WWWWWWCWWNWWWWWWWWNWWCWWWWWW",
            "WCCCCCCCCCCCCWWCCCCCCCCCCCCW",
            "WCWWWWCWWWWWCWWCWWWWWCWWWWCW",
            "WCWWWWCWWWWWCWWCWWWWWCWWWWCW",
            "WUCCWWCCCCCCCPNCCCCCCCWWCCUW",
            "WWWCWWCWWCWWWWWWWWCWWCWWCWWW",
            "WWWCWWCWWCWWWWWWWWCWWCWWCWWW",
            "WCCCCCCWWCCCCWWCCCCWWCCCCCCW",
            "WCWWWWWWWWWWCWWCWWWWWWWWWWCW",
            "WCWWWWWWWWWWCWWCWWWWWWWWWWCW",
            "WCCCCCCCCCCCCCCCCCCCCCCCCCCW",
            "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
        ]}
};
