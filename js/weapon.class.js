class Weapon {

    constructor(name, img, damage) { /* on lui donne des attribut avec le constructor */
        this.name = name;
        this.img = img;
        this.damage = damage;
        this.content = 'weapon';
    }
}

/* les armes du jeu */
let brassKnuckles = new Weapon('Brass knuckles', 'image/brassKnuckles.png', 5);
let knife = new Weapon('Knife', 'image/Knife.png', 15);
let axe = new Weapon('Axe', 'image/Axe.png', 25);
let gun = new Weapon('Gun', 'image/Gun.png', 45);
