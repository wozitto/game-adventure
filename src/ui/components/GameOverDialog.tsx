import Link from "next/link";

type GameOverDialogProps = {
  isOpen: boolean;
  score: number;
  playedGameIds: number[];
};

export const GameOverDialog: React.FC<GameOverDialogProps> = ({
  isOpen,
  score,
  playedGameIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="mx-auto max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          力尽きてしまった...
        </h2>
        <div className="flex justify-end">
          <Link
            href={`/score?score=${score}&playedGameIds=${encodeURIComponent(
              JSON.stringify(playedGameIds),
            )}`}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
          >
            スコアを確認する
          </Link>
        </div>
      </div>
    </div>
  );
};
