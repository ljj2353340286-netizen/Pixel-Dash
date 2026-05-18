const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#3498db',
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
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

function preload() {
}

function create() {
    this.add.text(400, 300, 'Pixel-Dash \nSprint I Running!', {
        fontSize: '32px',
        fill: '#ffffff',
        fontStyle: 'bold',
        align: 'center'
    }).setOrigin(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
}
