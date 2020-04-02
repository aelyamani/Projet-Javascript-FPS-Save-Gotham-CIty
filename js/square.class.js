class Square {

    constructor(elementHTML, x, y) {
        this.initSettings(elementHTML, x, y);
        this.empty = true; /* le carre est vide */
        this.youCanClick = false;
        this.occupy = false;
    }


    initSettings(elementHTML, x, y) { /* on lui donne une valeur x et y */
        this.element = elementHTML;
        this.x = x;
        this.y = y;
        this.listenClick(); // on lance cette fonction qui cree un event cliquable
        $(this.element).css('background-image', 'url(image/bkg.png)');
    }


    listenClick() {
        $(this.element).on('click', e => {
            if (map.gameOver) {
                map.restartGame();
                return;
            }
            if (this.youCanClick === true) {
                map.whoCanPlay.move(this);
                map.switchPlayer();
            }
        });
    }


    isOccupied(occupy) { /* pour eviter que les elements se superposent */
        this.occupy = occupy;
        if (occupy.content === "weapon") {
            this.weapon = occupy;
            this.occupy = false;
        }
        $(this.element).css('background-image', 'url(' + occupy.img + ')');
        $(this.element).css('background-color', 'white');
        this.empty = false;
    }


    hasBeenLeft(player) {
        this.noClick(true);
        this.occupy = false;
        if (this.weapon) {
            this.isOccupied(player.oldWeapon); //laisser l'arme quand on quitte la case
        }
    }


    noClick(playerLeft) {
        $(this.element).css('background-size', '50px 50px');
        this.youCanClick = false;
        if ((playerLeft === true || this.occupy === false) && !this.weapon) {
            $(this.element).css('background-image', 'url(image/bkg.png)');
        }
    }

}