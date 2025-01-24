// Message
class Text {

    constructor(game) {
        this.Game = game;
        this.canvas = game.canvas;
        this.context = game.context;
        this.controller = game.controller;

        // 共通。
        this.lock = false;    // trueでupdate呼び出す。
        this.visible = true;  // falseで描画しない。
        this.destroy = false; // trueになると破棄される。
        this.layer = 10;      // 0ほど下に表示される。
        
        // 座標。
        this.posX = 0;
        this.posY = 0;
        this.width = 0;
        this.height = 0;
        this.hotRect = { x: 0, y: 0, width: 0, height: 0 };

        // 表示。
        this.Text = "";
        this.fontName = `Candara`;
        this.fontSize = this.canvas.width / 20;
        this.fontFillStyle = "white";
        this.fontStrokeStyle = "black";
        this.textAlign = 'start';
        this.textBaseline = 'alphabetic';
        // 角丸の描画。
        this.buttonStyle = false;
        this.backFillStyle = "MistyRose";
        this.backStrokeStyle = "black";
    }

    setKind(kind) {
        this.spriteKind = kind;
    }

    // スプライト内でクリックされていたらtrue。
    isClicked() {
        if (!this.visible) return false;
        return this.controller.isMouseClicked(this.hotRect);
    }

    // 文字をセットする。
    // この関数は、font, textAlign, textBaselineを設定後に呼び出す必要がある。(hotRectを正しく設定できない)
    setText(text) {
        this.Text = text;

        // 描画サイズを取得する。
        this.context.save();
        this.context.font = `${this.fontSize}px ${this.fontName}`;
        this.context.textAlign = this.textAlign;
        this.context.textBaseline = this.textBaseline;
        const metrics = this.context.measureText(text);
        this.context.restore();

        // hotRectに設定する。
        this.hotRect.x = this.posX - Math.abs(metrics.actualBoundingBoxLeft); // Chromeではプラス、Firefoxではマイナスの値になるためabs。
        this.hotRect.y = this.posY - metrics.actualBoundingBoxAscent;
        this.hotRect.width = metrics.width;
        this.hotRect.height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        this.width = this.hotRect.width;
        this.height = this.hotRect.height;
    }

    draw() {
        this.context.save();

        this.context.lineWidth = 4;
        //this.context.lineJoin = "round";
        //this.context.lineCap = "round";

        // 角丸を描画。
        if (this.buttonStyle) {
            this.context.fillStyle = this.backFillStyle;
            this.context.strokeStyle = this.backStrokeStyle;
            this.roundedRect(this.posX, this.posY, this.width*1.25, this.height*1.5, 10);
        }

        this.context.fillStyle = this.fontFillStyle;
        this.context.strokeStyle = this.fontStrokeStyle;

        // 中心を移動。
        this.context.translate(this.posX, this.posY);

        // テキストを描画。
        this.context.font = `${this.fontSize}px ${this.fontName}`;
        this.context.textAlign = this.textAlign;
        this.context.textBaseline = this.textBaseline;
        this.context.fillText(this.Text, 0, 0);
        this.context.restore();
    }

    roundedRect(center_x, center_y, width, height, radius) {
        const x = center_x - width / 2;
        const y = center_y - height / 2;
        this.context.save();
        this.context.beginPath();
        this.context.moveTo(x, y + radius);
        this.context.arcTo(x, y + height, x + radius, y + height, radius);
        this.context.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        this.context.arcTo(x + width, y, x + width - radius, y, radius);
        this.context.arcTo(x, y, x, y + radius, radius);
        this.context.stroke(); // 枠線を描画。
        this.context.fill(); // 塗りつぶす。
        this.context.restore();
      }

    update() {

    }

}

export default Text;