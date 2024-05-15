import Image from "next/image";
import { Character } from "@/types";

type CharacterProps = {
  character: Character;
  direction: "up" | "down" | "left" | "right";
};

export const CharacterComponent: React.FC<CharacterProps> = ({
  character,
  direction,
}) => {
  return (
    <div
      className="absolute flex justify-center items-center"
      style={{ left: character.x, top: character.y }}
    >
      <span
        style={{
          transform: `rotate(${
            direction === "up"
              ? "270deg"
              : direction === "down"
                ? "90deg"
                : direction === "left"
                  ? "180deg"
                  : "0deg"
          })`,
        }}
      >
        <Image src="/pacman.svg" alt="Character" width={32} height={32} />
      </span>
    </div>
  );
};
