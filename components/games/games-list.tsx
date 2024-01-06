import { GameStats, TEAM } from "@/types/types";
import { formatDate } from "@/utils/utils";
import PlayerAvatar from "@/components/ui/player-avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Award } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";

type GameListProps = {
  games: GameStats[];
};

export default function GamesList({ games }: GameListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {games?.map((game) => (
        <li
          key={game.id}
          className="flex justify-center gap-12 border-b pb-4 last:border-0 dark:border-slate-700"
        >
          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-2">
              {game.winner === TEAM.Red && <Award />}
              <span>Team Red</span>
            </div>
            <ul className="flex gap-2">
              {game.teamRed.players.map((player) => (
                <li key={player.id}>
                  <Link href={`/players/${player.id}`}>
                    <PlayerAvatar player={player} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-end px-4">
            <span className="text-xl lg:text-5xl">
              {game.teamRed.score}:{game.teamBlue.score}
            </span>
            <span className="mt-3 text-xs">{formatDate(game.createdAt)}</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <span>Team Blue</span>
              {game.winner === TEAM.Blue && <Award />}
            </div>
            <ul className="flex gap-2">
              {game.teamBlue.players.map((player) => (
                <li key={player.id}>
                  <Link href={`/players/${player.id}`}>
                    <PlayerAvatar player={player} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}