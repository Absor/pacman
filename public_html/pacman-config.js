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
    speeds: {
        player: 1.5,
        enemy: 1.5
    },
    colours: {
        pacman: "rgb(255, 255, 0)",
        ghost: {
            blinky: "rgb(255, 0, 0)",
            pinky: "rgb(0, 255, 0)",
            inky: "rgb(0, 0, 255)",
            clyde: "rgb(255, 255, 255)"
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
            "WWWWWWCWWNNNNHNNNNNWWCWWWWWW",
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