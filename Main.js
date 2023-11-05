import { DIRECTIONS,keys } from "./Structure/Structure.js";
import Logic from "./Logic/Logic.js";
import dfs from "./Logic/dfs.js";
import bfs from "./Logic/bfs.js";

const logic = new Logic();
const dfsSolve = new dfs();
const bfsSolve = new bfs();
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

// console.log(dfsSolve.DFS(logic.board)?'the solution found using DFS' : "the solution not found using DFS ");
console.log(bfsSolve.BFS(logic.board)?'the solution found using BFS' : "the solution not found using BFS");