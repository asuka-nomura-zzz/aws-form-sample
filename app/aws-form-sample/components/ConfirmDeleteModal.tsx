// ConfirmDeleteModal.tsx
import React from "react";

type ConfirmDeleteModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  // モーダル外をクリックした時にモーダルを閉じる処理
  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-background") {
      onCancel(); // モーダルを閉じる
    }
  };

  return (
    <div 
      id="modal-background"
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            削除
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;