export const ScoreDisplay: React.FC<{ score: number; highScore: number }> = ({
  score,
  highScore,
}) => {
  return (
    <div
      className="fixed top-4 right-4 bg-white bg-opacity-80 rounded-lg p-2 shadow-md text-gray-800"
      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <p className="text-lg font-bold">Score: {score}</p>
      <p className="text-sm font-medium text-gray-600">
        High Score: {highScore}
      </p>
    </div>
  );
};
