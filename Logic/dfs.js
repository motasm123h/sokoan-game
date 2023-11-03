
import Logic from './Logic';

const logic = new Logic();

const initialState = logic.board;

function dfs() {
  const stack = [new node(this.board, "")];
  const visited = new Set();
  const path = [];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    const currentState = currentNode.state;

    if (isGoalState(currentState)) {
      return path;
    }

    if (!visited.has(JSON.stringify(currentState))) {
      visited.add(JSON.stringify(currentState));

      const coor = findPlayerPosition(currentState);
      const possibleMoves = checkTheMove(coor);

      for (const direction in possibleMoves) {
        if (possibleMoves[direction]) {
          const newState = getNextState(currentState, coor, direction);
          const newNode = new node(newState, direction);
          newNode.parent = currentNode;
          newNode.cost = currentNode.cost + 1;
          newNode.depth = currentNode.depth + 1;

          stack.push(newNode);
          path.push(direction);

          Move(coor, direction); // Call your Move function here
        }
      }
    }
  }

  return false;
}