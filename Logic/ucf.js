import PriorityQueue from '../class/PriorityQueue.js ';
import Logic from './Logic.js';
import {
    FindMaxDepth,
    CheckTheMove,
    getId
}
from '../HelperFunction.js'

export default class ucf{
    constructor(){
        this.UCFVisited = new Map();
        this.logic = new Logic();
        this.PriorityQueue = new PriorityQueue();
        this.nodes = [];
    }
    

    UCS(node){
        const startTime = performance.now();
        this.PriorityQueue.enqueue(node);
        // console.log(this.PriorityQueue);
        while(!this.PriorityQueue.isEmpty()){
            let node = this.PriorityQueue.dequeue();
            // console.log(node);
            if(this.logic.isGoalState(node.state)){
                const endTime = performance.now();
                let MaxTreeDepth = FindMaxDepth(this.nodes);

                console.log(`Time taken by UCS algorithm: ${endTime - startTime} milliseconds`);
                console.log('the visited node ', this.UCFVisited.size);
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
            // if(this.PriorityQueue.length() >=55){
            //     console.log("here");
            //     return true;
            // }
            for(let node of newNodes){
                let id = getId(node.state);
                if(!this.UCFVisited.has(id)){
                    this.PriorityQueue.enqueue(node);
                    this.UCFVisited.set(id,node);
                    this.nodes.push(node);

                   }
                else if(this.UCFVisited.has(id) && node.cost < this.UCFVisited.get(id).cost){
                    let previousNode = this.UCFVisited.get(id);
                    previousNode.cost = node.cost;
                    this.PriorityQueue.enqueue(node)
                }
            }

        }
    }
    addelements(element){
        this.PriorityQueue.enqueue(element);
    }
}