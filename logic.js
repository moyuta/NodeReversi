let turn = 0;
let state = new Array(8);

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
    //石が置けるかどうか確認
    if (state[x][y] == 0) {
      if (check(x, y) > 0) {
        turn_chenge();
      }
    }
    let ret = [state, turn];
    return ret;
  }
};

function turn_chenge() {
  // ターンを変更
  turn = turn * -1;
  // ターンを交代して、置けるところがあるか確認する
  // 現状の配置をバックアップ
  let backup = new Array(8);
  let check_count = 0;
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[x][y] = state[x][y];
    }
  }
  // 左端からすべてのマスの確認を行う
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      check_count = check_count + check(x, y);
      // バックアップから元に戻す
      for (let i = 0; i < 8; i++) {
        for (let ii = 0; ii < 8; ii++) {
          state[i][ii] = backup[i][ii];
        }
      }
    }
  }

  // 置ける場所がない場合は、ターンを相手に戻す
  if (check_count == 0) {
    switch (turn) {
      case -1:
        turn = turn * -1;
        break;
      case 1:
        turn = turn * -1;
        break;
    }
  }
}

function check(x, y) {
  let count = 0;
  // 各方向へリバース出来るか確認
  count = count + rev(x, y, 0, -1); //上
  count = count + rev(x, y, 1, -1); //右上
  count = count + rev(x, y, 1, 0); //右
  count = count + rev(x, y, 1, 1); //右下
  count = count + rev(x, y, 0, 1); //下
  count = count + rev(x, y, -1, 1); //左下
  count = count + rev(x, y, -1, 0); //左
  count = count + rev(x, y, -1, -1); //左上
  return count;
}

// 指定したセルから指定した方向へreverseを行う
function rev(x, y, add_x, add_y) {
  // 最初に今の盤状況を退避する
  let backup = new Array(8);
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[x][y] = state[x][y];
    }
  }
  let reverse_num = 0; // 裏返した数
  let turn_flg = 0; // 自分の色の石があるのか
  let xx = x; // 指定したセルの位置(行)
  let yy = y; // 指定したセルの位置(列)
  // 指定したセルから指定された方向へ移動し
  // 完了条件になるまで石を裏返す
  while (true) {
    xx = xx + add_x;
    yy = yy + add_y;
    // 盤の端に到達したら抜ける
    if (xx < 0 || xx > 7 || yy < 0 || yy > 7) {
      break;
    }
    // 移動先のセルに石がなかったら抜ける
    if (state[xx][yy] == 0) {
      break;
    }
    // 移動先のセルが自分自身であれば、石があった事を判定し抜ける
    if (state[xx][yy] == turn) {
      turn_flg = 1;
      break;
    }
    // 上記以外は相手の石で有るので、裏返して裏返した件数を加算
    state[xx][yy] = state[xx][yy] * -1;
    reverse_num++;
  }
  // 裏返しを行ったが、移動先に自分の石がなかった場合は元に戻す
  if (reverse_num > 0) {
    if (turn_flg == 0) {
      for (let i = 0; i < 8; i++) {
        for (let ii = 0; ii < 8; ii++) {
          state[i][ii] = backup[i][ii];
          reverse_num = 0;
        }
      }
    } else {
      // ちゃんと裏返しが出来たら、置いた所に自分の石を置く
      state[x][y] = turn;
    }
  }

  // 最後に裏返しを行った件数を戻す
  return reverse_num;
}
