import node from '../class/node.js';

export const EGG = 'egg';
export const PLAYER = 'player';
export const WALL = 'wall';
export const EMPTY = 'empty';
export const GOAL = 'goal';
export const SUCCESS_BLOCK = 'success_block';
export const PLAYERCOORDINAT = {
     "X" : 2,
     "Y" : 2,
     "VALUE" : PLAYER,
}
export const DIRECTIONS = {
  up: 'up',
  down: 'down',
  right: 'right',
  left: 'left',

};

export const keys = {
  [DIRECTIONS.up]: 'ArrowUp',
  [DIRECTIONS.down]: 'ArrowDown',
  [DIRECTIONS.left]: 'ArrowLeft',
  [DIRECTIONS.right]: 'ArrowRight',

};

export const SIZE = {
  height: 700,
  width: 700,
};

export const MULTIPLIER = 60;


export const levelOneMap = [
  [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
  [WALL, EMPTY, EMPTY, EMPTY, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, EMPTY, EGG, EMPTY, EMPTY, WALL, EGG, WALL, EMPTY, WALL],
  [WALL, EMPTY, EMPTY, EMPTY, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, WALL, WALL, EGG, WALL, WALL, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, WALL, WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, EGG, EMPTY, EMPTY, EMPTY, WALL, WALL, WALL, WALL, WALL],
  [WALL, GOAL, EMPTY, EMPTY, PLAYER, GOAL, GOAL, GOAL, WALL, WALL],
  [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
];


// export const levelOneMap = [
//   [WALL, GOAL,  WALL],
//   [WALL, EGG, WALL],
//   [WALL, PLAYER,  WALL],
//   [WALL, WALL,  WALL],
// ];

// levelOneMap /levelTwoMap// 
export const levelTwoMap = [
  [WALL, WALL, WALL, WALL, WALL, WALL],
  [WALL, EMPTY, WALL, EMPTY, GOAL, WALL],
  [WALL, EMPTY, EGG, EMPTY, GOAL, WALL],
  [PLAYER, EMPTY, EMPTY, EGG, GOAL, WALL],
  [WALL, EMPTY, EGG, EGG, GOAL, WALL],
  [WALL, EMPTY, EMPTY, WALL, WALL, WALL],
  [WALL, WALL, WALL, WALL, WALL,]
];


// console.log(playerNode);