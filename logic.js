let turn = 0;
let state = new Array(8);
for (let i = 0; i < 8; i++) {
  state[i] = new Array(8);
}
console.log(state);
let judge = "false";

module.exports = class logic {
  first() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        state[i][j] = 0;
      }
    }
    state[3][3] = -1;
    state[4][3] = 1;
    state[3][4] = 1;
    state[4][4] = -1;
    turn = 1;
    return state;
  }

  click(x, y) {
    if (state[y][x] == 0) {
      if (check(x, y) > 0) {
        turn = turn * -1;
        skip();
        win();
      }
    }
    let ret = [state, turn, judge];
    return ret;
  }
};
function check(x, y) {
  let count = 0;
  count = count + change(x, y, 0, -1);
  count = count + change(x, y, 1, -1);
  count = count + change(x, y, 1, 0);
  count = count + change(x, y, 1, 1);
  count = count + change(x, y, 0, 1);
  count = count + change(x, y, -1, 1);
  count = count + change(x, y, -1, 0);
  count = count + change(x, y, -1, -1);
  return count;
}

function change(x, y, add_x, add_y) {
  let backup = new Array(8);
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[y][x] = state[y][x];
    }
  }
  let reverse_num = 0;
  let flag = 0;
  let all_x = x;
  let all_y = y;

  while (true) {
    all_x = all_x + add_x;
    all_y = all_y + add_y;
    if (all_x < 0 || all_x > 7 || all_y < 0 || all_y > 7) {
      break;
    }
    if (state[all_y][all_x] == 0) {
      break;
    }
    if (state[all_y][all_x] == turn) {
      flag = 1;
      break;
    }
    state[all_y][all_x] = state[all_y][all_x] * -1;
    reverse_num = reverse_num + 1;
  }
  if (reverse_num > 0) {
    if (flag == 0) {
      for (let i = 0; i < 8; i++) {
        for (let ii = 0; ii < 8; ii++) {
          state[i][ii] = backup[i][ii];
          reverse_num = 0;
        }
      }
    } else {
      state[y][x] = turn;
    }
  }
  return reverse_num;
}

function skip() {
  let backup = new Array(8);
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[y][x] = state[y][x];
    }
  }

  let count_can = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      count_can = count_can + check(i, j);
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      state[i][j] = backup[i][j];
    }
  }
  if (count_can == 0) {
    turn = turn * -1;
  }
}
function win() {
  let black = 0;
  let white = 0;
  let empty = 0;
  judge = "false";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (state[i][j] == 1) {
        black = black + 1;
      } else if (state[i][j] == -1) {
        white = white + 1;
      } else {
        empty = empty + 1;
      }
    }
  }
  if (black == 0 || white == 0 || empty == 0) {
    judge = "true";
  }
}
