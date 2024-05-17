type Type = "fire" | "poison" | "bomb";

type Obstacle = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

type ObstacleProps = {
  type: Type;
  obstacle: Obstacle;
};

export const Obstacle: React.FC<ObstacleProps> = ({ type, obstacle }) => {
  const backgroundImages: { [key in Type]: string } = {
    fire: "/fire.png",
    poison: "/poison.png",
    bomb: "/bomb.png",
  };

  return (
    <div
      style={{
        left: obstacle.x,
        top: obstacle.y,
        width: obstacle.width,
        height: obstacle.height,
        position: "absolute",
        backgroundImage: `url('${backgroundImages[type]}')`,
        backgroundSize: "24px 24px",
        backgroundRepeat: "repeat",
      }}
    />
  );
};
