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
    CountTheGoalCell,
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

    this.NextStatesPossile = {
        up:[],
        down:[],
        left:[],
        right:[],
    };

    this.states = [];
    this.Nodes = [] ;


    this.DFSstack = [];
    this.DFSvisited = new Map();
    this.DFSpath = [];
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
    
isValidPosition(x, y) {
  return x >= 0 && x < this.board.length && y >= 0 && y < this.board.length && levelOneMap[x][y] !== WALL;
}

getNextState(currentState, coor, direction){
    
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

IsWin(){
    const cnt =CountTheGoalCell();
    let cntSuccess_BLOCK = 0;
    for(let i=0 ; i<this.board.length ;i++){
        const cell = this.board[i];
        for(let j=0 ; j<cell.length ;j++){
            if(this.board[i][j] === SUCCESS_BLOCK){
                cntSuccess_BLOCK++;
            }
        }
    }
    return cnt === cntSuccess_BLOCK
    }

renderTheGame(){
    this.DFS(this.board);

    for(let i=0 ; i<this.board.length ; i++){
        const row = this.board[i];
        for(let j=0 ; j<row.length ; j++){
            this.printBoardCell(this.context , this.board[i][j],j,i);
        }
    }
    const result = this.IsWin();
    generateGame(this.level);
    
    if (result) {
    
    alert('you win');
    
    }
}

FindThePlayerPositon(){
    let y = -1
    let x=-1;
    for(let i=0 ;i<this.board.length ;i++){
            const row = this.board[i];
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
        above:this.board[x - 1][y],
        below:this.board[x + 1][y],
        right:this.board[x][y + 1],
        left:this.board[x][y - 1],
    }
}

FindThePlayerStatePositon(state){
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

CheckTheMove(Coords){
    let NextStatesPossile = {
            up:[],
            down:[],
            left:[],
            right:[],
    };
    const {x,y} = Coords

    const avMove= {
        up:ISWALL(this.board[x - 1][y]) || (ISEGG(this.board[x - 1][y]) && ISWALL(this.board[x - 2][y])) || (ISEGG(this.board[x - 1][y]) && ISEGG(this.board[x - 2][y])) ? 0 : 1 ,
        down:ISWALL(this.board[x + 1][y]) || (ISEGG(this.board[x + 1][y]) && ISWALL(this.board[x + 2][y])) || (ISEGG(this.board[x + 1][y]) && ISEGG(this.board[x + 2][y])) ? 0 : 1 ,
        right:ISWALL(this.board[x][y+1]) || (ISEGG(this.board[x][y+1]) && ISWALL(this.board[x][y+2])) || (ISEGG(this.board[x][y+1]) && ISEGG(this.board[x][y+2]))  ? 0 : 1 ,
        left:ISWALL(this.board[x][y-1]) || (ISEGG(this.board[x][y-1]) && ISWALL(this.board[x][y-2]))  || (ISEGG(this.board[x][y-1]) && ISEGG(this.board[x][y-2])) ? 0 :1 ,
    }
    if(avMove.up){
        if(ISEMPTY(this.board[x - 1][y])){
            let newState = JSON.parse(JSON.stringify(this.board));

            newState[x][y] = ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;
            newState[x-1][y] = PLAYER;

            if(!this.isStateInList(NextStatesPossile.up,newState)){
                NextStatesPossile.up.push(newState);
            } 
        }
        else if(ISEGG(this.board[x - 1][y]) && ISEMPTY(this.board[x - 2][y])){
            let newState = JSON.parse(JSON.stringify(this.board));
            
            newState[x][y]=EMPTY;
            newState[x-1][y]=PLAYER;
            newState[x-2][y]=EGG;
            if(!this.isStateInList(NextStatesPossile.up,newState)){
                NextStatesPossile.up.push(newState);
            }
        }
    }
   if(avMove.down){
        if(ISEMPTY(this.board[x + 1][y])){
            let newState = JSON.parse(JSON.stringify(this.board));

            newState[x][y]=ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;;
            newState[x+1][y]=PLAYER;
            if(!this.isStateInList(NextStatesPossile.down,newState)){
                NextStatesPossile.down.push(newState);
            }
        }
        else if(ISEGG(this.board[x + 1][y]) && ISEMPTY(this.board[x + 2][y])){
            let newState = JSON.parse(JSON.stringify(this.board));
            newState[x][y]=EMPTY;
            newState[x+1][y]=PLAYER;
            newState[x+2][y]=EGG;
            if(!this.isStateInList(NextStatesPossile.down,newState)){
                NextStatesPossile.down.push(newState);
            }
        }
    }
    if(avMove.left){
        if(ISEMPTY(this.board[x][y-1])){
            let newState = JSON.parse(JSON.stringify(this.board));
            newState[x][y]=ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;
            newState[x][y-1]=PLAYER
            if(!this.isStateInList(NextStatesPossile.left,newState)){
                NextStatesPossile.left.push(newState);
            }
        }
        if(ISEGG(this.board[x][y-1]) && ISEMPTY(this.board[x][y-2])){
            let newState = JSON.parse(JSON.stringify(this.board));
            newState[x][y]=EMPTY;
            newState[x][y-1]=PLAYER;
            newState[x][y-2]=EGG;
            if(!this.isStateInList(NextStatesPossile.left,newState)){
                NextStatesPossile.left.push(newState);
            }
        }
    }
    if(avMove.right){
        if(ISEMPTY(this.board[x][y+1])){
            let newState = JSON.parse(JSON.stringify(this.board));
            newState[x][y]=ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;
            newState[x][y+1]=PLAYER
            if(!this.isStateInList(NextStatesPossile.right,newState)){
                NextStatesPossile.right.push(newState);
            }
        }
        if(ISEGG(this.board[x][y+1]) && ISEMPTY(this.board[x][y+2])){
            let newState = JSON.parse(JSON.stringify(this.board));
            newState[x][y]=EMPTY;
            newState[x][y+1]=PLAYER;
            newState[x][y+2]=EGG;
            if(!this.isStateInList(NextStatesPossile.right,newState)){
                NextStatesPossile.right.push(newState);
            }
        }
    }
    // console.log(NextStatesPossile);
    return {
    newState:NextStatesPossile,
    NextMove:avMove
    };
}

DFS(state){
    const plyerCoor = this.FindThePlayerStatePositon(state);
    const {x,y}=plyerCoor;
    this.DFSstack.push(state);
    while(this.DFSstack.length > 0){
        const state = this.DFSstack.pop();
        // console.log(state)
        if(this.isGoalState(state)){
            // console.log(state)
            return true;
        }
        const plyerCoor = this.FindThePlayerStatePositon(state);
        const {newState} = this.CheckTheMove(plyerCoor);
        const newStatess = [
        ...newState.up, 
        ...newState.down,
        ...newState.left,  
        ...newState.right
        ];
        console.log(newStatess);
        // if(this.DFSstack.length >= 3){
        //     return false
        // }

        for (let move of newStatess) {
            if (!this.DFSvisited.has(move)){
                this.DFSvisited.set(move);
                this.DFSstack.push(move);
            }
        }
    }

    if (this.DFSstack.some((state) => this.DFS(state))) {
        return true;
    }

    return false;
}
// DFS(state){
//     if(this.IsWin(state))
//     {
//          return true
//     }
//     // this.DFSstack.push(state)
//     let {x,y} = this.FindThePlayerPositon();

// }

MovePlayer(Coords,direction){
    // this.Moves.Moves.push(direction);
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
    moveNode.parent=this.firstNode;
    moveNode.cost = this.firstNode.cost + 1;
    moveNode.depth = this.firstNode.depth + 1;
    this.firstNode = moveNode;
    this.Nodes.push(moveNode);


    const coor = this.FindThePlayerPositon();
    this.CheckTheMove(coor);

    // console.log(this.board);
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
    let {newState} = this.CheckTheMove(Coords);
    console.log((newState["up"]));
    
    if (ISEMPTY(adjacentCell[adjacentCell[direction]]) ) {
    newsState = this.MovePlayer(Coords, direction)
    }
    if (ISEGG(adjacentCell[direction])) {
    newsState = this.MovePlayerAndEgg(Coords, direction)
    }
    return newsState;
    // this.board = newState[direction]
}

isStateInList(NextStatesPossile , state) {
    for(let i=0 ;i<NextStatesPossile.length ;i++) {
        if(this.compareStates(NextStatesPossile[i], state)){
            return true;
        }
    }
    return false;

}; 
compareStates(state1,state2) {
    for(let i=0 ;i<state1.length ;i++) {
        for(let j=0 ;j<state1.length ;j++){
            if(state1[i][j] != state2[i][j]){
                return false;
            }
        }
    }
    return true;
}



}