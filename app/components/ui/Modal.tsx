
interface ModalProps {
    isOpen: boolean;
    onClose: () => void
    title: string;
    children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    )
}