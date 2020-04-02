class InterfacePlayer {

    constructor(img, name, health, weapon, damage, attack, defend) {
        this.imgElt = $('.' + img + name);
        this.nameElt = $('#' + name);
        this.healthElt = $('#' + health);
        this.weaponElt = $('#' + weapon);
        this.weaponImgElt = $('#weaponImg');
        this.damageElt = $('#' + damage);
        this.attackElt = $('#' + attack);
        this.defendElt = $('#' + defend);
    }


    updateInterface(player) {
        this.imgElt.attr('src', player.img);
        this.nameElt.html(player.name).css("color", player.color);
        this.healthElt.html(player.health + ' %');
        $("#barHealth").css("width", player.health + "%").css("background-color", player.color);
        this.weaponImgElt.attr('src', player.weapon.img);
        this.damageElt.html(player.weapon.damage + '%');
        $('#attack').css('color', player.color);
        $('#defend').css('color', player.color);
        $('.fightControl').css('color', player.color);
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

