let inputDirection = { x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0}

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

export function getInputDirection() {
    // stop snake from reversing direction on itself
    // you save the value of the last inputdir and check if it is non-zero, it will obviously be
    // thus, it will break before being able to reverse, if you are moving on the y axis,
    // you'll only be able to move on the x axis, not reverse on the y axis
    lastInputDirection = inputDirection
    return inputDirection
}