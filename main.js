const startBtn = document.querySelectorAll('.start');
const welcomeBoard = document.querySelector('.welcome-board')
const gameOver = document.querySelector('.game-over')
const fireEffect = document.getElementById('fire');
const explosion = document.getElementById('explosion');
const startAudio = document.getElementById('start');
const lostLife = document.getElementById('lost-life')
let gameRunning = false;

function resetGame() {
    bullets.forEach((bullet) => bullet.remove());
    bullets.length = 0;
    enemies.forEach((enemy) => enemy.remove());
    enemies.length = 0;
    scoreNumber = 0;
    livesNumber = 3;
    score.innerText = scoreNumber;
    lives.innerText = livesNumber;
  }


startBtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        startAudio.play()
        if (!gameRunning) { 

            if (gameOver.style.visibility === 'visible') {
                resetGame();
              }

            welcomeBoard.style.zIndex = -1;
            welcomeBoard.style.visibility = 'hidden';
            startGame();
            gameOver.style.visibility = 'hidden';
            gameRunning = true; 
          }
    } )
})

const playerElement = document.getElementById('player')
const boardElement = document.getElementById('game-board')
const bullets = [];
const enemies = []
const score = document.querySelector('.score-number');
const lives = document.querySelector('.lives-number')

let scoreNumber = 0;
let livesNumber = 3;

function startGame(){

    
    const createBullet = ()=>{
        const bullet = document.createElement('div')
        bullet.className = 'bullet';
        bullet.style.left = `${playerElement.offsetLeft}px`;
        bullet.style.bottom = `${playerElement.offsetHeight}px`;
    
        boardElement.appendChild(bullet)
        bullets.push(bullet)
        fireEffect.play()
    }
    
    
    const handleKeyboard = (e)=>{
        const movePlayer = (direction)=>{
            const newPosition = playerElement.offsetLeft + direction * 35;
            const {left, right} = boardElement.getBoundingClientRect();
            const minLeft = player.offsetWidth/2
            const maxRight = right - left - minLeft
            if(newPosition >= minLeft && newPosition < maxRight){
                playerElement.style.left = `${newPosition}px`
            }
        }
        switch(e.code){
            case 'ArrowLeft': movePlayer(-1); break
            case 'ArrowRight': movePlayer(1); break
            case 'Space': createBullet()
        }
    }
    
    
    window.addEventListener('keydown', handleKeyboard);
    const checkCollision = (bullet, enemy) =>{
        return(bullet.left > enemy.left && bullet.right < enemy.right) && (bullet.top < enemy.bottom)
    }
    const chceckBulletCollision = (bullet) =>{
        const position = bullet.getBoundingClientRect();
        for(let i = 0; i< enemies.length; i++){
            const enemy = enemies[i]
            const enemyPosition = enemy.getBoundingClientRect();
    
            if(checkCollision(position, enemyPosition)){
                const idx = bullets.indexOf(bullet)
                bullets.splice(idx, 1);
                bullet.remove();
                enemy.style.backgroundImage='url(./img/boom.svg)'
                enemies.splice(i, 1);
                explosion.play()
                setTimeout(()=>{
                    enemy.remove()
                }, 1000)
            
    
                ++scoreNumber
                score.innerText= scoreNumber
            }
        }
    }
    
    
    const moveBullet = () =>{
        for(let i= 0; i < bullets.length; i++){
            const bullet = bullets[i];
    
            bullet.style.top = `${bullet.offsetTop - 10}px`;
    
            if(bullet.offsetTop <=0){
                bullets.splice(i, 1);
                i--;
                bullet.remove()
            } else {
                chceckBulletCollision(bullet)
            }
    
        }
    }
    
    
    createEnemy = () =>{
        const randomCreate = Math.round(Math.random());
        if(!randomCreate) return
    
        const enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.top = -40 + 'px';
        enemy.style.left = `${Math.floor(Math.random() * (boardElement.offsetWidth - 120) + 60)}px`;
        boardElement.appendChild(enemy);
        enemies.push(enemy);
    }
    
    const moveEnemies = () =>{
        for(let i =0; i < enemies.length; i++ ){
            const enemy = enemies[i];
            enemy.style.top = `${enemy.offsetTop + 10}px`;
    
            if(enemy.offsetTop >= boardElement.offsetHeight){
                enemies.splice(i, 1);
                enemy.remove()
                --livesNumber
                lostLife.play()
            }
        }

        lives.innerText = livesNumber
          
        if(livesNumber === 0){
            clearInterval(enemiesInterval);
            gameRunning = false;
            gameOver.style.visibility = 'visible';
        }
    }
    let enemiesInterval = setInterval(moveEnemies, 100);
    setInterval(moveBullet, 50);
    setInterval(createEnemy, 1000);
    
}

