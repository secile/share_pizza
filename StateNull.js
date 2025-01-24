// 空っぽのState。
// StateとはGameなどの状態を表すクラス。
// 必ずinit(), loop(), exit()関数を持つ。これらの関数は特定のタイミングで呼ばれる。
// init()は初回に一度だけ実行される。
// loop()は繰り返し実行される。
// exit()は他のStateに遷移する前に1度だけ実行される。
class StateNull {
    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateNull init");
    }

    loop() {

    }

    exit() {
        console.log("StateNull exit");
    }
}

export default StateNull;