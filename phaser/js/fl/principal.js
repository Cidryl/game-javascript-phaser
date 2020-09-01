var game = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');

game.state.add('Menu', menu);
game.state.add('Juego', juego);
game.state.add('Game_Over', go);

game.state.start('Menu');