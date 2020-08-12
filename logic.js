let turn = 0;
let state = new Array(8);
let judge = "false";

module.exports = class logic {
  first() {
    for (let i = 0; i < 8; i++) {
      state[i] = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    state[3][3] = -1;
    state[4][3] = 1;
    state[3][4] = 1;
    state[4][4] = -1;
    turn = 1;
    return state;
  }

  click(x, y) {
    if (state[x][y] == 0) {
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
  count = count + rev(x, y, 0, -1);
  count = count + rev(x, y, 1, -1);
  count = count + rev(x, y, 1, 0);
  count = count + rev(x, y, 1, 1);
  count = count + rev(x, y, 0, 1);
  count = count + rev(x, y, -1, 1);
  count = count + rev(x, y, -1, 0);
  count = count + rev(x, y, -1, -1);
  return count;
}

function rev(x, y, add_x, add_y) {
  let backup = new Array(8);
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[x][y] = state[x][y];
    }
  }
  let reverse_num = 0;
  let turn_flg = 0;
  let xx = x;
  let yy = y;

  while (true) {
    xx = xx + add_x;
    yy = yy + add_y;
    if (xx < 0 || xx > 7 || yy < 0 || yy > 7) {
      break;
    }
    if (state[xx][yy] == 0) {
      break;
    }
    if (state[xx][yy] == turn) {
      turn_flg = 1;
      break;
    }
    state[xx][yy] = state[xx][yy] * -1;
    reverse_num = reverse_num + 1;
  }
  if (reverse_num > 0) {
    if (turn_flg == 0) {
      for (let i = 0; i < 8; i++) {
        for (let ii = 0; ii < 8; ii++) {
          state[i][ii] = backup[i][ii];
          reverse_num = 0;
        }
      }
    } else {
      state[x][y] = turn;
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
      backup[x][y] = state[x][y];
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
