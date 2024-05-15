import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Game, Obstacle, Character } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isOverlap = (
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

export const getRandomPosition = (
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

export const initializeGamePositions = (
  games: Game[],
  maxWidth: number,
  maxHeight: number,
): (Game & { x: number; y: number })[] => {
  return games.reduce<(Game & { x: number; y: number })[]>((acc, game) => {
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

export const generateObstacles = (
  numObstacles: number,
  maxWidth: number,
  maxHeight: number,
  games: (Game & { x: number; y: number })[],
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

export const initializeCharacterPosition = (
  maxWidth: number,
  maxHeight: number,
  games: (Game & { x: number; y: number })[],
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

export const triggerHealAnimation = () => {
  const healOverlay = document.querySelector(".heal-overlay") as HTMLElement;
  const healSound = new Audio("/sounds/heal.mp3");

  if (healOverlay) {
    healOverlay.style.animation = "none";
    setTimeout(() => {
      healOverlay.style.animation = "";
      healOverlay.style.animation = "heal 0.2s linear 3";
    }, 10);
  }

  healSound.play();
};

export const triggerDamageAnimation = () => {
  const damageOverlay = document.querySelector(
    ".damage-overlay",
  ) as HTMLElement;
  const damageSound = new Audio("/sounds/damage.mp3");

  if (damageOverlay) {
    damageOverlay.style.animation = "none";
    setTimeout(() => {
      damageOverlay.style.animation = "";
      damageOverlay.style.animation = "damage 0.2s linear";
    }, 10);
  }

  damageSound.play();
};
