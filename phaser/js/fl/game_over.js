var go = {
    preload: function() {
        game.stage.backgroundColor = '#ffffff';
        game.load.image('boton', 'img/btn.png');
    },

    create: function() {
        var boton = this.add.button(game.width/2, game.height/2, 'boton', () => {
            this.state.start('Juego');
        }, this);

        boton.anchor.setTo(0.5);

        var txtTitulo = game.add.text(game.width/2, game.height/2 - 125, 'Juego Terminado', {
            font: 'bold 30px sans-serif',
            fill: '#000000',
            align: 'center'
        });
        txtTitulo.anchor.setTo(0.5);

        var txtIniciar = game.add.text(game.width/2 - 50, game.height/2 - 85, 'Puntos: ', {
            font: 'bold 24px sans-serif',
            fill: '#000000',
            align: 'center'
        });
        txtIniciar.anchor.setTo(0.5);

        if (puntos == -1)
            puntos = 0;
            
        var txtNum = game.add.text(game.width/2 + 50, game.height/2 - 85, puntos.toString(), {
            font: 'bold 24px sans-serif',
            fill: '#000000',
            align: 'center'
        });
        txtNum.anchor.setTo(0.5);
    }
};