import {
    EMPTY,
    GOAL,
    PLAYER,
    EGG,
    WALL,
    SIZE,
    MULTIPLIER,
    SUCCESS_BLOCK,
    levelOneMap
} from '../Structure/Structure.js';
import {
    ISEGG,
    ISWALL,
    ISPLAYER,
    ISEMPTY,
    ISGOAL,
    getCoorsForPlayer,
    generateGame,
    CheckTheMove,
    getId,
    nodeEquals,
}
from '../HelperFunction.js'
import node from '../class/node.js';

export default class Logic {

constructor(){
    this.canvas = document.querySelector('canvas');
    this.canvas.width = SIZE.width;
    this.canvas.height = SIZE.height;
    this.context = this.canvas.getContext('2d')
    this.board = generateGame(this.level);
    this.playerImage = new Image();
    this.eggImage = new Image();
    this.stoneImage = new Image();
    this.flagImage = new Image();
    this.grassImage = new Image();
    this.level=1;
    this.firstNode=null;

    this.playerImage.src = 'assest/bunny.png';
    this.eggImage.src = 'assest/egg.png';
    this.stoneImage.src = 'assest/stone.png';
    this.flagImage.src = 'assest/flag.png';
    this.grassImage.src = 'assest/grass.png';

    this.playerImage.onload = () => {
        // context.drawImage(this.playerImage, 0, 0,60,60);
        this.context.drawImage(this.playerImage,0,0,0,0);
    };
    this.eggImage.onload = () => {
        this.context.drawImage(this.eggImage,0,0,0,0);
    };
    this.stoneImage.onload = () => {
        this.context.drawImage(this.stoneImage,0,0,0,0);
    };
    this.flagImage.onload = () => {
        this.context.drawImage(this.flagImage,0,0,0,0);
    };
    this.grassImage.onload = () => {
        this.context.drawImage(this.grassImage,0,0,0,0);
    };
    this.Moves ={
        Moves: [],
    }

    this.states = [];
    this.Nodes = [] ;
}

printBoardCell(context,cell,x,y){
    context.clearRect(x * MULTIPLIER, y * MULTIPLIER, MULTIPLIER, MULTIPLIER)
    if (cell === PLAYER) {
        const bunnySize = 60
        const cellCenterX = x * MULTIPLIER + MULTIPLIER / 2 - bunnySize/2; // Calculate the center X position
        const cellCenterY = y * MULTIPLIER + MULTIPLIER / 2 - bunnySize/2; 
        this.context.drawImage(this.playerImage,cellCenterX, cellCenterY,bunnySize ,bunnySize);
    } 
    else if(cell === EGG){
        const eggSize = 50
        const cellCenterX = x * MULTIPLIER + MULTIPLIER / 2 - eggSize/2; // Calculate the center X position
        const cellCenterY = y * MULTIPLIER + MULTIPLIER / 2 - eggSize/2; // Calculate the center Y position
        this.context.drawImage(this.eggImage, cellCenterX, cellCenterY, eggSize, eggSize);
    }
    else if(cell === GOAL){      
        const eggSize = 50
        const cellCenterX = x * MULTIPLIER + MULTIPLIER / 2 - eggSize/2;
        const cellCenterY = y * MULTIPLIER + MULTIPLIER / 2 - eggSize/2; 
        this.context.drawImage(this.flagImage, cellCenterX, cellCenterY, eggSize, eggSize);
    }
    else if(cell === WALL) {
        const wallSize = 50
        const cellCenterX = x * MULTIPLIER + MULTIPLIER / 2 - wallSize/2; 
        const cellCenterY = y * MULTIPLIER + MULTIPLIER / 2 - wallSize/2; 
        this.context.drawImage(this.stoneImage, cellCenterX, cellCenterY, wallSize, wallSize);
    }
    else if(cell === EMPTY){
        const wallSize = 50
        const cellCenterX = x * MULTIPLIER + MULTIPLIER / 2 - wallSize/2; 
        const cellCenterY = y * MULTIPLIER + MULTIPLIER / 2 - wallSize/2;
        this.context.drawImage(this.grassImage, cellCenterX, cellCenterY, wallSize, wallSize);
    }
    else if(cell == SUCCESS_BLOCK){
        const eggSize = 50
        const cellCenterX = x * MULTIPLIER + MULTIPLIER / 2 - eggSize/2; 
        const cellCenterY = y * MULTIPLIER + MULTIPLIER / 2 - eggSize/2; 
        this.context.drawImage(this.eggImage, cellCenterX, cellCenterY, eggSize, eggSize);
    }
}

isGoalState(state) {
  for (let row = 0; row < state.length; row++) {
    for (let col = 0; col < state[row].length; col++) {
      if (state[row][col] === EGG && levelOneMap[row][col] !== GOAL) {
        return false;
      }
    }
  }
  return true;
}

renderTheGame(state){
    for(let i=0 ; i<state.length ; i++){
        const row = state[i];
        for(let j=0 ; j<row.length ; j++){
            this.printBoardCell(this.context ,state[i][j],j,i);
        }
    }
    if (this.isGoalState(this.board)) {
        console.log(this.Nodes.length)
        alert(`you win ${this.Nodes.length}`);
    }
}

FindThePlayerPositon(state){
    let y = -1
    let x=-1;
    for(let i=0 ;i<state.length ;i++){
            const row = state[i];
            for(let j=0 ; j < row.length ; j++){
                if(row[j] === PLAYER){
                    x=i;
                    y=j;
                    break;
                }
            }
    }
    return { 
        x,
        y,
        above:state[x - 1][y],
        below:state[x + 1][y],
        right:state[x][y + 1],
        left:state[x][y - 1],
    }
}

MovePlayer(Coords,direction){
    if(this.Nodes.length === 0){
        this.firstNode = new node(this.board,"");
        this.Nodes.push(this.firstNode);
    }
    this.board[Coords.x][Coords.y] =  ISGOAL(levelOneMap[Coords.x][Coords.y]) ? GOAL : EMPTY;
    
    if(direction === "up"){
        this.board[Coords.x - 1][Coords.y] = PLAYER;
    }else if(direction === "down"){
        this.board[Coords.x + 1][Coords.y] = PLAYER;
    }else if(direction === "left"){
        this.board[Coords.x][Coords.y - 1] = PLAYER;
    }else if(direction === "right"){
        this.board[Coords.x][Coords.y + 1] = PLAYER;
    }

    let moveNode = new node(this.board , direction);
    moveNode.appendChildren(this.firstNode);
    this.firstNode = moveNode;
    this.Nodes.push(moveNode);

    // const coor = this.FindThePlayerPositon(this.board);
    // CheckTheMove(coor,this.board);
    return this.board;
}

MovePlayerAndEgg(Coords,direction){
    const newEgg = getCoorsForPlayer(Coords.x,Coords.y,2);
    const newEggX = newEgg[direction].X;
    const newEggY = newEgg[direction].Y;

    if(ISWALL(this.board[newEggX][newEggY])){
        return;
    }

    if(ISEGG(this.board[newEggX][newEggY]) ){
        return;
    }
    this.board[newEggX][newEggY] = ISGOAL(levelOneMap[newEggX][newEggY]) ? SUCCESS_BLOCK : EGG
    let newState =  this.MovePlayer(Coords,direction);
    return newState;
}

Move(Coords,direction){
    const {above,below,left,right} = Coords
    const adjacentCell = {
    up: above,
    down: below,
    left: left,
    right: right,
    }

    let newsState = JSON.parse(JSON.stringify(this.board));

    
    if (ISEMPTY(adjacentCell[direction])) {
    newsState = this.MovePlayer(Coords, direction)
    }
    if (ISEGG(adjacentCell[direction])) {
    newsState = this.MovePlayerAndEgg(Coords, direction)
    }
    return newsState;
}


}