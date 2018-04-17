import { resolve } from "path";

const keyboardJS = require("keyboardjs");

let speed = 1;
let speed2 = 4000;
let usedClones = [];
let enemyCount = 10;
let gameOver = false;
const app = new PIXI.Application(1600, 1200, { backgroundColor: 0x07FC71 });

app.view.setAttribute("class", "game")

let ball = PIXI.Sprite.fromImage('images/ball.png')
ball.anchor.set(0.5);
ball.scale.x *= 0.05
ball.scale.y *= 0.05
ball.width = 40
ball.height = 40
    // console.log(ball.scale)

// move the sprite to the center of the screen
ball.x = 800;
ball.y = 1120;
app.stage.addChild(ball);



// Listen for animate update
setInterval(() => {
    usedClones.push(reArrangeEnemys());
}, speed2)

setInterval(() => {
    if (speed < 10) {
        speed += 0.05;
    }
    if (speed2 > 50) {
        speed2 -= 50;

    }
    if (enemyCount < 40) {
        enemyCount += 0.25
    }

    console.log(speed + " " + speed2 + " " + enemyCount)
}, 1000)

function spawnWave() {
    if (!gameOver) {
        new Promise((resolve, reject) => { setTimeout(() => usedClones.push(reArrangeEnemys()), speed2); }).then(spawnWave());
    }
}

app.ticker.add(function(delta) {

    usedClones.forEach((key, index) => {
        if (key !== undefined) {
            key.some((enemy) => {
                enemy.y += speed;
                if (enemy.x === ball.x && enemy.y >= ball.y - 10 && enemy.y <= ball.y + 10) {
                    app.ticker.stop();
                }
                if (enemy.y > 1200) {
                    usedClones.shift();
                    return true;
                }
            })
        }
    })

});


document.getElementById("main").appendChild(app.view);
keyboardJS.bind("d", () => {
    if (ball.x < 1560)
        ball.x += 40

});
keyboardJS.bind("a", () => {
    if (ball.x > 40)
        ball.x -= 40
});



function reArrangeEnemys() {
    let enemys = [];
    for (let i = 0; i < enemyCount; i++) {
        enemys[i] = PIXI.Sprite.fromImage('images/enemy.png')
        enemys[i].anchor.set(0.5);
        enemys[i].scale.x *= 0.05
        enemys[i].scale.y *= 0.05
        enemys[i].width = 40
        enemys[i].height = 40
        enemys[i].y = 100;
        enemys[i].x = (Math.random() * 38 + 1).toFixed() * 40;
        app.stage.addChild(enemys[i]);
    }

    return enemys;
}