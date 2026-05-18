const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#3498db',
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let bg;
let obstacles;
let score = 0;
let scoreText;
let isGameOver = false;
let spawnTimer;

function preload() {
    let canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 48;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 32, 48);
    this.textures.addCanvas('player_sprite', canvas);

    let groundCanvas = document.createElement('canvas');
    groundCanvas.width = 800;
    groundCanvas.height = 50;
    let groundCtx = groundCanvas.getContext('2d');
    groundCtx.fillStyle = '#2ecc71';
    groundCtx.fillRect(0, 0, 800, 50);
    this.textures.addCanvas('ground_sprite', groundCanvas);

    let obstacleCanvas = document.createElement('canvas');
    obstacleCanvas.width = 200;
    obstacleCanvas.height = 40;
    let obstacleCtx = obstacleCanvas.getContext('2d');
    obstacleCtx.fillStyle = '#e74c3c';
    obstacleCtx.fillRect(0, 0, 200, 40);
    this.textures.addCanvas('obstacle_sprite', obstacleCanvas);
}

function create() {
    isGameOver = false;
    score = 0;

    bg = this.add.tileSprite(400, 300, 800, 600, 'player_sprite').setAlpha(0.1);

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 575, 'ground_sprite');

    player = this.physics.add.sprite(100, 450, 'player_sprite');
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    obstacles = this.physics.add.group();
    this.physics.add.collider(obstacles, platforms);
    this.physics.add.collider(player, obstacles, hitObstacle, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

    spawnTimer = this.time.addEvent({
        delay: 2000,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true
    });
}

function update() {
    if (isGameOver) {
        return;
    }

    bg.tilePositionX += 4;
    score += 1;
    scoreText.setText('Score: ' + score);

    if ((cursors.space.isDown || cursors.up.isDown) && player.body.touching.down) {
        player.setVelocityY(-500); 
    }

    obstacles.getChildren().forEach(function(obstacle) {
        if (obstacle.x < -50) {
            obstacle.destroy();
        }
    });
}

function spawnObstacle() {
    if (isGameOver) return;
    let obstacle = obstacles.create(850, 520, 'obstacle_sprite');
    obstacle.setVelocityX(-300);
}

function hitObstacle(player, obstacle) {
    this.physics.pause();
    spawnTimer.destroy();
    player.setTint(0xff0000);
    isGameOver = true;

    this.add.text(400, 300, 'GAME OVER\nPress SPACE to Restart', {
        fontSize: '48px',
        fill: '#ffffff',
        align: 'center'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.restart();
    });
}
