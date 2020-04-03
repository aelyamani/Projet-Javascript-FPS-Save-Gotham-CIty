let interfacePlayer = new InterfacePlayer('img', 'name', 'health', 'weapon', 'damage');

const player1 = new Player('1', 'Batman', 'image/batman.png', '#5d5b5b', 100, brassKnuckles);
const player2 = new Player('2', 'Joker', 'image/joker.png', '#247b38', 100, brassKnuckles);

const players = [player1, player2]; /* on les place dans un tableau */
const weapons = [brassKnuckles, knife, axe, gun]; /* les armes sont dans un tableau */

const map = new Map('map', player1, player2);


map.setElements(map.walls);
map.setElements(weapons);
map.setElements(players);
map.initClickableSquares(players); 