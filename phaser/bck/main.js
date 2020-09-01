var config = {
    type: Phaser.CANVAS,
    width: 370,
    height: 550,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var fondo;
var pajaro;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('fondo', './img/bg.jpeg');
    // this.load.image('pajaro', './img/pajaro1.png');
    // this.load.image('boton', './img/btn.png');
    this.load.image('pajaros', './img/pajaro.png');
}

function create() {
    fondo = this.add.tileSprite(0, 0, config.width * 2, config.height * 2, 'fondo');
    // pajaro = this.add.sprite(110, 110, 'pajaro')
    // pajaro.setOrigin(0.5);
    // pajaro.setScale(2);
    // pajaro.setScale(-1,1); // voltear
    // pajaro.angle = 90; // rotación
    pajaro = this.add.sprite(100, 100, 'pajaros');
}

function update() {
    fondo.tilePositionX += 1;
    // pajaro.angle += 2;
}