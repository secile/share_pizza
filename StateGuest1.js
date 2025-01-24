class StateGuest1 {
    constructor(game) {
        this.Game = game;
    }

    init() {
        console.log("StateGuest1 init");

        // 効果音。
        this.se_chime = new Audio('./Sound/ドアチャイム1.mp3');

        // Guestの数を決定。
        this.Game.stageNo++;
        let guest_sum = 0;
        switch(this.Game.stageNo) {
            case 1:
                guest_sum = this.getRandomInt(3, 7); // 3-7。ふつう
                break;
            case 2:
                guest_sum = this.getRandomInt(8, 12); // 8-12。少し多い？
                break;
            case 3:
                guest_sum = this.getRandomInt(15, 21); // 15-21。多いな。
                break;
            case 4:
                guest_sum = this.getRandomInt(30, 50); // 30-50。多いやろ！
                break;
            case 5:
                guest_sum = this.getRandomInt(80, 100); // 80-100。多すぎぃ！
                break;
            default:
                this.Game.setState(this.Game.StateResult);
                return;
        }

        this.Game.guestCount = guest_sum - this.Game.guestSum;
        this.Game.guestSum = guest_sum;

        // ドアチャイムを鳴らす。
        this.se_chime.play();

        // 次のStateへ。
        setTimeout(() => this.Game.setState(this.Game.StateGuest2), 1000);
    }

    getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (max-min)) ;
    }

    loop() {

    }

    exit() {
        console.log("StateGuest1 exit");
    }
}

export default StateGuest1;