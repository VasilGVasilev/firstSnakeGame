// gameloop to constantly update render
// but the default render speed is too fast so implenent the snakespeed var
// to hit a certain treshold for when an update is necessary

import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, onSnake, getSnakehead, snakeIntersection, currentSizeOfSnake} from './snake.js'

import {update as updateFood, draw as drawFood } from './food.js'

import {outSideGrid} from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
let sizeOfSnake = 0


function main(currentTime) {
    if (gameOver) {
        sizeOfSnake = currentSizeOfSnake - 1
        // The confirm() method is used to display a modal dialog with an optional message and two buttons, OK and Cancel.
        if (confirm('You lost. Your score: ' + sizeOfSnake + ' Press ok to restart!')){
            // if true:
            location.reload()
            // if false:
        }
        return
    }
    
    // rendering logic

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime
    
    update()
    draw()
}
window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    // outSideGrid checks if pos is anywhere outside and pos is the snake
    gameOver = outSideGrid(getSnakehead()) || snakeIntersection()
}

