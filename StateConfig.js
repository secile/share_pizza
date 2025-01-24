import Text from "./Text.js";

class StateConfig {
    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateConfig init");

        this.text = new Text(this.Game);
        this.text.textAlign = 'center';
        this.text.textBaseline = 'middle';
        this.text.fontFillStyle = 'LightSalmon';
        this.text.posX = this.Game.canvas.width / 2;
        this.text.posY = this.Game.canvas.height / 3;
        this.text.setText("Language/言語");
        this.Game.addSprite(this.text);

        this.lang_en = new Text(this.Game);
        this.lang_en.textAlign = 'center';
        this.lang_en.textBaseline = 'middle';
        this.lang_en.fontFillStyle = 'Black';
        this.lang_en.posX = this.Game.canvas.width * (1/3);
        this.lang_en.posY = this.Game.canvas.height / 2;
        this.lang_en.setText('English');
        this.Game.addSprite(this.lang_en);

        this.lang_jp = new Text(this.Game);
        this.lang_jp.textAlign = 'center';
        this.lang_jp.textBaseline = 'middle';
        this.lang_jp.fontFillStyle = 'Black';
        this.lang_jp.posX = this.Game.canvas.width * (2/3);
        this.lang_jp.posY = this.Game.canvas.height / 2;
        this.lang_jp.setText('日本語');
        this.Game.addSprite(this.lang_jp);
    }

    loop() {
        if (this.lang_en.isClicked()) {
            this.Game.setRegion('en');
            this.Game.setState(this.Game.StateTitle);
        }
        if (this.lang_jp.isClicked()) {
            this.Game.setRegion('jp');
            this.Game.setState(this.Game.StateTitle);
        }
    }

    exit() {
        console.log("StateConfig exit");

        this.Game.removeSprite(this.text);
        this.Game.removeSprite(this.lang_en);
        this.Game.removeSprite(this.lang_jp);
    }
}

export default StateConfig;