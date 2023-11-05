export default class node {
    constructor(state,action){
        this.state=state;
        this.action =action;
        this.cost=0;
        this.depth=0;
        this.parent =null
    }

    findAction(){
        return this.action
    }

    findCost(){
        return this.cost;
    }

    appendChildren(node){
        this.parent=node;
        this.depth =node.depth + 1 ;
        this.cost = node.cost + 1 ;
    }
}