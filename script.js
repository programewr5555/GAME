const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: 50,
    size: 20,
    color: 'blue',
    speed: 5
};

const enemy = {
    x: 300,
    y: 300,
    size: 20,
    color: 'red',
    speed: 2
};

const maze = [
    // Define the maze structure here
    { x: 100, y: 100, width: 400, height: 20 },
    { x: 100, y: 100, width: 20, height: 400 },
    { x: 100, y: 480, width: 400, height: 20 },
    { x: 480, y: 100, width: 20, height: 400 }
];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawEnemy() {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
}

function drawMaze() {
    ctx.fillStyle = 'black';
    maze.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function movePlayer() {
    if (keys['w'] && player.y > 0) player.y -= player.speed;
    if (keys['s'] && player.y < canvas.height - player.size) player.y += player.speed;
    if (keys['a'] && player.x > 0) player.x -= player.speed;
    if (keys['d'] && player.x < canvas.width - player.size) player.x += player.speed;
}

function moveEnemy() {
    if (enemy.x < player.x) enemy.x += enemy.speed;
    if (enemy.x > player.x) enemy.x -= enemy.speed;
    if (enemy.y < player.y) enemy.y += enemy.speed;
    if (enemy.y > player.y) enemy.y -= enemy.speed;
}

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    movePlayer();
    moveEnemy();
    drawPlayer();
    drawEnemy();
    requestAnimationFrame(gameLoop);
}

gameLoop();
