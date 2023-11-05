
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
        this.BFSQueue =[];
        this.BDSVisited = new Map();
        this.NodesBFS = [] ;

    }


    BFS(state){
    this.BFSQueue.push(state);
    let Fnode = new node(state,"");
    this.NodesBFS.push(Fnode);
    let previousState;

    while(this.BFSQueue.length > 0){
        // const state = this.BFSQueue.pop();
        const state = this.BFSQueue.shift();
        console.log(state);

        if(this.BFSQueue.length === 0){
            previousState = state;
        }
        else{
            const previousCoor = this.logic.FindThePlayerPositon(previousState);
            const stateCoor = this.logic.FindThePlayerPositon(state);
            if(previousCoor.x > stateCoor.x && previousCoor.y  === stateCoor.y)
            {   
                let newNode = new node(state,"up");
                newNode.appendChildren(this.NodesBFS[this.NodesBFS.length - 1]);
                this.NodesBFS.push(newNode);

            }
            if(previousCoor.x < stateCoor.x && previousCoor.y  === stateCoor.y){
                let newNode = new node(state,"down");
                newNode.appendChildren(this.NodesBFS[this.NodesBFS.length - 1]);
                this.NodesBFS.push(newNode);
            }
            if(previousCoor.x === stateCoor.x && previousCoor.y < stateCoor.y){
                let newNode = new node(state,"right");
                newNode.appendChildren(this.NodesBFS[this.NodesBFS.length - 1]);
                this.NodesBFS.push(newNode);
            }
            if(previousCoor.x  === stateCoor.x && previousCoor.y > stateCoor.y){
                let newNode = new node(state,"left");
                newNode.appendChildren(this.NodesBFS[this.NodesBFS.length - 1]);
                this.NodesBFS.push(newNode);
            }
        }
        previousState = state; 
        
        if(this.logic.isGoalState(state)){
            let nodeLast = this.NodesBFS.pop();
            // let nodeLasts = this.NodesBFS.pop();
            console.log(this.NodesBFS)
            console.log('the solution cost is :',nodeLast.depth ,'this is by using the BFS Algorithm');
            return true;
        }

        const plyerCoor = this.logic.FindThePlayerPositon(state);
        const {newState} = CheckTheMove(plyerCoor,state);
        const newStatess = [
        ...newState.up, 
        ...newState.down,
        ...newState.right,
        ...newState.left,  
        ];
        console.log(this.BFSQueue.length);
        // if(this.BFSQueue.length >= 25095){
        //     return false
        // }

        for (let move of newStatess) {
            let id = getId(move);
            if (!this.BDSVisited.has(id) ){                
                this.BFSQueue.push(move);
                this.BDSVisited.set(id,true);
            }
        }
    }
    return false;
}

}

