import MiniP from "./MiniP.js";

// Gomibako
class Gomibako {

    constructor(game) {
        this.Game = game;
        this.canvas = game.canvas;
        this.context = game.context;
        this.controller = game.controller;

        // 共通。
        this.lock = false;    // trueでupdate呼び出す。
        this.visible = true;  // falseで描画しない。
        this.destroy = false; // trueになると破棄される。
        this.layer = 0;       // 0ほど下に表示される。

        // 座標。
        this.posX = this.canvas.width / 2;
        this.posY = this.canvas.height / 2;
        this.width = this.canvas.width / 8;
        this.height = this.canvas.width / 8;
        this.hotRect = { x: 0, y: 0, width: 0, height: 0 };

        // 表示。
        this.fontName = `Candara`;
        this.fontSize = this.canvas.width / 20;
        this.fontFillStyle = "white";
        this.fontStrokeStyle = "black";
        this.textAlign = 'start';
        this.textBaseline = 'alphabetic';

        this.Text = "🗑️";
        this.disposing = false;
        this.timer = 0;
    }

    setKind(kind) {
        this.spriteKind = kind;
    }

    draw() {
        this.context.save();
        this.context.fillStyle = this.fontFillStyle;
        this.context.strokeStyle = this.fontStrokeStyle;
        this.context.lineWidth = 4;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";

        // 中心を移動。
        this.context.translate(this.posX, this.posY);

        // テキストを描画。
        this.context.font = `${this.fontSize}px ${this.fontName}`;
        this.context.textAlign = this.textAlign;
        this.context.textBaseline = this.textBaseline;
        this.context.fillText(this.Text, 0, 0);
        this.context.restore();
    }

    setPos(x, y) {
        this.posX = x;
        this.posY = y;
    }

    disposeIt() {
        this.disposing = true;
        this.disposePizza();
    }
    disposePizza() {
        const sp = new MiniP(this.Game);
        sp.setKind(this.Game.SpriteKind.MiniP);
        sp.setPos(this.posX+this.fontSize/3, this.posY-this.fontSize*3);
        this.Game.addSprite(sp);

        sp.disposeIt();
    }

    update() {
        if (this.disposing) {
            if (this.timer == 4) {
                this.posX -= this.width / 32;
            }
            if (this.timer++ > 8) {
                this.disposing = false;
                this.timer = 0;
                this.posX += this.width / 32;
            }
        }
    }
}

export default Gomibako;