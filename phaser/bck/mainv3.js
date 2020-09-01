var config = {
    type: Phaser.AUTO, //CANVAS
    width: 370,
    height: 550,
    /*physics: {
        default: 'game',
        game: {
            gravity: { y: 200 }
        }
    },*/
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
    this.load.setBaseURL('http://localhost/phaser');

    this.load.image('fondo', 'img/bg.jpeg');
    this.load.spritesheet('pajaro', 'img/pajaro.png', 43, 30);
}

function create() {
    fondo = this.add.tileSprite(0, 0, config.width * 2, config.height * 2, 'fondo');
    //pajaro = this.add.sprite(40, 100, 'pajaro');
}

function update() {
    fondo.tilePositionX += 1;
}