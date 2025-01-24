// Controllerクラスの定義
class Controller {
    // 初期化
    constructor() {
        this.installKeyEvent();

        this.installMouseEvent();
    }

    // キーイベントを処理する。
    installKeyEvent() {
        this.ArrowRight = false;
        this.ArrowLeft = false;
        this.Shift = false;
        this.Space = false;
        
        window.addEventListener('keydown', e => {
            console.log("keydown:" + e.key)
            switch(e.key) {
                case 'ArrowRight':
                    this.ArrowRight = true;
                    break;

                case 'ArrowLeft':
                    this.ArrowLeft = true;
                    break;

                case ' ':
                    this.Space = true;
                    break;
            }
            this.Shift = e.shiftKey;
        })

        window.addEventListener('keyup', (e) => {
            //console.log("keyup:" + e.key)
            switch(e.key) {
                case 'ArrowRight':
                    this.ArrowRight = false;
                    break;

                case 'ArrowLeft':
                    this.ArrowLeft = false;
                    break;

                case ' ':
                    this.Space = false;
                    break;
            }
            this.Shift = e.shiftKey;
        })
    }

    // mousemove, mousedown, mouseupイベントのインストール。
    installMouseEvent() {
        this.mouse = { x: 0, y: 0 };
        this.mouse.x = 0;
        this.mouse.y = 0;
        this.mousedown = false;

        window.addEventListener('pointermove', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            console.log(e.offsetX, e.offsetY);
        })

        window.addEventListener('pointerdown', e => {
            this.mousedown = true;
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        })

        window.addEventListener('pointerup', () => {
            this.mousedown = false;
        })
    }

    // マウスは範囲内でクリックされたらtrue。
    isMouseClicked(hotRect) {
        return this.mousedown && this.isMouseHover(hotRect);
    }

    // マウスは範囲内ならtrue。
    isMouseHover(hotRect) {
        return (hotRect.x < this.mouse.x && this.mouse.x < hotRect.x + hotRect.width && hotRect.y < this.mouse.y && this.mouse.y < hotRect.y + hotRect.height);
    }
}

export default Controller;