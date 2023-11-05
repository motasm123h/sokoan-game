
import Logic from './Logic.js';

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
    CheckTheMove,
    isStateInList,
    compareStates,
    getId
}

from '../HelperFunction.js'
import node from '../class/node.js';

// const initialState = logic.board;

export default class dfs {
    constructor(){
        this.logic = new Logic();
        this.DFSstack =[];
        this.DFSvisited = new Map();
        this.NodesDFS = [] ;

    }


    DFS(state){
    this.DFSstack.push(state);
    let Fnode = new node(state,"");
    this.NodesDFS.push(Fnode);
    let previousState;

    while(this.DFSstack.length > 0){
        const state = this.DFSstack.pop();
        const plyerCoorNEW = this.logic.FindThePlayerPositon(state);

        if(this.DFSstack.length === 0){
            previousState = state;
        }
        else{
            const previousCoor = this.logic.FindThePlayerPositon(previousState);
            const stateCoor = this.logic.FindThePlayerPositon(state);
            if(previousCoor.x - 1 === stateCoor.x && previousCoor.y  === stateCoor.y)
            {   
                let newNode = new node(state,"up");
                newNode.appendChildren(this.NodesDFS[this.NodesDFS.length - 1]);
                this.NodesDFS.push(newNode);

            }
            if(previousCoor.x + 1 === stateCoor.x && previousCoor.y  === stateCoor.y){
                let newNode = new node(state,"down");
                newNode.appendChildren(this.NodesDFS[this.NodesDFS.length - 1]);
                this.NodesDFS.push(newNode);
            }
            if(previousCoor.x === stateCoor.x && previousCoor.y + 1  === stateCoor.y){
                let newNode = new node(state,"right");
                newNode.appendChildren(this.NodesDFS[this.NodesDFS.length - 1]);
                this.NodesDFS.push(newNode);
            }
            if(previousCoor.x  === stateCoor.x && previousCoor.y - 1 === stateCoor.y){
                let newNode = new node(state,"left");
                newNode.appendChildren(this.NodesDFS[this.NodesDFS.length - 1]);
                this.NodesDFS.push(newNode);
            }
        }
        previousState = state; 
        if(this.logic.isGoalState(state)){
            let nodeLast = this.NodesDFS.pop();
            console.log('the solution cost is :',nodeLast.depth ,'this is by using the DFS Algorithm');
            return true;
        }
        const plyerCoor = this.logic.FindThePlayerPositon(state);
        const {newState} = CheckTheMove(plyerCoor,state);
        const newStatess = [
        ...newState.left,  
        ...newState.right,
        ...newState.down,
        ...newState.up, 
        ];

        // if(this.DFSstack.length >= 2){
        //     return false
        // }

        for (let move of newStatess) {
            let id = getId(move);
            if (!this.DFSvisited.has(id) ){                
                this.DFSstack.push(move);
                this.DFSvisited.set(id,true);
            }
        }
    }
    return false;
}

}

