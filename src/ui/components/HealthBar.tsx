type HealthBarProps = {
  health: number;
  maxHealth: number;
};

export const HealthBar: React.FC<HealthBarProps> = ({ health, maxHealth }) => {
  const healthPercentage = (health / maxHealth) * 100;

  let healthColor = "";
  if (healthPercentage > 50) {
    healthColor = "green";
  } else if (healthPercentage > 20) {
    healthColor = "yellow";
  } else {
    healthColor = "red";
  }

  return (
    <div className="fixed left-4 top-4 z-50">
      <div className="flex items-center gap-2 text-black">
        <span className="text-lg font-bold">HP:</span>
        <div
          className="relative w-40 h-6 rounded-full overflow-hidden bg-gray-800"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <div
            className="absolute top-0 left-0 h-full transition-all duration-500 ease-in-out"
            style={{
              width: `${healthPercentage}%`,
              backgroundColor: healthColor,
              backgroundImage: `linear-gradient(to right, ${healthColor}, ${healthColor}aa)`,
            }}
          />
        </div>
      </div>
      <div className="mt-1 text-center font-bold text-black">
        {health} / {maxHealth}
      </div>
    </div>
  );
};
