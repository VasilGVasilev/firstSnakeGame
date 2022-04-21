let inputDirection = { x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0}

// for keyarrow

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1}
            break
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1}
            break
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0}
            break
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: 0}
            break
    }
})

// for touchscreen



let startingX, startingY, endingX, endingY
let moving = false

// the .touches registers the touches
function handleStart(evt) {
    evt.preventDefault();
    startingX = evt.touches[0].clientX
    startingY = evt.touches[0].clientY
}

function handleMove(evt) {
    evt.preventDefault();
    moving = true;
    endingX = evt.touches[0].clientX
    endingY = evt.touches[0].clientY
}

// if ending is higher than start => there is a move
function handleEnd(evt) {
    evt.preventDefault();
    if (!moving) return
    // x axis move
    if (Math.abs(endingX - startingX) > Math.abs(endingY - startingY)) {
        if (endingX > startingX) {
            if (lastInputDirection.x !== 0)
                return
            else
                inputDirection = { x: 1, y: 0}
        } else if (endingX < startingX)
            if (lastInputDirection.x !== 0)
                return
            else
                inputDirection = { x: -1, y: 0}
    // y axis move
    } else {
        if (endingY > startingY) {
            if (lastInputDirection.y !== 0)
                return
            else
                inputDirection = { x: 0, y: 1}
        } else if (endingY < startingY)
            if (lastInputDirection.y !== 0)
                return
            else
                inputDirection = { x: 0, y: -1}
    }
    moving = false
}
// using the official MDN docs tutorial on touch events
function startup() {
    const el = document.getElementById('game-board');
    el.addEventListener('touchstart', handleStart);
    el.addEventListener('touchmove', handleMove);
    el.addEventListener('touchend', handleEnd);
  }
  
document.addEventListener("DOMContentLoaded", startup);

export function getInputDirection() {
    // stop snake from reversing direction on itself
    // you save the value of the last inputdir and check if it is non-zero, it will obviously be
    // thus, it will break before being able to reverse, if you are moving on the y axis,
    // you'll only be able to move on the x axis, not reverse on the y axis
    lastInputDirection = inputDirection
    return inputDirection
}