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

export const ISWALL = (cell) => cell === WALL;
export const ISPLAYER = (cell) => cell === PLAYER;
export const ISEMPTY = (cell) => cell === EMPTY || cell === GOAL;
export const ISGOAL = (cell) => cell === GOAL;
export const ISEGG = (cell) => cell === EGG ||cell ===SUCCESS_BLOCK;

// console.log(ISWALL(levelOneMap[1][1]));
// console.log(ISPLAYER(levelOneMap[1][1]));
// console.log(ISEMPTY(levelOneMap[1][1]));
// console.log(ISGOAL(levelOneMap[1][1]));
// console.log(ISWALL(levelOneMap[1][1]));
// console.log(ISEGG(levelOneMap[1][1]));

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
    // console.log("count is",cnt);
}
CountTheGoalCell();
// generateGame();