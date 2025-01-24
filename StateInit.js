import Text from "./Text.js";
import Pizza from "./Pizza.js";

// 起動時、一度だけ実行される。
// ゲームの初期化を行う。
class StateInit {
    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateInit init")

        this.Game.debug("Hello, World.");

        const pizza = new Pizza(this.Game);
        pizza.setKind(this.Game.SpriteKind.Pizza);
        pizza.visible = false;
        pizza.noBorder = true;
        pizza.lock = true;
        this.Game.addSprite(pizza);
        
        const pie = new Pizza(this.Game);
        pie.setKind(this.Game.SpriteKind.Pie);
        pie.visible = false;
        pie.lock = true;
        this.Game.addSprite(pie);

        const text = new Text(this.Game);
        text.setKind(this.Game.SpriteKind.Text);
        text.textAlign = 'center';
        text.textBaseline = 'middle';
        text.fontFillStyle = 'rgb(127, 217, 35)';
        text.posX = this.Game.canvas.width / 2;
        text.posY = this.Game.canvas.height / 5;
        this.Game.addSprite(text);
    }

    loop() {
        //console.log("StateInit loop")
        this.Game.setState(this.Game.StateTitle);
    }

    exit() {
        console.log("StateInit exit")
    }
}

export default StateInit;