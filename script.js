const c = document.querySelector("canvas");
const ctx = c.getContext("2d");

c.width = 400, c.height = 400

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

var keys = {
    up: false, down: false, 
    right: false, left: false
}
const pl = { x: 3, y: 3, angle: 0 } // Player
const fov = 75 // Field of View

function walk(direction) {
    const angle = pl.angle * (Math.PI / 180)
    const newX = pl.x + direction * Math.cos(angle)
    const newY = pl.y + direction * Math.sin(angle)

    if (map[Math.floor(newX)][Math.floor(newY)] == 0)
        pl.x = newX, pl.y = newY
}

function render() {
    requestAnimationFrame(render)
    ctx.clearRect(0, 0, c.width, c.height)

    for (let col = 0; col < c.width; col++) {

        const angle = (pl.angle - fov / 2 + col / c.width * fov) * (Math.PI / 180)
        let distance = 0; let hit = 0

        while (!hit) {
            distance += 0.1
            const x = pl.x + Math.cos(angle) * distance
            const y = pl.y + Math.sin(angle) * distance

            if (x < 0 || x >= map.length || y < 0 || y >= map[0].length)
                hit = 1
            else if (map[Math.floor(x)][Math.floor(y)] == 1)
                hit = 2
        }

        const wallH = c.height / distance;
        const bottom = c.height / 2 + wallH / 2;
        const top = c.height / 2 - wallH / 2;

        ctx.fillStyle = "white"
        ctx.fillRect(col, top, 1, bottom - top);
    }

    if (keys.up) {
        walk(0.05)
        if(keys.right){pl.angle += 2}
        if(keys.left){pl.angle -= 2}
    }
    else if (keys.down) {
        walk(-0.05) 
        if(keys.right){pl.angle += 2}
        if(keys.left){pl.angle -= 2}
    }
    else if (keys.right) {
        pl.angle += 2
    }
    else if (keys.left) {
        pl.angle -= 2
    }
    else {
        walk(0), pl.angle += 0
    }
}

render();

document.addEventListener("keydown", evt => {

    if (evt.key == "ArrowUp") { keys.up = true }
    if (evt.key == "ArrowDown") { keys.down = true }
    if (evt.key == "ArrowRight") { keys.right = true }
    if (evt.key == "ArrowLeft") { keys.left = true }
})
document.addEventListener("keyup", evt => {

    if (evt.key == "ArrowUp") { keys.up = false }
    if (evt.key == "ArrowDown") { keys.down = false }
    if (evt.key == "ArrowRight") { keys.right = false }
    if (evt.key == "ArrowLeft") { keys.left = false }
})