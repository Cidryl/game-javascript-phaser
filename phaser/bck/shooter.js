//shooter
var juego = new Phaser.Game(400, 540, Phaser.CANVAS, 'bloque_juego');
var nave;
var balas;
var tiempoEntreBalas = 400;
var tiempo = 0;
var enemigos;
var timer;
var puntos;
var txtPuntos;
var vida;
var txtVidas;

var inicio = {
    preload: function() {
        juego.load.image('fondo', 'img/space.png');
        juego.load.image('nave', 'img/nave.png');
        juego.load.image('laser', 'img/laser.png');
        juego.load.image('enemigo', 'img/pajaro2.png');
    },

    create: function() {
        juego.add.tileSprite(0, 0, 400, 540, 'fondo');
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        nave = juego.add.sprite(juego.width/2, 490, 'nave');
        nave.anchor.setTo(0.5);
        juego.physics.arcade.enable(nave);

        balas = juego.add.group();
        balas.enableBody = true;
        balas.setBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(30, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 0.5);
        balas.setAll('checkWorlBounds', true);
        balas.setAll('outOfBoundsKill', true);

        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.setBodyType = Phaser.Physics.ARCADE;
        enemigos.createMultiple(30, 'enemigo');
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('checkWorlBounds', true);
        enemigos.setAll('outOfBoundsKill', true);

        timer = juego.time.events.loop(2000, () => {
            var enemigo = enemigos.getFirstDead();
            var num = Math.floor(Math.random() * 10) + 1;
            enemigo.reset(num*39, 0);
            enemigo.anchor.setTo(0.5);
            enemigo.body.velocity.y = 140;
            enemigo.checkWorldBounds = true;
            enemigo.outOfBoundsKill = true;
        }, this);

        puntos = 0;
        juego.add.text(20, 20, 'Puntos: ', {font: '14px Arial', fill: '#ffffff'});
        txtPuntos = juego.add.text(80, 20, '0', {font: '14px Arial', fill: '#ffffff'});

        vida = 3;
        juego.add.text(310, 20, 'Vidas: ', {font: '14px Arial', fill: '#ffffff'});
        txtVidas = juego.add.text(360, 20, '3', {font: '14px Arial', fill: '#ffffff'});
    },

    update: function() {
        nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI/2;

        if (juego.input.activePointer.isDown) {
            this.disparar();
        }

        juego.physics.arcade.overlap(balas, enemigos, (bala, enemigo) => {
            bala.kill();
            enemigo.kill();
            puntos++;
            txtPuntos.text = puntos;
        }, null, this);

        enemigos.forEachAlive((e) => {
            if (e.position.y > 520 && e.position.y < 521) {
                e.kill();
                vida--;
                txtVidas.text = vida;
            }
        });

        if (vida == 0) {
            juego.state.start('terminado');
        }
    },

    disparar: function() {
        if (juego.time.now > tiempo && balas.countDead() > 0) {
            tiempo = juego.time.now + tiempoEntreBalas;
            var bala = balas.getFirstDead();
            bala.anchor.setTo(0.5);
            bala.reset(nave.x, nave.y);
            bala.rotation = juego.physics.arcade.angleToPointer(bala) + Math.PI/2;
            juego.physics.arcade.moveToPointer(bala, 300);
        }
    }
};

var terminado = {
    preload: function() {
    },

    create: function() {
        juego.stage.backgroundColor = '#990000';

        if (confirm('Desea reiniciar el juego?')) {
            juego.state.start('juego');
        }
    }
};

juego.state.add('juego', inicio);
juego.state.add('terminado', terminado);
juego.state.start('juego');