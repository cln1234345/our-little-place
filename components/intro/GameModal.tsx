"use client";

export default function GameModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4c3c35]/25 px-5 backdrop-blur-md">
      <div className="game-modal relative w-full max-w-[420px] rounded-[36px] border border-white/60 bg-[#fffaf5]/95 p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-xl text-[#9a8275] transition hover:scale-110"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}