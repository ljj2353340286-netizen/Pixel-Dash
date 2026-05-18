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
}

function create() {
    bg = this.add.tileSprite(400, 300, 800, 600, 'player_sprite').setAlpha(0.1);

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 575, 'ground_sprite');

    player = this.physics.add.sprite(100, 450, 'player_sprite');
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    bg.tilePositionX += 4;

    if ((cursors.space.isDown || cursors.up.isDown) && player.body.touching.down) {
        player.setVelocityY(-500); 
    }
}
