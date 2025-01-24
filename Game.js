import Controller from "./Controller.js";
import Language from "./Language.js";
import Text from "./Text.js";
import StateNull from "./StateNull.js";
import StateInit from "./StateInit.js";
import StateTitle from "./StateTitle.js";
import StateConfig from "./StateConfig.js";
import StateGuest1 from "./StateGuest1.js";
import StateGuest2 from "./StateGuest2.js";
import StateReady from "./StateReady.js";
import StateGame from "./StateGame.js";
import StateJudge from "./StateJudge.js";
import StateJudge2 from "./StateJudge2.js";
import StateResult from "./StateResult.js";
import StateQuit from "./StateQuit.js";

// Gameクラスの定義
class Game {

    // SpriteKindの定義。
    // Symbol()は、他と値が重複しない値を生成する。
    SpriteKind = Object.freeze({
        Text : 0,
        Score : 1,
        Debug : 2,
        Pizza : 3,
        Pie   : 4,
        MiniP : 5,
        Guest : 6,
        Gomibako : 7,
        Piece : 100,
    });

    // canvasとcontextを受け取って初期化
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.controller = new Controller();

        this.lang = new Language();
        
        // Sprite。
        // debug用スプライトを作成。debug()で出力する。
        this.dbg = new Text(this);
        this.dbg.setKind(this.SpriteKind.Debug);
        this.dbg.textAlign = 'left';
        this.dbg.textBaseline = 'alphabetic';
        this.dbg.fontFillStyle = 'Black';
        this.dbg.posX = 0;
        this.dbg.posY = canvas.height;
        this.dbg.fontSize = 20;
    
        this.score = new Text(this);
        this.score.setKind(this.SpriteKind.Score);
        this.score.textAlign = 'center';
        this.score.textBaseline = 'hanging';
        this.score.fontFillStyle = 'BlueViolet';
        this.score.posX = canvas.width / 2;
        this.score.posY = canvas.height / 20;
        this.score.fontSize = canvas.width / 30;

        // スコアとハイスコア。
        this.scoreValue = 0;
        this.hiscore = []; // 空の配列。
        // ハイスコアのデバッグ用。
        /*this.addScore(100);
        this.getRank();
        this.addScore(100);
        this.getRank();
        this.addScore(100);
        this.getRank();
        this.addScore(-100);
        this.getRank();*/

        // Spriteリスト。
        this.Sprites = [this.dbg, this.score];

        // State。
        this.StateNull = new StateNull(this);
        this.StateInit = new StateInit(this);
        this.StateTitle = new StateTitle(this);
        this.StateConfig = new StateConfig(this);
        this.StateGuest1 = new StateGuest1(this);
        this.StateGuest2 = new StateGuest2(this);
        this.StateReady = new StateReady(this);
        this.StateGame = new StateGame(this);
        this.StateJudge = new StateJudge(this);
        this.StateJudge2 = new StateJudge2(this);
        this.StateResult = new StateResult(this);
        this.StateQuit = new StateQuit(this);
        // 初期State。
        this.CurrState = this.StateNull;
        this.NextState = this.StateInit;
    }

    // kindからスプライトを取得する。
    getSprite(kind) {
        for(let item of this.Sprites) {
            if (item.spriteKind == kind) return item;
        }
        throw new Error("getSprite error: do not found sprite.");
    }

    getSpriteAll(kind) {
        return this.Sprites.filter(x => x.spriteKind == kind);
    }

    // Spriteを追加する。(末尾に)
    addSprite(sprite) {
        this.Sprites.push(sprite);
    }
    // Spriteを追加する。(先頭に)
    addSpriteHead(sprite) {
        this.Sprites.unshift(sprite);
    }

    // kindが一致するSpriteを全て削除する。
    removeSpriteAll(kind) {
        this.Sprites = this.Sprites.filter(x => x.spriteKind != kind);
    }

    // Spriteを削除する。
    removeSprite(sprite) {
        this.Sprites = this.Sprites.filter(x => x != sprite);
    }

    // Stateを遷移させる。
    setState(state) {
        this.NextState = state;
    }

    // 多言語に対応したテキストを取得する。
    getText(kind, ...args) {
        return this.lang.getText(kind, args);
    }
    setRegion(region) {
        this.lang.setRegion(region);
    }

    // デバッグ情報を出力。
    debug(text) {
        this.dbg.setText(text);
    }

    // スコアを表示。
    addScore(value) {
        this.scoreValue += value;
        this.score.setText(`Score: ${this.scoreValue}`);
    }
    getScore() {
        return this.scoreValue;
    }

    // スコアをハイスコアリストに追加し、ランクを取得。
    getRank() {
        const score = this.scoreValue;
        let rank = 1;
        for (let i = 0; i < this.hiscore.length; i++) {
            if (this.hiscore[i] <= score) break;
            rank++;
        }

        this.hiscore.push(score);           // 今回の得点を追加。
        this.hiscore.sort((a, b) => b - a); // ハイスコア順にソート。
        //console.log(`score:${score}, rank:${rank}.`);
        //console.log(this.hiscore);

        return rank;
    }

    // ゲーム画面の表示メソッド
    draw() {
        this.drawBackScreen();

        // スプライトを描画。
        for(let item of this.Sprites) {
            if (item.visible) {
                item.draw();
            }
        }
    }

    // 背景を描画。
    drawBackScreen() {
        // キャンバスをクリアしてから描画を開始
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 図形描画に関連する設定
        this.context.save();
        this.canvas.style.backgroundColor = "Azure";
        this.context.lineWidth = 10;
        this.context.lineJoin = "round";
        this.context.strokeStyle = "#e0e1dd";

        // 中心の四角形を描画
        /*const rectWidth = canvas.width * 4 / 6;
        const rectHeight = canvas.height * 4 / 6;
        const rectX = canvas.width / 6;
        const rectY = canvas.height / 6;
        this.context.strokeRect(rectX, rectY, rectWidth, rectHeight);*/
        this.context.restore();
    }

    update() {
        // State変更。
        if (this.NextState != null) {
            this.CurrState.exit();
            this.CurrState = this.NextState;
            this.NextState = null;
            this.CurrState.init();
        }
        this.CurrState.loop();

        // スプライトを更新。
        for(let item of this.Sprites) {
            if (!item.lock) {
                item.update();
            }
        }

        // destroyなスプライトは削除。
        // layerでソート。0ほど下に表示される。
        this.Sprites = this.Sprites.filter(x => !x.destroy).sort((a, b) => a.layer - b.layer);
    }
}

export default Game;