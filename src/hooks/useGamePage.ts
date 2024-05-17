"use client";

import { useEffect, useState } from "react";
import {
  initializeGamePositions,
  generateObstacles,
  initializeCharacterPosition,
  isOverlap,
  triggerHealAnimation,
  triggerDamageAnimation,
} from "@/lib/utils";
import { Game, Character, Obstacle as ObstacleType, GameDetail } from "@/types";
import { HIGH_SCORE_KEY } from "@/constants/index";

export const useGamePage = (initialGames: Game[]) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [character, setCharacter] = useState<Character>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    "right",
  );
  const [games, setGames] = useState<(Game & { x: number; y: number })[]>([]);
  const [remainingGames, setRemainingGames] = useState<
    (Game & { x: number; y: number })[]
  >([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [showIntroDialog, setShowIntroDialog] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (savedHighScore) {
      setHighScore(Number(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (showIntroDialog) {
      setIsDialogOpen(true);
    }
  }, [showIntroDialog]);

  useEffect(() => {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    const positionedGames = initializeGamePositions(
      initialGames,
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
  }, [initialGames]);

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
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
  }, [score, highScore]);

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
          setHealth((prevHealth) => Math.min(prevHealth + 15, 100));
          setSelectedGame(null);
          setSelectedGame(hitGame);
          setIsDialogOpen(true);
          setRemainingGames(
            remainingGames.filter((game) => game.id !== hitGame.id),
          );
          setScore((prevScore) => prevScore + 100);
          triggerHealAnimation();
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
          setHealth((prevHealth) => Math.max(prevHealth - 5, 0));
          triggerDamageAnimation();
        }

        return { x: newX, y: newY };
      });
    }
  };

  const handleContinueAdventure = () => {
    setIsDialogOpen(false);
    setShowIntroDialog(false);
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

  return {
    containerHeight,
    character,
    direction,
    games,
    remainingGames,
    selectedGame,
    obstacles,
    score,
    health,
    showIntroDialog,
    isDialogOpen,
    moveCharacter,
    handleContinueAdventure,
    handleQuitAdventure,
    gameDetail,
    highScore,
  };
};
