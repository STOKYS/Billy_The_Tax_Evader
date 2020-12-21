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

/* functions */

function frame (i) {
    i = Math.floor(i)
    let arr = ["playerImg00", "playerImg01", "playerImg02", "playerImg03", "playerImg04", "playerImg05"]
    return arr[i]
}

function update() {
    if ((Date.now() - timeOne) >= 10) {
        timeOne = Date.now()
        game.cycle()
        playerup.update()
    }
    requestAnimationFrame(update)
}

document.onkeyup = function movement(key) {
    if ((key.keyCode == 32 || key.keyCode == 38 || key.keyCode == 87) && playerup.jump == false) {
        playerup.jump = true
    }
}


/* objects */

let game = {
    cycle: function () {
        this.background()
    },
    background: function () {
        if (speedUp < 3){
            console.log(speedUp)
            speedUp += 0.0001
        }
        if (times < -6790) {
            times = 0
        }
        times -= 5 * speedUp
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, times, 0, 8500, 850)
    },
}

/* variables */

let times = 0
let timeOne = 0;
let speedUp = 1;

$("#start").on("click", function () {
    button.disabled = true
    timeOne = Date.now()
    requestAnimationFrame(update)
})


let playerup = new player(50, 350, 45, 80)