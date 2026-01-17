import { type ReactNode, useEffect } from 'react'

export type ModalProps = {
  isOpen: boolean
  title: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ isOpen, title, closeLabel, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
