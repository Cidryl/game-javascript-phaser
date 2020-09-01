var bg;
var carro;
var cursores;
var enemigos;
var timer;
var gasolinas;
var timerGas;
var puntos = 0;
var txtPuntos;

var Juego = {
    preload: function() {
        game.load.image('bg', 'img/bg.png');
        game.load.image('carro', 'img/carro.png');
        game.load.image('carroMalo', 'img/carroMalo.png');
        game.load.image('gas', 'img/gas.png');
    },

    create: function() {
        bg = game.add.tileSprite(0, 0, 290, 540, 'bg');
        carro = game.add.sprite(game.width/2, 490, 'carro');
        carro.anchor.setTo(0.5);
        carro.enableBody = true;
        game.physics.arcade.enable(carro);

        cursores = game.input.keyboard.createCursorKeys();

        txtPuntos = game.add.text(60, 20, '0', {
            font: 'Bold 30px Arial',
            fill: '#990000'
        });
        
        enemigos = game.add.group();
        game.physics.arcade.enable(enemigos);
        enemigos.enableBody = true;
        enemigos.createMultiple(20, 'carroMalo');
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('checkWorldBounds', true);
        enemigos.setAll('outOfBoundsKill', true);

        timer = game.time.events.loop(1500, this.crearCarroMalo, this);

        gasolinas = game.add.group();
        game.physics.arcade.enable(gasolinas);
        gasolinas.enableBody = true;
        gasolinas.createMultiple(20, 'gas');
        gasolinas.setAll('anchor.x', 0.5);
        gasolinas.setAll('anchor.y', 0.5);
        gasolinas.setAll('checkWorldBounds', true);
        gasolinas.setAll('outOfBoundsKill', true);

        timerGas = game.time.events.loop(2000, this.crearGasolina, this);
    },

    update: function() {
        bg.tilePosition.y += 3;

        if (cursores.right.isDown && carro.position.x < 245) {
            carro.position.x += 5;
        }

        if (cursores.left.isDown && carro.position.x > 45) {
            carro.position.x -= 5;
        }

        game.physics.arcade.overlap(carro, enemigos, this.choque, null, this);
        game.physics.arcade.overlap(carro, gasolinas, this.cogerGas, null, this);

        if (puntos > 4 && puntos <= 10) {
            timer.delay = 1250;
        } else if (puntos > 10 && puntos <= 15) {
            timer.delay = 1000;
        } else if (puntos > 15) {
            timer.delay = 750;
        }
    },

    crearCarroMalo: function() {
        var pos = Math.floor(Math.random()*3)+1;
        var enemigo = enemigos.getFirstDead();
        enemigo.physicsBodyType = Phaser.Physics.ARCADE;
        enemigo.reset(pos*73, 0);
        enemigo.body.velocity.y = 200;
    },

    crearGasolina: function() {
        var pos = Math.floor(Math.random()*3)+1;
        var gas = gasolinas.getFirstDead();
        gas.physicsBodyType = Phaser.Physics.ARCADE;
        gas.reset(pos*73, 0);
        gas.body.velocity.y = 200;
    },

    choque: function() {
        enemigos.forEachAlive((e) => e.body.velocity.y = 0);
        game.time.events.remove(timer);
        game.state.start('Terminado');
    },

    cogerGas: function(carro, gas) {
        gas.kill();
        puntos++;
        txtPuntos.text = puntos;
    }
};