/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let turn = 'X'
let winner = false
let tie = false
let board = [
    '','','',
    '','','',
    '','','',
]

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.querySelector("#message")
const resetBtnEl = document.querySelector("#reset")

/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((sqr, idx) => {
        squareEls[idx].innerHTML = sqr
    })
}

const handleClick = (event) => {
    const squareIndex = event.id
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
        return
    }
    if (winner === true) {
        return
    }
    event.innerHTML = turn
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    updateMessage()
}

const placePiece = (i) => {
    board[i] = turn
}

const checkForWinner = () => {
    winningCombos.forEach(combo => {
        const first = combo[0]
        const second = combo[1]
        const third = combo[2]
        if (board[first] === board[second] && board[first] === board[third] && board[first] !== '') {
            winner = true
        }
    }
)}

const checkForTie = () => {
    if (board.includes('') === false && winner === false) {
        tie = true
    }    
}

const switchPlayerTurn = () => {
    if (winner === true) {
        return
    }
    if (winner === false && turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    }
}

const render = () => {
    updateBoard()
    updateMessage()
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.innerHTML = `It's ${turn}'s turn.`
    } else if (winner === false && tie === true) {
        messageEl.innerHTML = "It's a tie!"
    } else {
        messageEl.innerHTML = `Congratulations ${turn}! You won!`
    }
}

const init = () => {
    board = [
        '','','',
        '','','',
        '','','',
    ]
    winner = false
    tie = false
    render()
}

init()
/*----------------------------- Event Listeners -----------------------------*/


squareEls.forEach((sqr) => {
    sqr.addEventListener('click', () => {
        handleClick(sqr)
    })
})
resetBtnEl.addEventListener('click', () => {
    init()
})