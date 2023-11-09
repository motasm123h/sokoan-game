
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
        this.nodes = [];
    }


    BFS(node){
    const startTime = performance.now();
    this.BFSQueue.push(node);

    while(this.BFSQueue.length > 0){
        let node = this.BFSQueue.shift();
        // console.log(node.state);
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
//         if(this.BFSQueue.length >=6500){
// return false;
//         }

        const plyerCoor = this.logic.FindThePlayerPositon(node.state);
        const {NextNode} = CheckTheMove(plyerCoor,node);

        const newNodes = [
        ...NextNode.up, 
        ...NextNode.down,
        ...NextNode.right,
        ...NextNode.left,  
        ];

        // console.log(this.BFSQueue.length);
        // if(this.BFSQueue.length >= 19295){
        //     return false
        // }
        // console.log(this.BFSQueue.length);
        
        for (let move of newNodes) {
            let id = getId(move.state);
            if (!this.BDSVisited.has(id) ){                
                this.BFSQueue.push(move);
                this.nodes.push(move);
                this.BDSVisited.set(id,true);
            }
            //else{
            //     console.log("he");
            // }
        }
    }
    return false;
}

}

