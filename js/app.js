'use strict';

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
let modal = document.querySelector('modal');

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
        if (this.x > 4) {
            this.x = 4;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < -0.5) {//winning condition
            this.y = 4.5;
            timesCrossed += 1;
            document.getElementById('score').innerHTML = timesCrossed;
            modal.style.display = 'block';
            modal.classList.add('modalOn');
            document.getElementById('modalOff').innerHTML = 'You Made It!'
          
                      
        }
        if (this.y > 4.5) {
            this.y = 4.5;
        }
        for (let enemy of allEnemies) {//loosing condition
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
                hide();
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

//hide modal. Called on line 73
function hide () {
    modal.classList.remove('modalOn');
    document.getElementById('modalOff').innerHTML = '';
}

document.addEventListener('keyup', function (e) {
    player.handleInput(allowedKeys[e.keyCode]);
});
