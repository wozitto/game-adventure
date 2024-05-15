"use client";

import { useEffect } from "react";
import Link from "next/link";

type GameClearedDialogProps = {
  isOpen: boolean;
  score: number;
  playedGameIds: number[];
};

export const GameClearedDialog: React.FC<GameClearedDialogProps> = ({
  isOpen,
  score,
  playedGameIds,
}) => {
  useEffect(() => {
    if (isOpen) {
      const clearSound = new Audio("/sounds/clear.mp3");
      clearSound.play();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 w-11/12 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">全クリ！</h2>
        <p className="text-gray-600 mb-4">
          全てのゲームアイテムを集めました！おめでとうございます！
        </p>
        <div className="flex justify-end mt-4 gap-4">
          <Link
            href={`/score?score=${score}&playedGameIds=${encodeURIComponent(
              JSON.stringify(playedGameIds),
            )}`}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
          >
            スコアを確認する
          </Link>
        </div>
      </div>
    </div>
  );
};
