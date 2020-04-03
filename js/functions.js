function colorChange(player) {
    $('#attack').css('color', player.color);
    $('#defend').css('color', player.color);
    $("#action").css('background-color', player.color);
}