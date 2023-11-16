import { DIRECTIONS,keys } from "./Structure/Structure.js";
import Logic from "./Logic/Logic.js";
import dfs from "./Logic/dfs.js";
import bfs from "./Logic/bfs.js";
import ucf from "./Logic/ucf.js";
import a_star from "./Logic/a_star.js";
import node from "./class/node.js";

const logic = new Logic();
const dfsSolve = new dfs();
const bfsSolve = new bfs();
const ucfSolve = new ucf();
const aStarSolve = new a_star();
logic.renderTheGame(logic.board);

document.addEventListener('keydown', (e)=>{
    const PlayerCoor = logic.FindThePlayerPositon(logic.board)
    // console.log(PlayerCoor);
    switch(e.key){
        case keys.up:
            logic.Move(PlayerCoor,DIRECTIONS.up);
            break;
        case keys.down:
            // console.log(keys.down);
            logic.Move(PlayerCoor,DIRECTIONS.down);
            break;
        case keys.left:
            logic.Move(PlayerCoor,DIRECTIONS.left);
            break;
        case keys.right:
            logic.Move(PlayerCoor,DIRECTIONS.right);
            break;
        default:
    }
    logic.renderTheGame(logic.board)
})

let firstNode =  new node(logic.board,"");

// console.log(dfsSolve.DFS(firstNode)?'the solution found using DFS' : "the solution not found using DFS ");
// console.log(bfsSolve.BFS(firstNode)?'the solution found using BFS' : "the solution not found using BFS");
console.log(ucfSolve.UCS(firstNode)?'the solution found using UCS' : "the solution not found using UCS");
// console.log(aStarSolve.ASTAR(firstNode)?'the solution found using A*' : "the solution not found using A*");

// let value =ucfSolve.PriorityQueue.queue[0];
// ucfSolve.find(value)
// ucfSolve.find(value);

const element ={
    name:"motasm",
    cost:2,
}
const element1 ={
    name:"motasm1",
    cost:1,
}
const element3 ={
    name:"motasm3",
    cost:0,
}

// ucfSolve.addelements(element);
// ucfSolve.addelements(element1);
// // ucfSolve.addelements(element2);
// ucfSolve.addelements(element3);
// console.log(ucfSolve.PriorityQueue);
// ucfSolve.PriorityQueue.queue[1].cost = 8;
// console.log(ucfSolve.PriorityQueue);