// gameloop to constantly update render
// but the default render speed is too fast so implenent the snakespeed var
// to hit a certain treshold for when an update is necessary

import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, onSnake, getSnakehead, snakeIntersection} from './snake.js'

import {update as updateFood, draw as drawFood } from './food.js'

import {outSideGrid} from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')


function main(currentTime) {
    if (gameOver) {
        return alert('you lose!')
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

