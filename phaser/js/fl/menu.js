var menu = {
    preload: function() {
        game.stage.backgroundColor = '#ffffff';
        game.load.image('boton', 'img/btn.png');
    },

    create: function() {
        var boton = this.add.button(game.width/2, game.height/2, 'boton', () => {
            this.state.start('Juego');
        }, this);

        boton.anchor.setTo(0.5);

        var txtTitulo = game.add.text(game.width/2, game.height/2 - 125, 'Flappy Bird', {
            font: 'bold 30px sans-serif',
            fill: '#000000',
            align: 'center'
        });
        txtTitulo.anchor.setTo(0.5);

        var txtIniciar = game.add.text(game.width/2, game.height/2 - 85, 'Iniciar Juego', {
            font: 'bold 24px sans-serif',
            fill: '#000000',
            align: 'center'
        });
        txtIniciar.anchor.setTo(0.5);
    }
};