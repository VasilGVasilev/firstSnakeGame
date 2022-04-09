import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5
const snakeBody = [{x: 11, y: 11}]

export function update() {
    // two-fold movement
    
    const inputDirection = getInputDirection()

    // body
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // set this as a brand new object with spread operator: due to reference issues, you are making a duplicate
        // every segment is moving towards the parents body
        snakeBody[i + 1] = {...snakeBody[i]}
        // i - 2 is the second to last element; i + 1 is the last element
        // and the previous element (last element) becomes current element
        // we start to update the snake from its back forward
    }

    // moving the head
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

    // remember to clean the animation in game.js
}
// pass the gameBoard in the game>draw>drawSnake and grab it by decl var in game.js
export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        // we can set that coordinate above the following way:
        // rows go up to down, that's why y +1 goes down on update function
        snakeElement.style.gridRowStart = segment.y
        // columns go left to right, that's why x +1 does left on update function
        snakeElement.style.gridColumnStart = segment.x
        // in order to visualise it:
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}