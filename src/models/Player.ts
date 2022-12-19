import Card from "./Card";

export default class Player {
    id: string = "";
    name: string = "";
    cards: Card[] = [];
    isHost: boolean = false;
    disconnected: boolean = false;
    isDead: boolean = false;;
}