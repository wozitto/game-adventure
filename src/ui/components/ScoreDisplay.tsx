export const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="fixed bg-white" style={{ top: 16, right: 16 }}>
      <p className="text-lg font-bold">Score: {score}</p>
    </div>
  );
};
