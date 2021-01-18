const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "source-over";

const score = document.getElementById("score")
const button = document.getElementById("start")
const jump = 32;


const backgroundImg = new Image()
special_event()
const playerImg00 = new Image()
playerImg00.src = "img/player/00.png"
const playerImg01 = new Image()
playerImg01.src = "img/player/01.png"
const playerImg02 = new Image()
playerImg02.src = "img/player/02.png"
const playerImg03 = new Image()
playerImg03.src = "img/player/03.png"
const playerImg04 = new Image()
playerImg04.src = "img/player/04.png"
const playerImg05 = new Image()
playerImg05.src = "img/player/05.png"
const obstacleImg = new Image()
obstacleImg.src = "img/obstacle/obstacle.png"

function special_event(){
    let arr = ["img/background.png", "img/backgroundChristmas.png"]
    let i = 0;
    let thisDate = new Date
    if ((thisDate.getDate() == 24 || thisDate.getDate() == 25) && thisDate.getMonth() == 11){
        i = 1
    }
    backgroundImg.src = arr[i]
}


