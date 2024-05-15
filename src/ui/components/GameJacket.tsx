import Image from "next/image";

type Game = {
  id: number;
  title: string;
  image: string;
  x: number;
  y: number;
};

type GameJacketProps = {
  game: Game;
};

export const GameJacket: React.FC<GameJacketProps> = ({ game }) => {
  return (
    <div
      className="absolute transform hover:scale-110 transition-transform duration-200 ease-in-out"
      style={{
        left: game.x,
        top: game.y,
        position: "absolute",
        width: 90,
        height: 90,
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={game.image}
          alt={game.title}
          fill
          sizes="80px"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};
