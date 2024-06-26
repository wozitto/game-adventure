"use client";

import { useGamePage } from "@/hooks/useGamePage";
import { CharacterComponent } from "@/ui/components/CharacterComponent";
import { GameJacket } from "@/ui/components/GameJacket";
import { Obstacle } from "@/ui/components/Obstacle";
import { HealthBar } from "@/ui/components/HealthBar";
import { ScoreDisplay } from "@/ui/components/ScoreDisplay";
import { IntroDialog } from "@/ui/components/IntroDialog";
import { GameDetailDialog } from "@/ui/components/GameDetailDialog";
import { GameOverDialog } from "@/ui/components/GameOverDialog";
import { GameClearedDialog } from "@/ui/components/GameClearedDialog";
import { CharacterControls } from "@/ui/components/CharacterControls";
import mobileGames from "@/app/games/mobile.json";

export default function MobilePage() {
  const {
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
  } = useGamePage(mobileGames);

  return (
    <div
      id="gameContainer"
      className="relative w-full"
      style={{
        height: `${containerHeight}px`,
        backgroundImage: "url('/renga.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "50px 50px",
      }}
    >
      <IntroDialog
        isOpen={showIntroDialog && isDialogOpen}
        onStart={handleContinueAdventure}
      />
      <GameOverDialog
        isOpen={health === 0}
        score={score}
        playedGameIds={games
          .filter((game) => !remainingGames.includes(game))
          .map((game) => game.id)}
      />
      {remainingGames.map((game) => (
        <GameJacket key={game.id} game={game} />
      ))}
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} type="bomb" obstacle={obstacle} />
      ))}
      <CharacterComponent character={character} direction={direction} />
      <HealthBar health={health} maxHealth={100} />
      <ScoreDisplay score={score} highScore={highScore} />
      <GameDetailDialog
        gameDetail={gameDetail}
        isOpen={isDialogOpen && !!gameDetail && !!selectedGame}
        onContinue={handleContinueAdventure}
        onQuit={handleQuitAdventure}
      />
      <GameClearedDialog
        isOpen={
          remainingGames.length === 0 && games.length > 0 && !isDialogOpen
        }
        score={score}
        playedGameIds={games.map((game) => game.id)}
      />
      <CharacterControls moveCharacter={moveCharacter} />
      <div className="heal-overlay" />
      <div className="damage-overlay" />
    </div>
  );
}
