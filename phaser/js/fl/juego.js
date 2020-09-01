var bg;
var tubos;
var flappy;
var salto;
var timer;
var puntos = -1;
var txtPuntos;

var juego = {
    preload: function() {
        game.load.image('bg', 'img/bg.jpeg');
        game.load.spritesheet('pajaro', 'img/pajaro.png', 43, 30);
        game.load.image('tubo', 'img/tubo.png');

        game.forceSingleUpdate = true;
    },

    create: function() {
        bg = game.add.tileSprite(0, 0, 370, 550, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        tubos = game.add.group();
        tubos.enableBody = true;
        tubos.createMultiple(20, 'tubo');

        flappy = game.add.sprite(100, 245, 'pajaro');
        flappy.frame = 1;
        flappy.animations.add('vuelo', [0, 1, 2], 10, true);
        game.physics.arcade.enable(flappy);
        flappy.body.gravity.y = 1200;
        flappy.anchor.setTo(0, 0.5);

        salto = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(() => {
            if (flappy.alive) {
                flappy.body.velocity.y = -350;
                game.add.tween(flappy).to({angle: -20}, 100).start();
            }
        }, this);

        timer = game.time.events.loop(1500, this.crearColumna, this);

        txtPuntos = game.add.text(20, 20, '0', {
            font: '30px Arial',
            fill: '#ffffff'
        });
    },

    update: function() {
        if (flappy.inWord == false) {
            flappy.alive = false;
            tubos.forEachAlive((t) => t.body.velocity.x = 0, this);
        } else if (flappy.position.y > 460) {
            this.state.start('Game_Over');
        } else {
            bg.tilePosition.x -= 1;
        }

        game.physics.arcade.overlap(flappy, tubos, () => {
            if (flappy.alive === false)
                return;

            flappy.alive = false;
            game.time.events.remove(timer);
            tubos.forEachAlive((t) => t.body.velocity.x = 0, this); 
        }, null, this);

        flappy.animations.play('vuelo');

        if (flappy.angle < 20) {
            flappy.angle += 1;
        }
    },

    crearColumna: function() {
        var hueco = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++) {
            if (i !== hueco && i !== hueco+1) {
                this.crearUnTubo(370, i*55+20);
            }
        }

        puntos++;
        txtPuntos.text = puntos;
    },

    crearUnTubo: function(x, y) {
        var tubo = tubos.getFirstDead();
        
        if (tubo) {
            tubo.reset(x, y);
            tubo.body.velocity.x = -180;
            tubo.checkWorldBounds = true;
            tubo.outOfBoundsKill = true;
        }
    }
};