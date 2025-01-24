class StateQuit {
    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateQuit init");

        // Guestおうちにかえる。
        let delay = 0;

        const guests = this.Game.getSpriteAll(this.Game.SpriteKind.Guest);
        let guest_count = guests.length;
        for (let i = 0; i < guest_count; i++) {
            const item = guests[i];
            setTimeout(() => item.backHome(() => {
                // 到着したらスプライト消去。
                this.Game.removeSprite(item);

                // 最後の一人が消えたら
                guest_count--;
                if (guest_count == 0) this.Game.setState(this.Game.StateTitle);
            }), delay);
            delay += 10;
        }
    }

    loop() {

    }

    exit() {
        console.log("StateQuit exit");
    }
}

export default StateQuit;