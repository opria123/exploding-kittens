import socket from "../api/socket";
import { GameServer, Player, Card } from "../utils/interfaces";
import { ServerInterface } from "./ServerInterface";

export class OnlineServer implements ServerInterface {
  player?: Player;

  getServers(): Promise<GameServer[]> {
    return new Promise((res, rej) => {
      socket.emit("getServers", (err: any, servers: GameServer[]) => {
        if (err) return rej(err);
        console.log(servers);

        res(servers);
      });
    });
  }
  getServerPlayers(): Promise<Player[]> {
    return new Promise((res, rej) => {
      socket.emit("getServerPlayers", (err: any, players: Player[]) => {
        if (err) {
          return rej(err);
        }
        res(players);
      });
    });
  }
  createServer(serverName: string, serverPassword?: string): Promise<string> {
    return new Promise((res, rej) => {
      socket.emit(
        "createServer",
        { serverName: serverName, serverPassword: serverPassword, player: this.getPlayer() },
        (err: any, playerId: string) => {
          if (err) {
            return rej(err);
          }
          res(playerId);
        }
      );
    });
  }

  joinServer(serverId: string, serverPassword?: string): Promise<string> {
    return new Promise((res, rej) => {
      socket.emit(
        "joinServer",
        { serverId, serverPassword, player: this.getPlayer() },
        (err: any, playerId: string) => {
          if (err) {
            return rej(err);
          }
          setTimeout(() => {
            // socket.emit("add-bots");
          }, 2000);
          res(playerId);
        }
      );
    });
  }
  emitReady(): void {
    debugger;
    socket.emit("startGame", () => { });
  }
  leaveServer(): void {
    socket.emit("leaveServer");
    this.removeAllListeners();
  }
  move(draw: boolean | null, cardId: string): Promise<void> {
    return new Promise((res, rej) => {
      socket.emit("move", { cardId, draw }, (err: any) => {
        if (err) return rej(err);
        res();
      });
    });
  }
  onPlayersUpdated(cb: (players: Player[]) => void): () => void {
    socket.on("playersChanged", cb);
    return () => socket.off("playersChanged", cb);
  }

  onGameInit(
    cb: (data: { players: Player[]; cards: Card[] }) => void
  ): () => void {
    socket.on("initGame", cb);
    return () => socket.off("initGame", cb);
  }
  onMove(
    cb: (data: {
      nxtPlayer: number;
      card: Card;
      draw?: number | undefined;
      cardsToDraw?: Card[] | undefined;
    }) => void
  ): () => void {
    socket.on("move", cb);
    return () => socket.off("move", cb);
  }

  onPlayerLeft(cb: () => void): () => void {
    socket.on("playerLeft", cb);
    return () => socket.off("playerLeft", cb);
  }

  onFinishGame(cb: (playersOrdered: Player[]) => void): () => void {
    socket.on("finishedGame", cb);
    return () => socket.off("finishedGame", cb);
  }

  removeAllListeners() {
    socket.removeAllListeners();
  }

  getPlayer(): Player {
    if (this.player) {
      return this.player;
    }
    this.player = {} as Player;
    this.player.name = localStorage.getItem("playerName") as string;
    this.player.img = localStorage.getItem("playerImg") as string;
    return this.player;
  }
}
