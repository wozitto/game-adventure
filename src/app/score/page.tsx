"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/Card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import switchGames from "@/app/games/switch.json";
import { HIGH_SCORE_KEY } from "@/constants/index";

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

  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-center p-6 md:p-12 lg:p-24 space-y-6 lg:space-y-12 bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-50">
          ゲームスコア
        </h1>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>あなたのスコア</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-center text-gray-900 dark:text-gray-50">
              {score}
            </p>
            {highScore !== null && (
              <p className="text-sm font-medium text-center text-gray-600 dark:text-gray-400">
                最高得点: {highScore}
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>集めたゲーム一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {playedGames.map((game) => (
                <li key={game.id}>
                  <Link
                    href={game.productionLink}
                    target="_blank"
                    className="font-medium text-blue-600 underline dark:text-blue-400"
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
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition dark:bg-blue-500 dark:text-gray-900"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
