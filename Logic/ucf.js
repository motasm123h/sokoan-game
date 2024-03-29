import PriorityQueue from '../class/PriorityQueue.js ';
import Logic from './Logic.js';
import {
    FindMaxDepth,
    CheckTheMove,
    getId,
    FintConst,
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
             let id = getId(node.state);
            if (this.UCFVisited.has(id) ){                
                continue;
            }

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
                console.log(path)
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

            // if(this.PriorityQueue.length() >=4){
            //     return true;
            // }

            for(let node of newNodes){
                const cost = FintConst(node);
                let id = getId(node.state);

                if(!this.UCFVisited.has(id) && !this.PriorityQueue.contains(node)){
                    this.PriorityQueue.enqueue(node);
                    this.nodes.push(node);
                }

                else if(this.UCFVisited.has(id) && cost < this.UCFVisited.get(id).cost && this.find(this.UCFVisited.get(id))){
                    this.PriorityQueue.removeElement(this.UCFVisited.get(id));
                    this.PriorityQueue.enqueue(node)
                }
            }
            let idd = getId(node.state);
            this.UCFVisited.set(idd,node);

        }
    }
    find(element){
        console.log(this.PriorityQueue.contains(element))
    }
    addelements(element){
        this.PriorityQueue.enqueue(element);
    }
}