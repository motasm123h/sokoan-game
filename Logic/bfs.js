
import Logic from './Logic.js';

import {
    FindMaxDepth,
    CheckTheMove,
    getId
}
from '../HelperFunction.js'

export default class dfs {
    constructor(){
        this.logic = new Logic();
        this.BFSQueue =[];
        this.BDSVisited = new Map();
        this.NodesBFS = [] ;
        this.nodes = [];
    }


    BFS(node){
    const startTime = performance.now();
    this.BFSQueue.push(node);

    while(this.BFSQueue.length > 0){
        let node = this.BFSQueue.shift();
        
        if(this.logic.isGoalState(node.state)){
            const endTime = performance.now();
            let MaxTreeDepth = FindMaxDepth(this.nodes);

            console.log(`Time taken by BFS algorithm: ${endTime - startTime} milliseconds`);
            console.log('the visited node ', this.BDSVisited.size);
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

        // ...newState.left,  
        // ];
        const newNodes = [
        ...NextNode.up, 
        ...NextNode.down,
        ...NextNode.right,
        ...NextNode.left,  
        ];

        // console.log(this.BFSQueue.length);
        // if(this.BFSQueue.length >= 25095){
        //     return false
        // }

        for (let move of newNodes) {
            let id = getId(move.state);
            if (!this.BDSVisited.has(id) ){                
                this.BFSQueue.push(move);
                this.nodes.push(move);
                this.BDSVisited.set(id,true);
            }
        }
    }
    return false;
}

}

