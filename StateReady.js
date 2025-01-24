class StateReady {

    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateReady init");

        this.pizza = this.Game.getSprite(this.Game.SpriteKind.Pizza);
        this.pie = this.Game.getSprite(this.Game.SpriteKind.Pie);
    }

    loop() {
        // guestの初期化はStateGuestで実施。

        // pizzaの初期化。
        this.pizza.setAngle(0, 2 * Math.PI);
        this.pizza.visible = true;
        this.pizza.distance = 0;

        // pieの初期化。
        this.pie.setAngle(0, Math.PI / 6);
        this.pie.visible = true;
        this.pie.distance = 0;

        this.Game.setState(this.Game.StateGuest1);
    }

    exit() {
        console.log("StateReady exit");
    }
}

export default StateReady;