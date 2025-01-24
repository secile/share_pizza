// Pizza
class Pizza {

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
        this.width = game.getScreenLongSize() / 8;
        this.height = game.getScreenLongSize() / 8;
        this.hotRect = { x: this.posX-this.width, y: this.posY-this.height, width: this.width*2, height: this.height*2 };

        // 表示。
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.distance = 0;
        this.noBorder = false;
    }

    setKind(kind) {
        this.spriteKind = kind;
    }

    // 扇形の角度を返す。
    getAngle() {
        return this.endAngle - this.startAngle;
    }

    setAngle(startAngle, angle) {
        this.startAngle = startAngle;
        this.endAngle = startAngle + angle;
    }

    setEndAngle(angle) {
        angle = Math.min(Math.PI * 2, angle); // 最大2Pi以下。
        angle = Math.max(Math.PI/100, angle); // 最低200等分。
        this.endAngle = angle;
    }

    draw() {
        this.context.save();
        this.context.fillStyle = "rgb(249, 217, 35)";
        this.context.strokeStyle = "rgb(246, 107, 14)";
        this.context.lineWidth = 4;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";

        // 中心を移動。
        this.context.translate(this.posX, this.posY);

        if (this.distance > 0) {
            var centerAngle = this.startAngle + (this.getAngle() / 2);
            this.context.translate(Math.cos(centerAngle)*this.distance, Math.sin(centerAngle)*this.distance);
        }

        // パスを描画。
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.arc(0, 0, this.width, this.startAngle, this.endAngle);
        this.context.closePath();
        if (!this.noBorder) {
            this.context.stroke();
        }
        this.context.fill();
        this.context.restore();
    }

    update() {
        // hotRectの更新。
        this.hotRect = { x: this.posX-this.width, y: this.posY-this.height, width: this.width*2, height: this.height*2 };

        let angleStep = Math.PI / 500; // =0.0062;
        if (this.controller.Shift) angleStep *= 5; // Shift押しの場合は速度はやく。
        if (this.controller.ArrowRight) {
            const angle = this.endAngle + angleStep;
            this.setEndAngle(angle);
        }
        if (this.controller.ArrowLeft) {
            const angle = this.endAngle - angleStep;
            this.setEndAngle(angle);
        }
    }

    // startAngleを指定angleまで移動させる。
    cut(angle) {
        this.startAngle += angle;
    }
}

export default Pizza;