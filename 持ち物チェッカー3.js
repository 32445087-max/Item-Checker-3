function addCheckbox() {
  const itemName = prompt("追加する項目名を入力してください");
  if (!itemName) return;

  const wrapper = document.createElement("div");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", saveData); 

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" " + itemName));

  const delBtn = document.createElement("button");
  delBtn.textContent = "削除";
  delBtn.onclick = function () {
    wrapper.remove();
    saveData(); // 削除後も保存
  };

  wrapper.appendChild(label);
  wrapper.appendChild(delBtn);

  const area = document.getElementById("main-core");
  area.appendChild(wrapper);

  saveData(); // 追加直後にも保存
//   ただ、saveData関数を実行しているだけ。Pythonと同じ。
}

// --- リセット ---
function reset(){
    // チェックボックスを全て取得する
    const checkboxes = document.querySelectorAll("#main-core input[type=checkbox]");
    // const checkboxes = document.querySelectorAll("#main-core input['type=checkbox']");
    for (let i=0;i < checkboxes.length;i ++){
    // 繰り返し処理で、チェックボックスを全て選ぶ
    const checkbox = checkboxes[i];
    // 繰り返し処理で、チェックボックスのチェックを全て外す
    checkbox.checked = false;
    }
    saveData();
}

// --- 保存処理 ---
function saveData(){
    // リストを作る
    items = [];
    // すべてのwrapperを取得する

    const wrappers = document.querySelectorAll("#main-core div");
    // 繰り返し処理を書く
    for (let i=0;i < wrappers.length;i ++){
        const wrapper = wrappers[i];
        // チェックボックスの状態を取得する
        const checkbox = wrapper.querySelector("input[type=checkbox]");
        const name = wrapper.querySelector("label");
        
        items.push({name:name.textContent.trim(),checked:checkbox.checked});

        
    }
    

    // localStorageを使う。
    localStorage.setItem("checkboxData",JSON.stringify(items));
}



//   localStorageは、ブラウザにデータを永続的に保存できるオブジェクト。
// 　setItemは、localStorageにデータを保存するための関数。
// 　setItemは、項目をセットする。つまり保存するという意味。
// localStorage.setItem(キー名, 値);
// 指定したキーに値（文字列）を保存します。同じキーがすでにある場合は、上書きされます。
//  checkboxDataは、定義はしておらず、checkboxDataという名前でデータ保存しているだけ。
// stringifyは、JSONオブジェクトの中にある関数。だからstringifyの前にJSONが書いてある。
// stringifyは、オブジェクトや配列を文字列に変換する関数。
// オブジェクトとは、Pythonでいう辞書とほぼ同義。



// --- 復元処理 ---
function loadData() {
  const data = localStorage.getItem("checkboxData");
//   このコードは、localStorageから、キー名 "checkboxData" に保存されているデータを取り出している。
// 　getItemは、localStorageのデータを取得する関数
  if (!data) return; 
// !dataは、「dataが存在しないならtrue」という意味。
// つまり、dataがない場合にreturnで処理を中断している。
  const items = JSON.parse(data);
//   JSON.parse()は、文字列になっているJSONデータを元の配列やオブジェクトに戻す関数。
// 　引数に保存したファイル名を入れてはいけない理由　→
// ファイル名は文字列の入れ物ではなく場所の情報だから、そこを渡しても中身を変換できない。

    const area = document.getElementById("main-core");
    area.innerHTML = "";
//  innerHTMLは、要素の中身のHTML全体（タグを含む内容）を取得・変更できるプロパティ。
//  HTMLを削除している理由は、前回のデータを一度リセットしてから新しく表示するため。

 for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const wrapper = document.createElement("div");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.checked;
//   item.checked（保存データの状態）を、対応するcheckboxのcheckedプロパティに代入して、チェックのON/OFF状態を再現しています。

  checkbox.addEventListener("change", saveData);
//  addEventListenerは、指定したイベントが起きたときに、指定した関数を実行させるための関数。DOM操作の関数
//  第一引数には、イベント名を入れる。例）chenge:値が変わる、click:クリックしたとき、input:文字を入力した時　など
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" " + item.name));

  const delBtn = document.createElement("button");
  delBtn.textContent = "削除";
  delBtn.onclick = function () {
    wrapper.remove();
    saveData();


}
  wrapper.appendChild(label);
  wrapper.appendChild(delBtn);
  area.appendChild(wrapper);

}
}
// ページを開いたときにデータを読み込む
window.onload = loadData;
