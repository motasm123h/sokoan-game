
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
    FindMaxDepth,
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
        this.nodes = [];

    }


    DFS(node){
    const startTime = performance.now();
    this.DFSstack.push(node);
    this.nodes.push(node);

    while(this.DFSstack.length > 0){
        let node = this.DFSstack.pop();

        if(this.logic.isGoalState(node.state)){
            const endTime = performance.now();
            const MaxTreeDepth = FindMaxDepth(this.nodes);
            console.log(`Time taken by DFS algorithm: ${endTime - startTime} milliseconds`);
            console.log('the visited node ', this.DFSvisited.size);
            console.log('the solution cost is : ' , node.cost );
            console.log('the solution depth is : ' , node.depth );
            console.log('Max tree depth : ' , MaxTreeDepth);

            console.log("the solution path");
            let path = [];
            while(node.parent !== null){
                path.push(node.action)
                node = node.parent;
            }
            while(path.length > 0){
                let pa = path.pop();
                console.log(pa);
            }
            return true;
        }
        const plyerCoor = this.logic.FindThePlayerPositon(node.state);
        const {NextNode} = CheckTheMove(plyerCoor,node);
        const newNodes = [
        ...NextNode.up, 
        ...NextNode.down,
        ...NextNode.right,
        ...NextNode.left,  
        ];

        for (let Nextnode of newNodes) {
            let id = getId(Nextnode.state);
            if (!this.DFSvisited.has(id) ){                
                this.nodes.push(Nextnode);
                this.DFSstack.push(Nextnode);
                this.DFSvisited.set(id,true);
            }
        }
    }
    return false;
}

}

