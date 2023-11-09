export default class PriorityQueue {
    constructor(){
        this.queue = [];
    }

    enqueue(element){
        if(this.isEmpty()){
            
            this.queue.push(element);
        }else{
        // console.log("hi");
            let added = false ;
                for(let i = 0 ;i<this.queue.length ;i++){
                    if(element.cost < this.queue[i].cost){
                        this.queue.splice(i,0,element);
                        added = true;
                        break;
                    }
                }
        if(!added){
            this.queue.push(element);
            }
        }
    }

    dequeue(){
        if(this.isEmpty){
            return this.queue.shift();
        }
        else return null;
    }


    isEmpty() {
        return this.queue.length === 0;
    }

    length(){
        return this.queue.length;
    }


}