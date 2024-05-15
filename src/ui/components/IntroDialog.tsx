type IntroDialogProps = {
  isOpen: boolean;
  onStart: () => void;
};

export const IntroDialog: React.FC<IntroDialogProps> = ({
  isOpen,
  onStart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 w-11/12 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">ゲームの遊び方</h2>
        <p className="text-gray-600 mb-4">
          黄色いキャラクターを動かして、ステージにあるゲームアイテムを集めよう！障害物にぶつからないように注意してね。動くたびに体力を消費するから、気をつけて！
        </p>
        <div className="flex justify-end mt-4 gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
            onClick={onStart}
          >
            スタート！
          </button>
        </div>
      </div>
    </div>
  );
};
