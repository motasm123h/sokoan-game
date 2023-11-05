import {
    EMPTY,
    GOAL,
    PLAYER,
    EGG,
    WALL,
    SUCCESS_BLOCK,
    levelOneMap,
    levelTwoMap 
} from './Structure/Structure.js';
// import node from './node';


export const ISWALL = (cell) => cell === WALL;
export const ISPLAYER = (cell) => cell === PLAYER;
export const ISEMPTY = (cell) => cell === EMPTY || cell === GOAL;
export const ISGOAL = (cell) => cell === GOAL;
export const ISEGG = (cell) => cell === EGG || cell === SUCCESS_BLOCK;

export const getCoords = (x,y,direction,move=1) => {
    if(direction === "left"){
        return y - move;
    }else if(direction === "up"){
        return x - move;
    }else if(direction === "down"){
        return y + move;
    }else if(direction === "right"){
        return x + move;
    }
}

export const getCoorsForPlayer = (x,y,move) => {
    const direction = {
        left : {X:x, Y:(y - move)},
        right : {X:x, Y:(y + move)},
        up : {X:x-move, Y:y},
        down : {X:x+move, Y:y},
    };
    return direction;
}

export const getId = (state) => {
    return JSON.stringify(state);
}

export function generateGame(level = 1){
    // console.log(JSON.parse(JSON.stringify(levelOneMap)) );
    if(level === 1){

    return JSON.parse(JSON.stringify(levelOneMap)) 
    }else if(level === 2){
    return JSON.parse(JSON.stringify(levelTwoMap)) 

    }
}

export function CountTheGoalCell(){
    let cnt = 0;
    for(let i = 0; i < levelOneMap.length; i++){
       const cell = levelOneMap[i];
        for(let j=0 ;j<cell.length ;j++){
            if(levelOneMap[i][j] === GOAL){
                    cnt++;
            }
        }
    }
    return cnt;
}

export const isStateInList = (NextStatesPossile , state) => {
    for(let i=0 ;i<NextStatesPossile.length ;i++) {
        if(this.compareStates(NextStatesPossile[i], state)){
            return true;
        }
    }
    return false;

};

export const compareStates = (state1,state2) => {
    for(let i=0 ;i<state1.length ;i++) {
        for(let j=0 ;j<state1.length ;j++){
            if(state1[i][j] != state2[i][j]){
                return false;
            }
        }
    }
    return true;
}

export const nodeEquals = (node1, node2) =>{
  if(JSON.stringify(node1.board) !== JSON.stringify(node2.board)) {
    return false;
  }
  if(node1.direction !== node2.direction) {
    return false;
  }
  return true;
}


export const CheckTheMove = (Coords,state) => {
    let NextStatesPossile = {
            up:[],
            down:[],
            left:[],
            right:[],
    };
    const {x,y} = Coords
    const avMove= {
        up:ISWALL(state[x - 1][y]) || (ISEGG(state[x - 1][y]) && ISWALL(state[x - 2][y])) || (ISEGG(state[x - 1][y]) && ISEGG(state[x - 2][y])) ? 0 : 1 ,
        down:ISWALL(state[x + 1][y]) || (ISEGG(state[x + 1][y]) && ISWALL(state[x + 2][y])) || (ISEGG(state[x + 1][y]) && ISEGG(state[x + 2][y])) ? 0 : 1 ,
        right:ISWALL(state[x][y+1]) || (ISEGG(state[x][y+1]) && ISWALL(state[x][y+2])) || (ISEGG(state[x][y+1]) && ISEGG(state[x][y+2]))  ? 0 : 1 ,
        left:ISWALL(state[x][y-1]) || (ISEGG(state[x][y-1]) && ISWALL(state[x][y-2]))  || (ISEGG(state[x][y-1]) && ISEGG(state[x][y-2])) ? 0 :1 ,
    }
    if(avMove.up){
        if(ISEMPTY(state[x - 1][y])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y] = ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;
            newState[x-1][y] = PLAYER;
            // node = new node(newState , "up" )
            if(!isStateInList(NextStatesPossile.up,newState)){
                NextStatesPossile.up.push(newState);
            } 
        }
        else if(ISEGG(state[x - 1][y]) && ISGOAL(state[x - 2][y])){
            let newState = JSON.parse(JSON.stringify(state));
            
            newState[x][y]=EMPTY;
            newState[x-1][y]=PLAYER;
            newState[x-2][y]=SUCCESS_BLOCK;

            if(!isStateInList(NextStatesPossile.up,newState)){
                NextStatesPossile.up.push(newState);
            }
        }
        else if(ISEGG(state[x - 1][y]) && ISEMPTY(state[x - 2][y])){
            let newState = JSON.parse(JSON.stringify(state));
            
            newState[x][y]=EMPTY;
            newState[x-1][y]=PLAYER;
            newState[x-2][y]=EGG;
            if(!isStateInList(NextStatesPossile.up,newState)){
                NextStatesPossile.up.push(newState);
            }
        }
        // else if (ISSUCCESS_BLOCK(state[x-1][y]) && ISEMPTY(state[x-2][y]))){
        //     let newState = JSON.parse(JSON.stringify(state));
        //     newState[x][y]=EMPTY;
        //     newState[x-1][y]=PLAYER;
        //     newState[x-2][y]=EGG;
            
        // }
    }
   if(avMove.down){
        if(ISEMPTY(state[x + 1][y])){
            let newState = JSON.parse(JSON.stringify(state));

            newState[x][y]=ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;;
            newState[x+1][y]=PLAYER;
            if(!isStateInList(NextStatesPossile.down,newState)){
                NextStatesPossile.down.push(newState);
            }
        }
        else if(ISEGG(state[x + 1][y]) && ISGOAL(state[x + 2][y])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=EMPTY;
            newState[x+1][y]=PLAYER;
            newState[x+2][y]=SUCCESS_BLOCK;
            if(!isStateInList(NextStatesPossile.down,newState)){
                NextStatesPossile.down.push(newState);
            }
        }
        else if(ISEGG(state[x + 1][y]) && ISEMPTY(state[x + 2][y])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=EMPTY;
            newState[x+1][y]=PLAYER;
            newState[x+2][y]=EGG;
            if(!isStateInList(NextStatesPossile.down,newState)){
                NextStatesPossile.down.push(newState);
            }
        }
    }
    if(avMove.left){
        if(ISEMPTY(state[x][y-1])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;
            newState[x][y-1]=PLAYER
            if(!isStateInList(NextStatesPossile.left,newState)){
                NextStatesPossile.left.push(newState);
            }
        }
        else if(ISEGG(state[x][y-1]) && ISGOAL(state[x][y-2])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=EMPTY;
            newState[x][y-1]=PLAYER;
            newState[x][y-2]=SUCCESS_BLOCK;
            if(!isStateInList(NextStatesPossile.left,newState)){
                NextStatesPossile.left.push(newState);
            }
        }
        else if(ISEGG(state[x][y-1]) && ISEMPTY(state[x][y-2])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=EMPTY;
            newState[x][y-1]=PLAYER;
            newState[x][y-2]=EGG;
            if(!isStateInList(NextStatesPossile.left,newState)){
                NextStatesPossile.left.push(newState);
            }
        }
    }
    if(avMove.right){
        if(ISEMPTY(state[x][y+1])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=ISGOAL(levelOneMap[x][y]) ? GOAL :EMPTY;
            newState[x][y+1]=PLAYER
            if(!isStateInList(NextStatesPossile.right,newState)){
                NextStatesPossile.right.push(newState);
            }
        }
        else if(ISEGG(state[x][y+1]) && ISGOAL(state[x][y+2])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=EMPTY;
            newState[x][y+1]=PLAYER;
            newState[x][y+2]=SUCCESS_BLOCK;
            if(!isStateInList(NextStatesPossile.right,newState)){
                NextStatesPossile.right.push(newState);
            }
        }
        else if(ISEGG(state[x][y+1]) && ISEMPTY(state[x][y+2])){
            let newState = JSON.parse(JSON.stringify(state));
            newState[x][y]=EMPTY;
            newState[x][y+1]=PLAYER;
            newState[x][y+2]=EGG;
            if(!isStateInList(NextStatesPossile.right,newState)){
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
