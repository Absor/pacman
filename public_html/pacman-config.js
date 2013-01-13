// Characters to construct the fields
// W = wall
// C = candy (pellet)
// P = player / Pac-Man
// U = power-up (power pellet)
// S = slow, half speed area for ghosts
// G = ghost room gate
// H = ghost start
// X = ghost home (reset spot)
// N = no coin area (empty corridor)

pacman.config = {
    // the container (div) that holds the svg-elements of the game
    containerId: "pacman",
    // size of one tile in the game grid (about pac-man's size)
    tileSize: 20,
    // colour settings, names self-explanatory
    colours: {
        pacman: "rgb(255, 255, 0)",
        frightGhost: "rgb(0, 0, 255)",
        frightAlarm: "rgb(255, 255, 255)",
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
        powerPellet: "rgb(255, 255, 255)",
        textColour: "rgb(255, 255, 255)"
    },
    playField: {
        // if you expand the play field strings, keep these updated too
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
            "WWWWWWCWWNWNNNNNNWNWWCWWWWWW",
            "SSSSSSCNNNWHNHXHNWNNNCSSSSSS",
            "WWWWWWCWWNWNNNNNNWNWWCWWWWWW",
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
