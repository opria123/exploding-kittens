import Action, { ACTIONS } from "./Action";
import Card from "./Card";

export class Move {
    action: Action = new Action();
    card?: Card;

    constructor(sentAction: string, card?: Card) {
        if (card) {
            this.card = card;
        }
        ACTIONS.forEach((action) => {
            if (sentAction === action.name) {
                this.action = action;
            }
        })
    }

    isNopeable(): boolean {
        return this.action.isNopeable;
    }
}