import Text from "./Text.js";
import Gomibako from "./Gomibako.js";

class StateJudge2 {

    constructor(game) {
        this.Game = game;

        // 効果音。
        this.se_ok = new Audio('./Sound/決定ボタンを押す40.mp3');
        this.se_ng = new Audio('./Sound/決定ボタンを押す50.mp3');
        this.se_gomi = new Audio('./Sound/机をドンと叩く.mp3');
        this.se_clear = new Audio('./Sound/成功音.mp3');
        this.se_perfect = new Audio('./Sound/レベルアップ.mp3');
    }

    init() {
        console.log("StateJudge2 init");

        this.pizza = this.Game.getSprite(this.Game.SpriteKind.Pizza);
        this.pie = this.Game.getSprite(this.Game.SpriteKind.Pie);

        this.next = new Text(this.Game);
        this.next.textAlign = 'center';
        this.next.textBaseline = 'middle';
        this.next.fontFillStyle = 'Turquoise';
        this.next.posX = this.Game.canvas.width / 2;
        this.next.posY = this.Game.canvas.height / 1.5;
        this.next.setText(this.Game.getText(this.Game.lang.TextKind.ClickHere)); // クリックで次へ
        this.next.visible = false;
        this.Game.addSprite(this.next);

        this.ok_count = 0;
        this.ng_count = 0;

        // OK数。
        this.ok_score = new Text(this.Game);
        this.ok_score.textAlign = 'center';
        this.ok_score.textBaseline = 'middle';
        this.ok_score.fontFillStyle = 'LightBlue';
        this.ok_score.posX = this.Game.canvas.width / 4 * 1;
        this.ok_score.posY = this.Game.canvas.height / 3;
        this.ok_score.setText("👍:0pt");
        this.Game.addSprite(this.ok_score);

        // NG数。
        this.ng_score = new Text(this.Game);
        this.ng_score.textAlign = 'center';
        this.ng_score.textBaseline = 'middle';
        this.ng_score.fontFillStyle = 'LightPink';
        this.ng_score.posX = this.Game.canvas.width / 4 * 3;
        this.ng_score.posY = this.Game.canvas.height / 3;
        this.ng_score.setText("👎:0pt");
        this.Game.addSprite(this.ng_score);

        // Guestたち。
        const guests = this.Game.getSpriteAll(this.Game.SpriteKind.Guest);

        // カットしたピザの数とお客の数の多い方まで繰り返し。
        const count = Math.max(this.Game.pieceCount, this.Game.guestSum);
        let last_ok = true;
        let sp_gomi = null; // ゴミ箱を表示するまでnull。
        let delay = 1000;
        for (let i = 0; i < count; i++) {
            const is_ok = i < this.Game.pieceCount && i < this.Game.guestSum;
            delay += (last_ok && !is_ok)? 1000: 100;
            last_ok = is_ok;

            setTimeout(() =>
            {
                // pieceがあれば消す。
                if (i < this.Game.pieceCount) {
                    let piece = this.Game.getSprite(this.Game.SpriteKind.Piece + i);
                    this.Game.removeSprite(piece);
                }

                // pieceの数までor人の数まではOK。それ以降はNG。
                if (is_ok) {
                    this.ok_count+=100;
                    this.Game.addScore(+100);
                    this.se_ok.currentTime = 0; this.se_ok.play();
                    guests[i].setFace(guests[i].GuestFace.Happy);
                } else {
                    this.ng_count-=100;
                    this.Game.addScore(-100);
                    
                    // 人がいる場合は泣き顔
                    if (i < guests.length) {
                        this.se_ng.currentTime = 0; this.se_ng.play();
                        guests[i].setFace(guests[i].GuestFace.Sad);
                    } else {
                        // ゴミ箱を表示してない場合は表示。
                        if (sp_gomi == null) {
                            sp_gomi = this.showGomibako();
                        }
                        this.se_gomi.currentTime = 0; this.se_gomi.play();
                        sp_gomi.disposeIt();
                    }
                }
                
                this.ok_score.setText(`👍: ${this.ok_count}pt`);
                this.ng_score.setText(`👎: ${this.ng_count}pt`);

            }, delay);
        }

        
        setTimeout(() =>
        {
            // ピタリ賞なら得点が倍。
            if (this.ng_count == 0) {
                this.text = this.Game.getSprite(this.Game.SpriteKind.Text);
                this.text.setText(this.Game.getText(this.Game.lang.TextKind.Perfect));
                this.se_ng.se_perfect = 0; this.se_perfect.play();

                this.Game.addScore(this.ok_count);
                this.ok_count*=2;
                this.ok_score.setText(`👍: ${this.ok_count}pt`);

                // 2秒後にClickHereボタン表示。
                setTimeout(() => this.next.visible = true, 2000);
            } else {
                // ピタリ賞でなければClickHereボタン表示。
                this.next.visible = true;
                this.se_clear.se_perfect = 0; this.se_clear.play();
            }
        }, delay + 2000);        
    }

    showGomibako() {
        const sp = new Gomibako(this.Game);
        sp.setKind(this.Game.SpriteKind.Gomibako);
        sp.setPos(this.Game.canvas.width*0.9, this.Game.canvas.height*0.95);
        this.Game.addSprite(sp);
        return sp;
    }

    loop() {
        // Textクリックで次へ。
        if (this.next.isClicked()) {
            this.Game.setState(this.Game.StateReady);
        }
    }

    exit() {
        console.log("StateJudge2 exit");
        this.Game.removeSprite(this.ok_score);
        this.Game.removeSprite(this.ng_score);
        this.Game.removeSprite(this.next);
        this.Game.removeSpriteAll(this.Game.SpriteKind.MiniP); // ピザを消す。
        this.Game.removeSpriteAll(this.Game.SpriteKind.Gomibako); // ゴミ箱を消す。

        const text = this.Game.getSprite(this.Game.SpriteKind.Text);
        text.fontSize = this.Game.getScreenLongSize() / 20;; // 戻す。
        text.setText("");

        // Guestの顔を変える。
        for(let item of this.Game.getSpriteAll(this.Game.SpriteKind.Guest)) {
            item.setState(item.GuestState.Wait);
            item.setFace(item.GuestFace.Normal);
        }
    }
}

export default StateJudge2;