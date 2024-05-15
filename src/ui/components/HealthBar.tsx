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
    <div className="fixed" style={{ width: 160, top: 16, left: 16 }}>
      <div className="h-6 flex gap-2">
        HP:
        <div
          style={{
            width: `${healthPercentage}%`,
            height: 24,
            transition: "width 0.5s",
            backgroundColor: healthColor,
          }}
        />
      </div>
      <div className="text-xs text-center text-gray-600 mt-1">
        {health} / {maxHealth}
      </div>
    </div>
  );
};
