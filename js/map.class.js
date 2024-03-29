class Map {
    constructor(mapGameId, player1, player2) {
        this.mapGame = document.getElementById(mapGameId);
        this.width = 10;
        this.height = 10;
        this.rows = [];
        this.walls = [];
        this.player1 = player1;
        this.whoCanPlay = player2;
        this.player2 = player2;
        this.directions = [];
        this.clickableSquares = [];
        this.gameOver = false;
        this.initMap(); /* on execute la fonction qui sera vide */
        this.initWalls(15); /* on execute les obstacles et on en demande 15 */
        updateInterfacePlayer1(this.player1);
        updateInterfacePlayer2(this.player2);
        this.playerNear();
    }


    initMap() { /* on cree un tableau de 10 ranges a base de 10 carres  */
        let squareElt
        let rowElt
        let row = []
        let square

        for (let y = 0; y < this.height; y++) {
            row = []; /*  une range vide */
            rowElt = document.createElement('div');
            $(rowElt).addClass('row');

            for (let x = 0; x < this.width; x++) {
                squareElt = document.createElement('div'); /* on cree un carre dans le DOM */
                $(squareElt).addClass('square');
                $(rowElt).append(squareElt);
                square = new Square(squareElt, x, y);
                row.push(square); /* on ajoute plusieurs range l une sur l autre pour creer le tableau */
            }

            $(this.mapGame).append(rowElt);
            this.rows.push(row);
        }
    }

    initWalls(number) {
        let wall;
        for (let i = 0; i < number; i++) {
            wall = new Wall(); /* on cree les obstacles */
            this.walls.push(wall);
        }
    }


    setElements(elements) { /* la phase ou l on place les elemen aleatoirement */
        let x;
        let y;
        let row;
        let search;
        let square;

        elements.forEach((element) => {

            search = true;
            while (search) {  /* pour chaque elements, il tourne en boucle jusqu a qu ils tombent sur une case vide  */
                x = Math.round(Math.random() * (this.width - 1)); /* fonction aleatoire */
                y = Math.round(Math.random() * (this.height - 1));
                row = map.rows[y]; /* la ligne correspond a un range de square */
                square = row[x];
                if (square.empty) {
                    if (!(element.content === 'player' && this.playerNear(x, y))) {
                        square.isOccupied(element);
                        element.x = x;
                        element.y = y;
                        search = false; /* la boucle s arrete lorsque la case est occupee */
                    }
                }
            }
        });
    }


    playerNear(x, y) {
        let playerNear = false;
        let newX;
        let newY;
        ['left', 'right', 'up', 'down'].forEach(directions => { /* pr chaque dir (fct) nouvelle ( new) */
            newX = x;
            newY = y;
            switch (directions) { /* on initalise de possibilite de tous les cotes */
                case 'left':
                    newX--;
                    break;
                case 'right':
                    newX++;
                    break;
                case 'up':
                    newY--;
                    break;
                case 'down':
                    newY++;
                    break;
            }
            if (newX >= 0 && newX <= this.width - 1 && newY >= 0 && newY <= this.height - 1 && map.rows[newY][newX].occupy.health) {
                playerNear = true;
            }
        });
        return playerNear;
    }




    initClickableSquares() {

        this.clickableSquares.forEach(square => {  /* fonction pour chaque carre cliquable */
            this.rows[square.y][square.x].noClick(false);
        });

        this.clickableSquares = []; /* on initialise un tableau vide  */
        let x = this.whoCanPlay.x;  /* le joueur qui joue a une position x et y */
        let y = this.whoCanPlay.y;
        let newX; /* selon que sa position change il aura d autres cases potentiellement cliquable */
        let newY;

        ['left', 'right', 'up', 'down'].forEach(directions => {
            newX = x;
            newY = y;

            for (let i = 1; i <= 3; i++) {

                switch (directions) { /* on initalise de possibilite de tous les cotes */
                    case 'left':
                        newX--;
                        break;
                    case 'right':
                        newX++;
                        break;
                    case 'up':
                        newY--;
                        break;
                    case 'down':
                        newY++;
                        break;
                }

                if (newX >= 0 && newX <= this.width - 1 && newY >= 0 && newY <= this.height - 1 && this.rows[newY][newX].occupy === false) { /*les conditions: faut que ce soit dans le board 10x10 donc de 0 a 9 en x et en y et aussi que les ranges x et y ne soit pas occupes */
                    this.clickableSquares.push(this.rows[newY][newX]);
                    this.rows[newY][newX].youCanClick = true;
                    if (!this.rows[newY][newX].weapon) {
                        this.rows[newY][newX].element.style.background = this.whoCanPlay.color;
                    }
                } else {
                    break;
                }
            }
        });
    }



    changeWhoCanPlay() { /* fonction pour lancer la partie avec la joueur 1 */
        this.whoCanPlay = this.whoCanPlaySystem();
        updateInterfacePlayer1(this.player1);
        updateInterfacePlayer2(this.player2);
        colorChange(this.whoCanPlay);
    }


    whoCanPlaySystem() {
        if (this.whoCanPlay === this.player1) {
            return this.player2;
        } else {
            return this.player1;
        }
    }


    switchPlayer() {
        this.changeWhoCanPlay();
        this.initClickableSquares();
    }


    gameIsOver(playerAttacked) {
        if (playerAttacked.health <= 0) {
            this.gameOver = true;
            $('#looseModal').modal('show');
            $('.modal-paragraph').html(`${playerAttacked.name} lost`)

        } else {
            this.switchPlayer();
        }

    }



    restartGame() {
        $('#restartGameModal').modal('show');
        if ($("#replay").click(function () {
            location.reload();
        }));

    }






}


