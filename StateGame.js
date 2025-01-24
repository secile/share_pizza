import Text from "./Text.js";

class StateGame {

    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateGame init");
        this.text = this.Game.getSprite(this.Game.SpriteKind.Text);
        this.text.fontSize = this.Game.getScreenShortSize() / 20; // ここだけ変える。あとで戻す。
        this.text.setText(this.Game.getText(this.Game.lang.TextKind.CutPizza, this.Game.guestSum)); // ピザ🍕を${this.Game.guestSum}個にカットしてください！

        this.mesg = new Text(this.Game);
        this.mesg.fontSize = this.Game.getScreenShortSize() / 25;
        this.mesg.textAlign = 'center';
        this.mesg.textBaseline = 'middle';
        this.mesg.fontFillStyle = 'Violet';
        this.mesg.posX = this.Game.canvas.width / 2;
        this.mesg.posY = this.Game.canvas.height / 1.25;
        this.mesg.setText(this.Game.getText(this.Game.lang.TextKind.CutGuide)); // ピザをマウスクリックでサイズを決めて、「カット」ボタンをおしてね。
        this.Game.addSprite(this.mesg);

        this.cbtn = new Text(this.Game);
        this.cbtn.fontSize = this.Game.getScreenLongSize() / 20;
        this.cbtn.textAlign = 'center';
        this.cbtn.textBaseline = 'middle';
        this.cbtn.fontFillStyle = 'Violet';
        this.cbtn.posX = this.Game.canvas.width / 2;
        this.cbtn.posY = this.Game.canvas.height / 1.1;
        this.cbtn.buttonStyle = true;
        this.cbtn.setText(this.Game.getText(this.Game.lang.TextKind.CutButton));
        this.Game.addSprite(this.cbtn);

        this.pizza = this.Game.getSprite(this.Game.SpriteKind.Pizza);
        this.pie = this.Game.getSprite(this.Game.SpriteKind.Pie);
        this.pie.lock = false;
    }

    loop() {
        // スペース押されたらカット。
        if (this.Game.controller.Space || this.cbtn.isClicked()) {
            this.Game.setState(this.Game.StateJudge);
        }

        // Pizzaの上でマウスクリックしたらサイズ変更。
        if (this.Game.controller.isMouseClicked(this.pizza.hotRect)) {
            const vx = this.Game.controller.mouse.x - this.pizza.posX;
            const vy = this.Game.controller.mouse.y - this.pizza.posY;
            let angle = Math.atan2(vy, vx);    // aten2は-π～+π。
            if (angle < 0) angle += 2*Math.PI; // 0～2πに変換。
            this.pie.setEndAngle(angle);
            console.log(angle);
        }
    }

    exit() {
        console.log("StateGame exit");
        
        this.Game.removeSprite(this.mesg);
        this.Game.removeSprite(this.cbtn);

        this.pie.lock = true;
        this.pie.visible = false;
    }
}

export default StateGame;