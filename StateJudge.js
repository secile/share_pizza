import Text from "./Text.js";
import Pizza from "./Pizza.js";

class StateJudge {

    constructor(game) {
        this.Game = game;

        // 効果音。
        this.se_cut = new Audio('./Sound/雪の上を歩く2s.mp3');
    }

    init() {
        console.log("StateJudge init");

        // Guestの顔を変える。
        for(let item of this.Game.getSpriteAll(this.Game.SpriteKind.Guest)) {
            item.setState(item.GuestState.Cut);
            item.setFace(item.GuestFace.Cut);
        }

        this.pizza = this.Game.getSprite(this.Game.SpriteKind.Pizza);
        this.pie = this.Game.getSprite(this.Game.SpriteKind.Pie);

        // カットしたピザのカウント表示用。
        this.pz_count = new Text(this.Game);
        this.pz_count.textAlign = 'center';
        this.pz_count.textBaseline = 'middle';
        this.pz_count.fontFillStyle = 'Black';
        this.pz_count.posX = this.Game.canvas.width / 2;
        this.pz_count.posY = this.Game.canvas.height / 2;
        this.Game.addSprite(this.pz_count);

        var count = 2 * Math.PI / this.pie.getAngle();
        count = Math.ceil(count); // 切り上げする。
        
        let delay = 1000;
        // ピザをカットして広げる。
        for (let i = 0; i < count-1; i++) {
            delay += 250;
            setTimeout(() =>
            {
                // https://qiita.com/nyojs/items/53b76307d28ef5f5d960
                // setTimeoutの中で'Cannot read properties of undefined'が出る場合。
                // setTimeout内では、関数の呼び出し元がグローバルオブジェクトになるので、thisを確定させる必要があります。
                // これだとエラーになる。
                // setTimeout(function () { this.pizza.cut(this.pie.Angle); }, 1000);
                // アローを使うとOK。アローはthisを束縛する、らしい。
                // setTimeout(() => this.pizza.cut(this.pie.Angle), 1000);

                this.pz_count.setText(1 + i);

                // 新しいピザを広げて置く。
                var angle = this.pie.getAngle();
                var piece = new Pizza(this.Game);
                piece.setKind(this.Game.SpriteKind.Piece + i);
                piece.setAngle(this.pizza.startAngle, angle);
                piece.distance = 20;
                piece.noBorder = true;
                piece.lock = true;
                this.Game.addSpriteHead(piece); // 文字を隠さないように先頭に追加。

                // ピザをカットする。
                this.pizza.cut(angle);

                // 効果音。
                this.se_cut.currentTime = 0; // これがないと連続再生できない。
                this.se_cut.play();
            }, delay);
        }

        // 最後に残ったピザを動かす。
        setTimeout(() =>
        {
            // ピザを隠して
            this.pz_count.setText(count);
            this.pizza.visible = false;

            // 新しいピザを代わりに置く。
            var angle = this.pizza.getAngle();
            var piece = new Pizza(this.Game);
            piece.setKind(this.Game.SpriteKind.Piece + count-1);
            piece.setAngle(this.pizza.startAngle, angle);
            piece.distance = 20;
            piece.noBorder = true;
            piece.lock = true;

            // 効果音。
            this.se_cut.currentTime = 0; // これがないと連続再生できない。
            this.se_cut.play();

            this.Game.addSprite(piece);
        }, delay + 500);

        // 次のStateへ。
        setTimeout(() =>
        {
            this.Game.pieceCount = count;
            this.Game.setState(this.Game.StateJudge2);
        }, delay + 1000);
    }

    loop() {

    }

    exit() {
        console.log("StateJudge exit");
        this.Game.removeSprite(this.pz_count);
    }
}

export default StateJudge;