//フロントサイド🟦
let ban = document.getElementById("field");
let tarn_msg = document.getElementById("tarn");
let turn = 1;
tarn_msg.textContent = "⚫から始めてください";
let ban_ar = new Array(8);
for (let x = 0; x < ban_ar.length; x++) {
  ban_ar[x] = new Array(8);
}

ban_new();
function ban_new() {
  for (let x = 0; x < 8; x++) {
    let tr = document.createElement("tr");
    ban.appendChild(tr);
    for (let y = 0; y < 8; y++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
  }
}
//読み込みイベント
$.ajax({
  type: "POST",
  url: "/first",
  data: JSON.stringify({ s: "start" }),
})
  .done(function (data) {
    ban_ar = JSON.parse(data);
    ban_set();
  })
  //↓フォームの送信に失敗した場合の処理
  .fail(function () {
    alert("error");
  });

// // クリックした時に実行されるイベント
for (let x = 0; x < 8; x++) {
  for (let y = 0; y < 8; y++) {
    let click_osero = ban.rows[x].cells[y];
    click_osero.onclick = function () {
      $.ajax({
        type: "POST",
        url: "/click",
        data: JSON.stringify({
          x: this.parentNode.rowIndex,
          y: this.cellIndex,
        }),
      })
        .done(function (data) {
          let dating = JSON.parse(data);
          ban_ar = dating[0];
          turn = dating[1];
          if (turn == 1) {
            tarn_msg.textContent = "⚫";
          } else {
            tarn_msg.textContent = "⚪️";
          }

          ban_set();
        })
        //↓フォームの送信に失敗した場合の処理
        .fail(function () {
          alert("error");
        });
    };
  }
}
// // フロントサイド
// // 盤面状況(配列)を実際の盤面へ反映させる処理
function ban_set() {
  let stone = "";
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      switch (ban_ar[x][y]) {
        case 0:
          stone = "";
          break;
        case -1:
          stone = "⚪";
          break;
        case 1:
          stone = "⚫️";
          break;
      }
      ban.rows[x].cells[y].innerText = stone;
    }
  }
  return true;
}
