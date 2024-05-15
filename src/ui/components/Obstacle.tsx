type Obstacle = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

type ObstacleProps = {
  obstacle: Obstacle;
};

export const Obstacle: React.FC<ObstacleProps> = ({ obstacle }) => {
  return (
    <div
      style={{
        left: obstacle.x,
        top: obstacle.y,
        width: obstacle.width,
        height: obstacle.height,
        position: "absolute",
        backgroundImage: "url('/fire.png')",
        backgroundSize: "24px 24px",
        backgroundRepeat: "repeat",
      }}
    />
  );
};
