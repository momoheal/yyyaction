import { useEffect, useRef, type ReactNode } from 'react';

export default function LobbyDialog({ title, children, onClose, accessory, toolbar, variant }: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  accessory?: ReactNode;
  toolbar?: ReactNode;
  variant?: 'armory' | 'sheet';
}) {
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
      className={variant ? "lobby-dialog sheet-drawer" : "lobby-dialog"}
      data-variant={variant}
    >
      <header className="lobby-dialog-header">
        <div className="lobby-dialog-heading">
          <h2 id="lobby-dialog-title">{title}</h2>
          {accessory}
          <button type="button" onClick={onClose} className="lobby-button">关闭</button>
        </div>
        {toolbar}
      </header>
      <div className="lobby-dialog-content scroll-y">{children}</div>
    </dialog>
  );
}
