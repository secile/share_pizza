class Language {
    TextKind = Object.freeze({
        Title : 0,
        ClickHere : 1,
        CutPizza : 2,
        CutGuide : 3,
        CutButton : 4,
        Perfect : 5,
        Result : 6,
        YourScore : 7,
        YourRank : 8,
    });

    constructor() {
        this.Region = 'jp';
    }
    setRegion(region) {
        this.Region = region;
    }

    getText(kind, ...args) {
        switch(this.Region) {
            case 'jp': return this.getText_jp(kind, args);
            default : return this.getText_en(kind, args);
        }
    }

    getText_en(kind, ...args) {
        switch(kind) {
            case this.TextKind.Title: return "Share Pizza🍕 with You.";
            case this.TextKind.ClickHere: return "Click Here.";
            case this.TextKind.CutPizza: return `Cut the Pizza🍕 into ${args[0]} pieces!`;
            case this.TextKind.CutGuide: return "resize the pizza, and push 'CUT' button.";
            case this.TextKind.CutButton: return "✂️ CUT ✂️";
            case this.TextKind.Perfect: return "✨Perfect✨";
            case this.TextKind.Result: return "🎉Final Result🎉";
            case this.TextKind.YourScore: return `Your score is ${args[0]} points!`;
            case this.TextKind.YourRank: return `Your ranking today is ${args[0]}${this.rank_suffix(args[0])}.`;
            default: return "NO TEXT";
        }
    }

    getText_jp(kind, ...args) {
        switch(kind) {
            case this.TextKind.Title: return "あなたと ピザ🍕を";
            case this.TextKind.ClickHere: return "クリックで次へ";
            case this.TextKind.CutPizza: return `ピザ🍕を${args[0]}個にカットしてください！`;
            case this.TextKind.CutGuide: return "ピザのサイズを決めてカットボタンをおしてね。";
            case this.TextKind.CutButton: return "✂️ カット ✂️";
            case this.TextKind.Perfect: return "✨Perfect✨";
            case this.TextKind.Result: return "🎉結果発表🎉";
            case this.TextKind.YourScore: return `あなたのスコアは${args[0]}点です！`;
            case this.TextKind.YourRank: return `本日の🏆第${args[0]}位です。`;
            default: return "NO TEXT";
        }
    }

    // 1 -> 1st, 2 -> 2nd, 3 -> 3rd
    rank_suffix (num) {
        const dec = num % 10
        if (dec === 1) return 'st'
        if (dec === 2) return 'nd'
        if (dec === 3) return 'rd'
        return 'th'
    }
}

export default Language;