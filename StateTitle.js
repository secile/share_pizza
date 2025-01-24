import Text from "./Text.js";

class StateTitle {

    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateTitle init");

        // 変数の初期化。
        this.Game.stageNo = 0; // 初期値0。StateReadyで増加。
        this.Game.guestSum = 0;   // きたguestの合計。
        this.Game.guestCount = 0; // くるguestの数。

        this.Game.pieceCount = 0;
        this.Game.scoreValue = 0;
        this.Game.addScore(0); // スコアの初期表示。

        this.text = new Text(this.Game);
        this.text.textAlign = 'center';
        this.text.textBaseline = 'middle';
        this.text.fontFillStyle = 'LightSalmon';
        this.text.posX = this.Game.canvas.width / 2;
        this.text.posY = this.Game.canvas.height / 3;
        this.text.setText(this.Game.getText(this.Game.lang.TextKind.Title)); // Share Pizza🍕 with You.
        this.Game.addSprite(this.text);

        this.next = new Text(this.Game);
        this.next.textAlign = 'center';
        this.next.textBaseline = 'middle';
        this.next.fontFillStyle = 'Turquoise';
        this.next.posX = this.Game.canvas.width / 2;
        this.next.posY = this.Game.canvas.height / 1.5;
        this.next.setText(this.Game.getText(this.Game.lang.TextKind.ClickHere)); // クリックで開始
        this.Game.addSprite(this.next);

        this.conf = new Text(this.Game);
        this.conf.textAlign = 'center';
        this.conf.textBaseline = 'middle';
        this.conf.fontFillStyle = 'Turquoise';
        this.conf.posX = this.Game.canvas.width *0.95;
        this.conf.posY = this.Game.canvas.height*0.975;
        this.conf.fontSize *= 0.5;
        this.conf.setText('⚙️Abc');
        this.Game.addSprite(this.conf);

        // はじめ隠して時間差で表示する。(クリックされてしまう対策。)
        this.next.visible = false;
        setTimeout(() => this.next.visible = true, 1000);
    }

    loop() {
        // Textクリックでゲーム開始。
        if (this.next.isClicked()) {
            this.Game.setState(this.Game.StateReady);
        }
        if (this.conf.isClicked()) {
            this.Game.setState(this.Game.StateConfig);
        }
    }
    
    exit() {
        console.log("StateTitle exit");

        this.Game.removeSprite(this.text);
        this.Game.removeSprite(this.next);
        this.Game.removeSprite(this.conf);
    }
}

export default StateTitle;