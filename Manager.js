import Game from "./Game.js";

// Managerクラスの定義
class Manager {
    // canvasとcontextを受け取って初期化
    constructor(canvas, context) {
        this.game = new Game(canvas, context);
    }

    // 画面を描画。
    draw() {
        this.game.draw();
    }
    
    // 画面を更新。
    update() {
        this.game.update();
    }

}

export default Manager;