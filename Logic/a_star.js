import PriorityQueue from '../class/PriorityQueue.js ';
import Logic from './Logic.js';
import {
    FindMaxDepth,
    CheckTheMove,
    getId,
    FintConst,
    findCoordGoal,
    heuristic,
    findF,
}

from '../HelperFunction.js'

export default class ucf{
    constructor(){
        this.AVisited = new Map();
        this.logic = new Logic();
        this.PriorityQueue = new PriorityQueue();
        this.nodes = [];
    }
    
    ASTAR(node){
        const startTime = performance.now();
        this.PriorityQueue.enqueue(node);
        // console.log(this.PriorityQueue);
        while(!this.PriorityQueue.isEmpty()){
            let node = this.PriorityQueue.dequeue();
             let id = getId(node.state);
            if (this.AVisited.has(id) ){                
                continue;
            }

            if(this.logic.isGoalState(node.state)){
                const endTime = performance.now();
                let MaxTreeDepth = FindMaxDepth(this.nodes);

                console.log(`Time taken by UCS algorithm: ${endTime - startTime} milliseconds`);
                console.log('the visited node ', this.AVisited.size);
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

            // console.log(findCoordGoal(node.state));
            // console.log(heuristic({plyerCoor.x,plyerCoor.y},coors));
            // console.log(heuristic({ x: plyerCoor.x, y: plyerCoor.y }, coors));
         
            if(this.PriorityQueue.length() >=1){
                return true;
            }
            
            for(let node of newNodes){
                const cost = FintConst(node);

                let coors = findCoordGoal(node.state);
                let heuristicValue = heuristic({ x: plyerCoor.x, y: plyerCoor.y }, coors);

                let id = getId(node.state);
                let f = findF(node.cost , heuristicValue);
                
                console.log(node.state);
                console.log(node.cost);
                console.log(heuristicValue);
                if(!this.AVisited.has(id) && !this.PriorityQueue.contains(node)){
                    this.PriorityQueue.enqueue(node);
                    this.nodes.push(node);
                }
                else if(!this.AVisited.has(id)){

                }
                else if(this.AVisited.has(id) && cost < this.AVisited.get(id).cost && this.find(this.AVisited.get(id))){
                    this.PriorityQueue.removeElement(this.AVisited.get(id));
                    this.PriorityQueue.enqueue(node)
                }
            }
            let idd = getId(node.state);
            this.AVisited.set(idd,node);
        }
    }
    
    find(element){
        console.log(this.PriorityQueue.contains(element))
    }

    addelements(element){
        this.PriorityQueue.enqueue(element);
    }
}