
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
        this.DFSstack =[];
        this.DFSvisited = new Map();
        this.nodes = [];
    }

    DFS(node){
    const startTime = performance.now();
    this.DFSstack.push(node);
    let DFSvisited = new Map();
    // this.nodes.push(node);

    while(this.DFSstack.length > 0){
        let node = this.DFSstack.pop();
        let id = getId(node.state);
        if(DFSvisited.has(id) ){                
            continue;
        }
        
        if(this.logic.isGoalState(node.state)){
            const endTime = performance.now();
            const MaxTreeDepth = FindMaxDepth(this.nodes);
            console.log(`Time taken by DFS algorithm: ${endTime - startTime} milliseconds`);
            console.log('the visited node ', DFSvisited.size);
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
        // console.log(this.DFSstack.length);
        for (let Nextnode of newNodes) {
            let id = getId(node.state);
            if (!DFSvisited.has(id) ){                
                this.DFSstack.push(Nextnode);
                this.nodes.push(Nextnode);
            }
        }
        let idd = getId(node.state);
        DFSvisited.set(idd,true);
    }
    return false;
}

}

