import MiniP from "./MiniP.js";

// Guest
class Guest {

    GuestState = Object.freeze({
        Wait : 0,
        Cut : 1,
        Move : 2,
    });

    GuestFace = Object.freeze({
        Normal : 0,
        Cut : 1,
        Happy : 2,
        Sad : 3,
    });

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

        // 移動。
        this.State = this.GuestState.Wait;
        this.Timer = 0;
        this.pinX = this.posX;  // Wait時このまわりをうろうろ
        this.pinY = this.posY;  // Wait時このまわりをうろうろ
        this.deltaX = 0; // 移動量。
        this.deltaY = 0; // 移動量。

        this.NormalFaces = ['🙂', '😎', '🙄', '🤤', '😋', '😏', '😐', '🤗', '😊', '😗', '🤠', '😀', '😑', '🙃', '🤔'];
        this.SadFaces = ['😨', '😰', '😱', '😭'];
        this.NormalFaceIdx = this.getRandomInt(0, this.NormalFaces.length);
        this.setFace(this.GuestFace.Normal);
    }

    setKind(kind) {
        this.spriteKind = kind;
    
    }
    setState(kind) {
        this.State = kind;
    }

    setFace(kind) {
        switch(kind) {
            case this.GuestFace.Cut:
                this.Text = "🥺";
                break;
            case this.GuestFace.Happy:
                this.Text = "😍";
                this.eatPizza();
                break;
            case this.GuestFace.Sad:
                const idx1 = this.getRandomInt(0, this.SadFaces.length);
                this.Text = this.SadFaces[idx1];
                break;
            default:
                this.Text = this.NormalFaces[this.NormalFaceIdx];
                break;
        }
    }

    eatPizza() {
        const sp = new MiniP(this.Game);
        sp.setKind(this.Game.SpriteKind.MiniP);
        sp.setPos(this.posX-this.fontSize/5, this.posY-this.fontSize/5);
        this.Game.addSprite(sp);
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
        this.pinX = x
        this.pinY = y;
    }

    setDest(x, y) {
        this.startX = this.posX;
        this.startY = this.posY;
        this.destX = x;
        this.destY = y;
        this.pinX = x;
        this.pinY = y;
        this.State = this.GuestState.Move;
    }

    backHome(onCompleted) {
        this.moveCompleted = onCompleted;
        this.setDest(this.startX, this.startY);
    }

    update() {
        switch(this.State) {
            case this.GuestState.Wait:
                this.updateWait();
                break;

            case this.GuestState.Move:
                this.updateMove();
                break;
        }
        //console.log("posX:", this.posX, "destX:", this.destX);
    }

    updateWait() {
        if (this.Timer++ % 4 != 0) return; // 
        this.posX = this.pinX + this.getRandomInt(-2, 2);
        this.posY = this.pinY + this.getRandomInt(-2, 2);
    }

    updateMove() {
        // posXとposYは小数点以下になることがあるので範囲で比較。
        if (this.valueInRange(this.posX, this.destX, 2) && this.valueInRange(this.posY, this.destY, 2)) {
            this.State = this.GuestState.Wait;
            if (this.moveCompleted != null) this.moveCompleted();
            return;
        }

        this.deltaX = this.destX > this.posX? +1: this.destX < this.posX? -1: 0;
        this.deltaY = this.destY > this.posY? +1: this.destY < this.posY? -1: 0;

        this.posX += this.deltaX;
        this.posY += this.deltaY;
    }

    getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (max-min)) ;
    }

    valueInRange(val1, val2, range) {
        return val2 - range < val1 && val1 < val2 + range;
    }
}

export default Guest;