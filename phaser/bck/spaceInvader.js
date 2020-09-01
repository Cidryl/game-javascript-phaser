var fondoJuego;
var nave;
var cursores;

var balas;
var tiempoBala = 0;
var botonDisparo;

var enemigos;

var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');

var estadoPrincipal = {
    preload: function() {
        juego.load.image('fondo', 'img/space.png');
        juego.load.image('nave', 'img/nave.png');
        juego.load.image('laser', 'img/laser.png');
        juego.load.image('enemigo', 'img/pajaro2.png');
    },

    create: function() {
        fondoJuego = juego.add.tileSprite(0, 0, 370, 550, 'fondo');

        nave = juego.add.sprite(juego.width/2, 500, 'nave');
        nave.anchor.setTo(0.5);

        cursores = juego.input.keyboard.createCursorKeys();

        botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        balas = juego.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('outOfBoundsKill', true);
        balas.setAll('checWorldBounds', true);

        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var y = 0; y < 6; y++) {
            for (var x = 0; x < 7; x++) {
                var enemigo = enemigos.create(x*40, y*20, 'enemigo');
                enemigo.anchor.setTo(0.5);
            }
        }

        enemigos.x = 20;
        enemigos.y = 30;

        //tween
        var animacion = juego.add.tween(enemigos)
            .to({x:100}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        animacion.onRepeat.add(() => enemigos.y += 10, this);
    },

    update: function() {
        if (cursores.right.isDown) {
            nave.position.x += 3;
        }

        if (cursores.left.isDown) {
            nave.position.x -= 3;
        }

        var bala;

        if (botonDisparo.isDown) {
            if (juego.time.now > tiempoBala) {
                bala = balas.getFirstExists(false);
            }

            if (bala) {
                bala.reset(nave.x, nave.y);
                bala.body.velocity.y = -300;
                tiempoBala = juego.time.now + 100;
            }
        }

        juego.physics.arcade.overlap(balas, enemigos, (bala, enemigo) => {
            bala.kill();
            enemigo.kill();
        }, null, this);
    }
};

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');