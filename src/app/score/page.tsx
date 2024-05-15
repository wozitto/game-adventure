"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import switchGames from "@/app/games/switch.json";

export default function ScorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScorePageContent />
    </Suspense>
  );
}

function ScorePageContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const playedGameIdsParam = searchParams.get("playedGameIds");
  const playedGameIds = playedGameIdsParam
    ? JSON.parse(decodeURIComponent(playedGameIdsParam))
    : [];

  const playedGames = switchGames.filter((game) =>
    playedGameIds.includes(game.id),
  );

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-center p-6 md:p-12 lg:p-24 space-y-6 lg:space-y-12">
        <h1 className="text-4xl font-bold tracking-tight text-center">
          ゲームスコア
        </h1>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>あなたのスコア</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-center">{score}</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>集めたゲーム一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {playedGames.map((game) => (
                <li key={game.id} className="mt-2">
                  <Link
                    href={game.productionLink}
                    target="_blank"
                    className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                  >
                    {game.title}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
