let state = new Array(8);

for (let i = 0; i < 8; i++) {
  state[i] = new Array(8);
}

state[2][3] = 3;
state[4][5] = 3;

console.log(state[2][3]);
console.log(state[4][5]);
