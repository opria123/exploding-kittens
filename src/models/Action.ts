export default class Action {
    name: string = "";
    isNopeable: boolean = false;
}

export const ACTIONS: Action[] = [
    {
        name: "attack",
        isNopeable: true
    },
    {
        name: "draw",
        isNopeable: false
    },
    {
        name: "defuse",
        isNopeable: false
    },
    {
        name: "nope",
        isNopeable: true
    },
    {
        name: "tradeIn",
        isNopeable: true
    },
    {
        name: "see-the-futre",
        isNopeable: true
    },
    {
        name: "skip",
        isNopeable: true
    },
    {
        name: "favor",
        isNopeable: true
    },
    {
        name: "shuffle",
        isNopeable: true
    }
]