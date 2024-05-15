"use client";

import { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/ui/components/CardComponent";
import Link from "next/link";
import { HIGH_SCORE_KEY } from "@/constants/index";

export default function Home() {
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
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-50">
          集めたいゲームのジャンルを選んで、冒険に出かけよう！
        </h1>
        {highScore !== null && (
          <div className="mb-6 text-lg font-medium text-gray-700 dark:text-gray-300">
            最高得点: {highScore}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Nintendo Switch</CardTitle>
              <CardDescription>
                燃える炎の中を、勇気を出して草原を走り抜けよう！そして、ステキなゲームを見つけ出そう！
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition dark:bg-blue-500 dark:text-gray-900"
                href="/genre/switch"
              >
                冒険する
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>プレイステーション</CardTitle>
              <CardDescription>
                荒れた土地にある毒の沼は、うまく避けながら進もう！道の途中で見つかるゲームを、ひとつひとつ集めていこう！
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition dark:bg-blue-500 dark:text-gray-900"
                href="/genre/playstation"
              >
                冒険する
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>スマホアプリ</CardTitle>
              <CardDescription>
                大都会の中で、鋭いトゲが待ち構える危ない道を、気をつけて歩いていこう！そして、隠れているゲームを見つけられるように、よく探そう！
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition dark:bg-blue-500 dark:text-gray-900"
                href="/genre/app"
              >
                冒険する
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
