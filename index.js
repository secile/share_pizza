import Manager from "./Manager.js";

let manager;

// 初期化。
function init() {
    // javascriptの描画方法。
    // 描画するにはcanvasを使う。canvasそのものに描画する機能は無く、canvasからcontextを取得して、そこに描画する。

    // canvas取得。
    let canvas = document.querySelector('#canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("width:", canvas.width, "height:", canvas.height)

    // context取得。
    let context = canvas.getContext('2d');

    // manager作成。
    manager = new Manager(canvas, context);
}

// ゲーム1フレームを更新。
function updateFrame() {
    manager.update();
    manager.draw();
    requestAnimationFrame(updateFrame);
}

// suppress context menu.
document.oncontextmenu = () => false;

// ウィンドウのリサイズ時に再初期化。
window.addEventListener('resize', () => {
    //リサイズするだけでゲームがリセットしてしまうのでコメントアウト。
    //init();
})

// 初期化。
init();

// アニメーションの開始。
requestAnimationFrame(updateFrame);