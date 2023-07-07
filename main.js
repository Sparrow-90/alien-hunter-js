const playerElement = document.getElementById('player')
const boardElement = document.getElementById('game-board')
const handleKeyboard = (e)=>{
    const movePlayer = (direction)=>{
        const newPosition = playerElement.offsetLeft + direction * 10;
        const {left, right} = boardElement.getBoundingClientRect();
        const minLeft = player.offsetWidth/2
        const maxRight = right - left - minLeft
        if(newPosition >= minLeft && newPosition < maxRight){
            playerElement.style.left = `${newPosition}px`
        }
    }

    switch(e.code){
        case 'ArrowLeft': movePlayer(-1); break
        case 'ArrowRight': movePlayer(1)
    }
}


window.addEventListener('keydown', handleKeyboard)