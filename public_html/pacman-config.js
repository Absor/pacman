// Characters to construct the fields
// W = wall
// C = candy (pellet)
// P = player / Pac-Man
// U = power-up (power pellet)
// S = score area
// L = life / fruit counter area
// G = ghost room gate
// H = ghost home
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
        ghost: ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(255, 255, 255)"],
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
            "WWWWWWCWWNNNNNNNNNNWWCWWWWWW",
            "WWWWWWCWWNWWWGGWWWNWWCWWWWWW",
            "WWWWWWCWWNWBBBBBBWNWWCWWWWWW",
            "NNNNNNCNNNWBHHHHBWNNNCNNNNNN",
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