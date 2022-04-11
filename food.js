import {onSnake, expandSnake} from './snake.js'

let food = {x: 0, y: 1}
// note that CSS GRID starts at 1, not 0 so y: 1, because 0 is technically outside of the grid

const EXPANSION_RATE = 1

export function update() {
    // check if snake over food => it can eat it
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE) 
        food = { x: 20, y: 10 }
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}