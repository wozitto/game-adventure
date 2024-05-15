"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GameJacket } from "@/ui/components/GameJacket";
import { Obstacle } from "@/ui/components/Obstacle";
import { HealthBar } from "@/ui/components/HealthBar";
import { ScoreDisplay } from "@/ui/components/ScoreDisplay";
import Link from "next/link";
import switchGames from "@/app/games/switch.json";

type Game = {
  id: number;
  image: string;
  title: string;
  description: string;
  productionLink: string;
  youtubeUrl: string;
  x: number;
  y: number;
};

type GameDetail = {
  title: string;
  description: string;
  productionLink: string;
  youtubeUrl: string;
};

type Obstacle = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

type Character = {
  x: number;
  y: number;
};

const isOverlap = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number },
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

const getRandomPosition = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
  existingRects: { x: number; y: number; width: number; height: number }[],
): { x: number; y: number } => {
  let x: number, y: number;
  do {
    x = Math.random() * (maxWidth - width);
    y = Math.random() * (maxHeight * 4 - height);
  } while (
    existingRects.some((rect) => isOverlap({ x, y, width, height }, rect))
  );
  return { x, y };
};

const initializeGamePositions = (
  games: Game[],
  maxWidth: number,
  maxHeight: number,
): Game[] => {
  return games.reduce<Game[]>((acc, game) => {
    const { x, y } = getRandomPosition(
      100,
      100,
      maxWidth,
      maxHeight,
      acc.map((positionedGame) => ({
        x: positionedGame.x,
        y: positionedGame.y,
        width: 100,
        height: 100,
      })),
    );
    return [...acc, { ...game, x, y }];
  }, []);
};

const generateObstacles = (
  numObstacles: number,
  maxWidth: number,
  maxHeight: number,
  games: Game[],
): Obstacle[] => {
  const obstacles: Obstacle[] = [];

  for (let i = 0; i < numObstacles; i++) {
    const width = Math.floor(Math.random() * 100) + 50;
    const height = Math.floor(Math.random() * 100) + 50;
    const { x, y } = getRandomPosition(width, height, maxWidth, maxHeight, [
      ...games.map((game) => ({
        x: game.x,
        y: game.y,
        width: 100,
        height: 100,
      })),
      ...obstacles.map((obstacle) => ({
        x: obstacle.x,
        y: obstacle.y,
        width: obstacle.width,
        height: obstacle.height,
      })),
    ]);
    obstacles.push({ id: i + 1, width, height, x, y });
  }

  return obstacles;
};

const initializeCharacterPosition = (
  maxWidth: number,
  maxHeight: number,
  games: Game[],
  obstacles: Obstacle[],
): Character => {
  const { x, y } = getRandomPosition(50, 50, maxWidth, maxHeight / 4, [
    ...games.map((game) => ({
      x: game.x,
      y: game.y,
      width: 100,
      height: 100,
    })),
    ...obstacles.map((obstacle) => ({
      x: obstacle.x,
      y: obstacle.y,
      width: obstacle.width,
      height: obstacle.height,
    })),
  ]);
  return { x, y };
};

export default function SwitchPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [character, setCharacter] = useState<Character>({ x: 0, y: 0 });
  const [health, setHealth] = useState(100);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [remainingGames, setRemainingGames] = useState<Game[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    "right",
  );
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    const fetchedGames: Game[] = switchGames;

    const positionedGames = initializeGamePositions(
      fetchedGames,
      maxWidth,
      maxHeight,
    );
    setGames(positionedGames);

    const positionedObstacles = generateObstacles(
      40,
      maxWidth,
      maxHeight,
      positionedGames,
    );
    setObstacles(positionedObstacles);

    const characterPosition = initializeCharacterPosition(
      maxWidth,
      maxHeight,
      positionedGames,
      positionedObstacles,
    );
    setCharacter(characterPosition);

    setRemainingGames(positionedGames);
    setContainerHeight(maxHeight * 4);
  }, []);

  useEffect(() => {
    const container = document.getElementById("gameContainer");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isDialogOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (shake) {
      const shakeAnimation = setInterval(() => {
        const container = document.querySelector(".container") as HTMLElement;
        if (container) {
          container.style.animation = "shake 0.3s";
          setTimeout(() => {
            container.style.animation = "";
            setShake(false);
          }, 500);
        }
      }, 100);

      return () => clearInterval(shakeAnimation);
    }
  }, [shake]);

  const moveCharacter = (dx: number, dy: number) => {
    if (typeof window !== "undefined") {
      setCharacter((prevCharacter) => {
        const newX = Math.max(
          0,
          Math.min(window.innerWidth - 32, prevCharacter.x + dx),
        );
        const newY = Math.max(
          0,
          Math.min(window.innerHeight * 4 - 32, prevCharacter.y + dy),
        );

        const tempCharacter = { x: newX, y: newY, width: 32, height: 32 };
        const hitGame = remainingGames.find((game) =>
          isOverlap(tempCharacter, {
            x: game.x,
            y: game.y,
            width: 90,
            height: 90,
          }),
        );

        if (dx === 0 && dy === -30) {
          setDirection("up");
        } else if (dx === 0 && dy === 30) {
          setDirection("down");
        } else if (dx === -30 && dy === 0) {
          setDirection("left");
        } else if (dx === 30 && dy === 0) {
          setDirection("right");
        }

        setHealth((prevHealth) => Math.max(prevHealth - 2.5, 0));

        if (hitGame) {
          setHealth((prevHealth) => Math.min(prevHealth + 30, 100));
          setSelectedGame(null);
          setSelectedGame(hitGame);
          setIsDialogOpen(true);
          setRemainingGames(
            remainingGames.filter((game) => game.id !== hitGame.id),
          );
          setScore((prevScore) => prevScore + 10);
        }

        const hitObstacle = obstacles.find((obstacle) =>
          isOverlap(tempCharacter, {
            x: obstacle.x,
            y: obstacle.y,
            width: obstacle.width,
            height: obstacle.height,
          }),
        );

        if (hitObstacle) {
          setHealth((prevHealth) => Math.max(prevHealth - 7.5, 0));
          setShake(true);
        }

        return { x: newX, y: newY };
      });
    }
  };

  const handleContinueAdventure = () => {
    setIsDialogOpen(false);
  };

  const handleQuitAdventure = () => {
    const confirmQuit = window.confirm("本当に冒険をやめますか？");
    if (confirmQuit) {
      const playedGameIds = games
        .filter((game) => !remainingGames.includes(game))
        .map((game) => game.id);
      const playedGameIdsParam = encodeURIComponent(
        JSON.stringify(playedGameIds),
      );
      window.location.href = `/score?score=${score}&playedGameIds=${playedGameIdsParam}`;
    }
  };

  const gameDetail: GameDetail | null =
    isDialogOpen && selectedGame
      ? {
          title: selectedGame.title,
          description: selectedGame.description,
          productionLink: selectedGame.productionLink,
          youtubeUrl: selectedGame.youtubeUrl,
        }
      : null;

  return (
    <div
      id="gameContainer"
      className="relative w-full container bg-green-300"
      style={{
        height: `${containerHeight}px`,
      }}
    >
      {health === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="mx-auto max-w-md bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">力尽きてしまった...</h2>
            <div className="flex justify-end">
              <Link
                href={`/score?score=${score}&playedGameIds=${encodeURIComponent(
                  JSON.stringify(
                    games
                      .filter((game) => !remainingGames.includes(game))
                      .map((game) => game.id),
                  ),
                )}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                スコアを確認する
              </Link>
            </div>
          </div>
        </div>
      )}
      {remainingGames.map((game) => (
        <GameJacket key={game.id} game={game} />
      ))}
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} obstacle={obstacle} />
      ))}
      <div
        className="absolute flex justify-center items-center"
        style={{ left: character.x, top: character.y }}
      >
        <span
          style={{
            transform: `rotate(${
              direction === "up"
                ? "270deg"
                : direction === "down"
                  ? "90deg"
                  : direction === "left"
                    ? "180deg"
                    : "0deg"
            })`,
          }}
        >
          <Image
            src="/pacman.svg"
            alt="Character"
            width={32}
            height={32}
          />
        </span>
      </div>
      <HealthBar health={health} maxHealth={100} />
      <ScoreDisplay score={score} />
      {health > 0 && (
        <div className="fixed bottom-4 right-4">
          <div className="transform w-28 h-28 flex justify-center items-center">
            <button
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-900 hover:bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              onClick={() => moveCharacter(0, -30)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <button
              className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-900 hover:bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              onClick={() => moveCharacter(0, 30)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              onClick={() => moveCharacter(-30, 0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              onClick={() => moveCharacter(30, 0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {isDialogOpen && gameDetail && selectedGame && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 w-11/12 rounded-lg">
            <iframe
              className="w-full h-64 mb-4"
              src={gameDetail.youtubeUrl}
              title={gameDetail.title}
              allowFullScreen
            ></iframe>
            <h2 className="text-2xl font-bold mb-2">{gameDetail.title}</h2>
            <p className="text-gray-600 mb-2">{gameDetail.description}</p>
            <Link
              href={gameDetail.productionLink}
              target="_blank"
              className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline mb-2"
            >
              商品の詳細ページに移動
            </Link>
            <div className="flex justify-end mt-4 gap-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={handleQuitAdventure}
              >
                冒険をやめる
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleContinueAdventure}
              >
                冒険を続ける
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
