var fondoJuego;
var boton;
var flappy;
var cursores;
var persona;
var mirando = 'arriba';

var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');

var estadoPrincipal = {
    preload: function() {
        juego.load.image('fondo', 'img/bg.jpeg');
        juego.load.spritesheet('pajaro', 'img/pajaro.png', 43, 30);
        juego.load.spritesheet('persona', 'img/persona.png', 64, 64);
    },

    create: function() {
        fondoJuego = juego.add.tileSprite(0, 0, 370, 550, 'fondo');
        flappy = juego.add.sprite(100, 100, 'pajaro');
        flappy.frame = 1;
        flappy.animations.add('vuelo', [0,1,2], 10, true);

        persona = juego.add.sprite(juego.width/2, juego.height/2, 'persona');
        persona.anchor.setTo(0.5);
        persona.animations.add('arriba', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        persona.animations.add('izquierda', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        persona.animations.add('abajo', [19, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
        persona.animations.add('derecha', [27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);
        cursores = juego.input.keyboard.createCursorKeys();

        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(persona);
        persona.body.collideWorldBounds = true;
    },

    update: function() {
        //flappy.animations.play('vuelo');
        if (cursores.right.isDown) {
            persona.animations.play('derecha');
            persona.position.x += 2;
            mirando = 'derecha';
            //flappy.position.x += 1;
        }

        else if (cursores.left.isDown) {
            persona.animations.play('izquierda');
            persona.position.x -= 2;
            mirando = 'izquierda';
            //flappy.position.x -= 1;
        }
            
        else if (cursores.up.isDown) {
            persona.animations.play('arriba');
            persona.position.y -= 2;
            mirando = 'arriba';
            //flappy.position.y -= 1;
        }

        else if (cursores.down.isDown) {
            persona.animations.play('abajo');
            persona.position.y += 2;
            mirando = 'abajo';
            //flappy.position.y += 1;
        }
        
        else {
            if (mirando != 'espera') {
                persona.animations.stop();
            }

            mirando = 'espera';
        }
    }
};

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');