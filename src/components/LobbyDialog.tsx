import { useEffect, useRef, type ReactNode } from 'react';

export default function LobbyDialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    node.showModal();
    return () => node.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-labelledby="lobby-dialog-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="scroll-y fixed inset-0 m-auto max-h-[min(90dvh,660px)] w-[min(94vw,56rem)] max-w-none rounded-xl border border-[#555344] bg-[#171a1c] p-0 text-white shadow-2xl backdrop:bg-black/75"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[#171a1c] px-4 py-2.5 sm:px-5">
        <h2 id="lobby-dialog-title" className="text-lg font-black text-[#ffe183]">{title}</h2>
        <button type="button" onClick={onClose} className="min-h-9 rounded-md border border-white/20 px-3 text-sm font-bold hover:bg-white/10">关闭</button>
      </header>
      {children}
    </dialog>
  );
}
