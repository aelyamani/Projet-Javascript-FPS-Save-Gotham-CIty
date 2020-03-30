class Square {

    constructor(elementHTML, x, y) {
        this.init(elementHTML, x, y);
        this.empty = true; /* le carre est vide */
        this.youCanClick = false;
        this.occupy = false;
    }


    init(elementHTML, x, y) { /* on lui donne une valeur x et y */
        this.elt = elementHTML;
        this.x = x;
        this.y = y;
        this.listenClick(); // on lance cette fonction qui cree un event cliquable
        this.elt.style.backgroundImage = 'url(image/bkg.png)';
    }


    listenClick() {
        $(this.elt).on('click', e => {
            if (map.gameOver) {
                map.restartGame();
                return;
            }
            if (this.youCanClick === true) {
                map.whoCanPlay.move(this);
                map.switchTurn();
            }
        });
    }


    isOccupied(occupy) { /* pour eviter que les elts se superposent */
        this.occupy = occupy;
        if (occupy.content === "weapon") {
            this.weapon = occupy;
            this.occupy = false;
        }
        this.elt.style.backgroundImage = 'url(' + occupy.img + ')';
        this.elt.style.backgroundColor = 'white';
        this.empty = false;
    }


    hasBeenLeft(player) {
        this.noClick(true);
        this.occupy = false;
        if (this.weapon) {
            this.isOccupied(player.oldWeapon); //laisser l'arme quand on quitte la case
        }
    }


    noClick(playerHasLeft) {
        this.elt.style.backgroundSize = '50px 50px ';
        this.youCanClick = false;
        if ((playerHasLeft === true || this.occupy === false) && !this.weapon) {
            this.elt.style.backgroundImage = 'url("image/bkg.png")';
        }
    }

}