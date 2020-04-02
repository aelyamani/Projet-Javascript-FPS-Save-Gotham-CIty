class InterfacePlayer {

    constructor() {


    }


    updateInterfacePlayer1(player) {
        $("#health1").html(player.health + ' %');
        $("#barHealth1").css("width", player.health + "%")
        $("#weaponImg1").attr('src', player.weapon.img);
        $("#damage1").html(player.weapon.damage + '%');
        
    }

    updateInterfacePlayer2(player) {
        $("#health2").html(player.health + ' %');
        $("#barHealth2").css("width", player.health + "%");
        $("#weaponImg2").attr('src', player.weapon.img);
        $("#damage2").html(player.weapon.damage + '%');
    }
}


$('#attack').on('click', function () {  /*le click de l'attaque et la defense */
    if (map.gameOver) {
        map.restartGame();
        return;
    }
    const player = map.whoCanPlay;
    if (map.playerNear(player.x, player.y)) {
        player.attack(map.whoCanPlaySystem());
    } else {
        alert('Vous ne pouvez pas attaquer');
    }
});


$('#defend').on('click', function () {
    if (map.gameOver) {
        map.restartGame();
        return;
    }
    const player = map.whoCanPlay;
    if (player.defendIt === false) {
        player.defendIt = true;
        map.switchPlayer();
    } else {
        alert('Vous ne pouvez pas vous défendre');
    }
});

