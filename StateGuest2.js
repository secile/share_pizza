import Guest from "./Guest.js";

class StateGuest2 {
    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateGuest2 init");

        // Guest登場。
        console.log("this.Game.guestSum:", this.Game.guestSum, "this.Game.guestCount:", this.Game.guestCount);
        const count = this.Game.guestCount;
        let delay = 0;
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.makeGuest(), delay);
            delay += 200;
        }

        // 次のStateへ。
        setTimeout(() => this.Game.setState(this.Game.StateGame), delay + 1000);
    }

    makeGuest() {
        const centerX = this.Game.canvas.width / 2;
        const centerY = this.Game.canvas.height / 2;
        const thete = Math.random() * Math.PI * 2; // 0-2pi
        // 画面外で円周上の座標。
        const posX = Math.cos(thete) * centerX;
        const posY = Math.sin(thete) * centerY;
        // 少し内側。
        const destX = posX * this.getRandom(0.5, 0.9);
        const destY = posY * this.getRandom(0.5, 0.9);

        const sp = new Guest(this.Game);
        sp.setKind(this.Game.SpriteKind.Guest);
        sp.setPos(centerX + posX, centerY + posY);
        sp.setDest(centerX + destX, centerY + destY);
        this.Game.addSprite(sp);
    }
    getRandom(min, max) {
        return min + Math.random() * (max-min) ;
    }

    loop() {

    }

    exit() {
        console.log("StateGuest2 exit");
    }
}

export default StateGuest2;