function colorChange(player) {
    $('#attack').css('color', player.color);
    $('#defend').css('color', player.color);
    $("#action").css('background-color', player.color);
}

function updateInterfacePlayer1(player) {
    $("#health1").html(player.health + ' %');
    $("#barHealth1").css("width", player.health + "%")
    $("#weaponImg1").attr('src', player.weapon.img);
    $("#damage1").html(player.weapon.damage + '%');

}

function updateInterfacePlayer2(player) {
    $("#health2").html(player.health + ' %');
    $("#barHealth2").css("width", player.health + "%");
    $("#weaponImg2").attr('src', player.weapon.img);
    $("#damage2").html(player.weapon.damage + '%');
}