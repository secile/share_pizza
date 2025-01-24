import Text from "./Text.js";

class StateResult {
    constructor(game) {
        this.Game = game;

        // 効果音。
        this.se_tata = new Audio('./Sound/ラッパのファンファーレ.mp3');
    }

    init() {
        console.log("StateResult init");
        this.text = this.Game.getSprite(this.Game.SpriteKind.Text);
        this.text.setText(this.Game.getText(this.Game.lang.TextKind.Result));

        this.msg1 = new Text(this.Game);
        this.msg1.textAlign = 'center';
        this.msg1.textBaseline = 'middle';
        this.msg1.fontFillStyle = 'Violet';
        this.msg1.posX = this.Game.canvas.width / 2;
        this.msg1.posY = this.Game.canvas.height / 2.5;
        this.msg1.setText(this.Game.getText(this.Game.lang.TextKind.YourScore, this.Game.getScore())); // あなたのスコアは${this.Game.getScore()}点です！
        this.msg1.visible = false;
        this.Game.addSprite(this.msg1);
        setTimeout(() => this.msg1.visible = true, 2000);

        this.msg2 = new Text(this.Game);
        this.msg2.textAlign = 'center';
        this.msg2.textBaseline = 'middle';
        this.msg2.fontFillStyle = 'Violet';
        this.msg2.posX = this.Game.canvas.width / 2;
        this.msg2.posY = this.Game.canvas.height / 2;
        this.msg2.setText(this.Game.getText(this.Game.lang.TextKind.YourRank, this.Game.getRank())); // 本日の🏆第${this.Game.getRank()}位です。
        this.msg2.visible = false;
        this.Game.addSprite(this.msg2);
        setTimeout(() => this.msg2.visible = true, 2000);

        this.next = new Text(this.Game);
        this.next.textAlign = 'center';
        this.next.textBaseline = 'middle';
        this.next.fontFillStyle = 'Turquoise';
        this.next.posX = this.Game.canvas.width / 2;
        this.next.posY = this.Game.canvas.height / 1.5;
        this.next.setText(this.Game.getText(this.Game.lang.TextKind.ClickHere));
        this.next.visible = false;
        this.Game.addSprite(this.next);
        setTimeout(() => this.next.visible = true, 4000);

        // 効果音再生。
        this.se_tata.currentTime = 0; this.se_tata.play();
    }

    loop() {
        // Textクリックで次へ。
        if (this.next.isClicked()) {
            this.Game.setState(this.Game.StateQuit);
        }
    }

    exit() {
        console.log("StateResult exit");

        this.text.setText(``);
        this.Game.removeSprite(this.msg1);
        this.Game.removeSprite(this.msg2);
        this.Game.removeSprite(this.next);
    }
}

export default StateResult;