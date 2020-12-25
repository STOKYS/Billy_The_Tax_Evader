/* classes */

class player {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.i = 0
        this.jump = false;
        this.result = 0
        this.backup = 0;
        this.last = 0
        this.time = 0
    }
    update() {
        if (this.jump == true && this.time <= .5) {
            this.time += 0.009;
            // I never thought I'll ever use physics
            this.result = 150 * Math.sin(2 * Math.PI * this.time)
            this.backup = this.result
            this.result -= this.last
            this.last = this.backup
            this.y -= this.result
        } else if (this.jump == true && this.time >= .5) {
            this.y = 350
            this.jump = false
            this.time = 0;
            this.last = 0;
            this.result = 0;
            this.backup = 0;
        }
        ctx.drawImage(eval(frame(this.i)), this.x, this.y, this.width, this.height)
        if (this.i < 5.8) {
            this.i += 0.2
        } else {
            this.i = 0
        }
    }
}

class obstacle {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    update() {
        if (this.x < -50){
            this.x = 1700
        }
        this.x -= 5 * speedUp
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height)
    }
}

/* functions */

function frame(i) {
    i = Math.floor(i)
    let arr = ["playerImg00", "playerImg01", "playerImg02", "playerImg03", "playerImg04", "playerImg05"]
    return arr[i]
}

function createObst(){
    for (let i = 1; i <= 3; i++){
        obstacles.push(new obstacle((canvas.width + 50) * i/2 , 380, 50, 50));
    }
    console.log(obstacles)
}

function update() {
    if ((Date.now() - timeOne) >= 10) {
        timeOne = Date.now()
        game.cycle()
        playerup.update()
        for (let i = 0; i <= 2; i++){
            obstacles[i].update()
        }
    }
    requestAnimationFrame(update)
}
/* events */

document.onkeyup = function movement(key) {
    if ((key.keyCode == 32 || key.keyCode == 38 || key.keyCode == 87) && playerup.jump == false) {
        playerup.jump = true
    }
}

/* objects */

let game = {
    cycle: function () {
        this.background()
        console.log(times)
    },
    background: function () {
        if (speedUp < 3) {
            console.log(speedUp)
            speedUp += 0.0001
        }
        if (phase < -6790) {
            phase = 0
        }
        phase -= 5 * speedUp
        times -= 5 * speedUp
        console.log(phase + " " + times)
        score.innerText = `Tax Money Evaded: \$${(times / -100).toFixed(2)}`
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, phase, 0, 8500, 850)
    },
}

/* variables */

let times = 0
let phase = 0
let timeOne = 0;
let speedUp = 1;

$("#start").on("click", function () {
    button.disabled = true
    timeOne = Date.now()
    createObst()
    requestAnimationFrame(update)
})

let playerup = new player(50, 350, 45, 80)
let obstacles = []