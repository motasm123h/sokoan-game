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

    removeElement(elementToRemove) {
        const indexToRemove = this.queue.findIndex(
        (item) => {
            item.state === elementToRemove
            // console.log(item.state === elementToRemove.state);
            console.log(item.state)
        // console.log('his ',item.state)
        // console.log('my ',elementToRemove)
        }
        );
        if (indexToRemove !== -1) {
            console.log("in");
        return this.queue.splice(indexToRemove, 1)[0].element;
        }
        return null;
    }

    contains(element) {
        return this.queue.some((item) => item.state === element.state);
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    length(){
        return this.queue.length;
    }


}