// gameloop to constantly update render
// but the default render speed is too fast so implenent the snakespeed var
// to hit a certain treshold for when an update is necessary

let lastRenderTime = 0
const SNAKE_SPEED = 5

function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime
    
    update()
    draw()
}
window.requestAnimationFrame(main)

function update() {

}

function draw() {

}