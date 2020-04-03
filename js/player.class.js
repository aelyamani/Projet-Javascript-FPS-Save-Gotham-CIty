class Player {


    constructor(id, name, img, color, health, weapon) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.color = color;
        this.health = health;
        this.x = null;
        this.y = null;
        this.content = 'player';
        this.weapon = weapon;
        this.oldWeapon;
        this.defendIt = false;
    }


    move(toNextSquare) {  /* deplacements */
        map.rows[this.y][this.x].hasBeenLeft(this); //il a quitte une position x et y
        map.rows[toNextSquare.y][toNextSquare.x].isOccupied(this); // pour une nouvelle position
        this.x = toNextSquare.x;
        this.y = toNextSquare.y;
        if (toNextSquare.weapon) { //s'il se place sur une case avec une arme, il la recupere
            this.getWeaponOnMap(toNextSquare);
        }
    }


    getWeaponOnMap(square) {  // et laisse automatiquement l'ancienne arme sur la case
        this.oldWeapon = this.weapon;
        this.weapon = square.weapon;
    }


    attack(playerAttacked) {
        const damage = this.weapon.damage;
        if (playerAttacked.defendIt) {
            playerAttacked.defend(damage);
        } else {
            playerAttacked.health -= damage;
        }
        map.gameIsOver(playerAttacked);
    }


    defend(damage) {
        const realDamage = damage / 2;
        this.health -= realDamage;
        //alert('je me defends');
        this.defendIt = false;
    }

}





