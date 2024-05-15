import Link from "next/link";
import { GameDetail } from "@/types";

type GameDetailDialogProps = {
  gameDetail: GameDetail | null;
  isOpen: boolean;
  onContinue: () => void;
  onQuit: () => void;
};

export const GameDetailDialog: React.FC<GameDetailDialogProps> = ({
  gameDetail,
  isOpen,
  onContinue,
  onQuit,
}) => {
  if (!isOpen || !gameDetail) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 w-11/12 rounded-lg">
        <iframe
          className="w-full h-64 mb-4"
          src={gameDetail.youtubeUrl}
          title={gameDetail.title}
          allowFullScreen
        ></iframe>
        <h2 className="text-2xl font-bold mb-2">{gameDetail.title}</h2>
        <p className="text-gray-600 mb-2">{gameDetail.description}</p>
        <Link
          href={gameDetail.productionLink}
          target="_blank"
          className="font-medium text-blue-600 underline dark:text-blue-500 mb-2"
        >
          ゲームの詳細ページに移動
        </Link>
        <div className="flex justify-end mt-4 gap-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onQuit}
          >
            冒険をやめる
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onContinue}
          >
            冒険を続ける
          </button>
        </div>
      </div>
    </div>
  );
};
