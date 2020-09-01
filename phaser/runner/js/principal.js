var game = new Phaser.Game(290, 540, Phaser.CANVAS, 'bloque_juego');
game.state.add('Juego', Juego);
game.state.add('Terminado', terminado);
game.state.start('Juego');