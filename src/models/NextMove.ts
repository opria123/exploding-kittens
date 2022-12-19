import { Move } from "./Move";

export default class Nextmove {
    nextPlayer: number;
    prevMove: Move;

    constructor(nextPlayer: number, prevMove: Move) {
        this.nextPlayer = nextPlayer;
        this.prevMove = prevMove;
    }
}