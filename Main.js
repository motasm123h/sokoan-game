import { DIRECTIONS,keys } from "./Structure/Structure.js";
import Logic from "./Logic/Logic.js";

const logic = new Logic();
logic.renderTheGame();

document.addEventListener('keydown', (e)=>{
    const PlayerCoor = logic.FindThePlayerPositon()
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
    logic.renderTheGame()
})
const PlayerCoor = logic.FindThePlayerPositon()

// console.log(logic.dfs(PlayerCoor.x,PlayerCoor.y,,logic.board));
logic.DFS(logic.board);