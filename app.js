
window.allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

let randomSpeed = Math.random() * (.15 - 0.03) + 0.03;
let randomStart = Math.floor(Math.random() * (-4 - -1)) + -1;

const allowedKeys = window.allowedKeys;
const allEnemies = [];

let timesCrossed = 0;
let scoreBoard = document.getElementById('score');

class Entity {
    constructor(x, y) {
        this.sprite = 'images/';
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }
}

class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.x = 2;
        this.y = 4.5;
    }
    update(dt) {
        if (player.x > 5) {
            player.x = 0;
        }
        if (player.x < 0) {
            player.x = 5;
        }
        if (player.y < -0.5) {
            player.y = 4.5;
            timesCrossed += 1;
            document.getElementById('score').innerHTML = timesCrossed;
            console.log('points ' + timesCrossed);
        }
        if (player.y > 4.5) {
            player.y = 4.5;
        }
        for (let enemy of allEnemies) {
            if (Math.abs(this.y - enemy.y) < .25 && Math.abs(this.x - enemy.x) < .25) {//https://romeyb76.github.io/Udacity-Classic-Arcade-Game/
                this.x = 2;
                this.y = 4.5;
                timesCrossed = 0;
                document.getElementById('score').innerHTML = timesCrossed;
                alert('In game, bug squash you!!');
            }
        }
    }

    handleInput(input) {
        switch (input) {
            case 'left':
                this.x -= 1;
                break;
            case 'up':
                this.y -= 1;
                break;
            case 'right':
                this.x += 1;
                break;
            case 'down':
                this.y += 1;
                break;
            default:
                break;
        }
    }
}

class Enemy extends Entity {
    constructor() {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = randomSpeed;
    }
    update(dt) {
        let randomSpeed = Math.random() * (.15 - 0.03) + 0.03;
        this.x += randomSpeed;
        if (this.x > 5) {
            this.x = randomSpeed;
        }
    }
}

const player = new Player();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();

enemy1.y = .5;
enemy2.y = 1.5;
enemy3.y = 2.5;

allEnemies.push(enemy1, enemy2, enemy3);

function assignSpeed() {
    for (let i of allEnemies) {
        allEnemies[i].x = randomSpeed;
        console.log(i);
    }
}

document.addEventListener('keyup', function (e) {
    player.handleInput(allowedKeys[e.keyCode]);
});
