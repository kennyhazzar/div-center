var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')

const colors = ['red', 'blue', 'green', 'yellow', 'pink']

var score = 0

var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')

    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')

    const interval = setInterval(() => {
        var time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    const time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function handleBoxClick(event) {
    
    if (!isGameStarted) {
        return
    }

    // console.log(event.target.dataset.box)

    if (event.target.dataset.box) {
        score++
        renderBox()
    }

}


function renderBox() {
    $game.innerHTML = ''
    const box = document.createElement('div')
    const boxSize = getRandom(30, 100)
    const gameSize = $game.getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = `${boxSize}px`
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[getRandom(0, colors.length)]
    box.style.top = `${getRandom(0, maxTop)}px`
    box.style.left = `${getRandom(0, maxLeft)}px`
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}