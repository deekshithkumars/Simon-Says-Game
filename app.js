let userSeq=[];
let gameSeq=[];
let highScoreSeq=[];
let color = ["red","green","yellow","purple"];

let started = false;
let level=0;
let h3 = document.querySelector("h3");

 document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game started");
        started = true;
    }
    levelUp();
 });

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function gameOverFlash(){
        h3.innerHTML = `Game Over...your score was <b>${level}</b> <br>Press any key to start the game`;
        
        let body = document.querySelector("body");
        body.classList.add("gameOver");
        setTimeout(function(){
            body.classList.remove("gameOver");
        },250);
        let HS = level;
        highScoreSeq.push(HS);
        highScore();
}

function levelUp(){
    level++;
    h3.innerText = `level ${level}`;
    userSeq=[];
    

    let randNum = Math.floor(Math.random()*3);
    let randColor = color[randNum];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}

function checkColor(idx){
    if(gameSeq[idx]===userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        gameOverFlash();
        console.log("GAME OVER..");
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkColor(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}



/* working on this */
function highScore(){
    let max=highScoreSeq[0];
    for(let i=0;i<highScoreSeq.length;i++){
    if(highScoreSeq[i]>max){
        max = highScoreSeq[i];
    }
}
let h2 = document.querySelector("h2");
return h2.innerHTML =`HIGH SCORE <b>${max}</b>`;
}

function reset(){
    userSeq=[];
    gameSeq=[];
    started = false;
    level=0;
}
