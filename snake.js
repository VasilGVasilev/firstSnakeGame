import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5
const snakeBody = [{x: 11, y: 11}]
let newSegments = 0

export function update() {
    // I. expansion of snake
    addSegments()

    // II. two-fold movement
    
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

export function expandSnake(amountOfExpansion) {
    newSegments += amountOfExpansion
}

export function onSnake(positionOfFood) {
    // The some() method tests whether at least one element in the array passes the test implemented by the provided function.
    return snakeBody.some(segment => {
        return equalPosition(segment, positionOfFood)
    })
}
// pos1 is any segment of the snake but it is obviously only the head and pos2 is the food
function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

// if the snake eats food, it will duplicate the one position and as it moves it will expand outwords

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        // push to add the new segment at the back
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
        // or snakeBody[snakeBody.length] = {...snakeBody[snakeBody.length - 1]}
        // => populate with a duplicate of the last segment of the snake a new last segment
    }
    // so that it does not add segments on each movement 
    newSegments = 0
}