import { type ReactNode, useEffect } from 'react'

export type ModalProps = {
  isOpen: boolean
  title: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
  dismissOnBackdrop?: boolean
  dismissOnEscape?: boolean
}

export function Modal({
  isOpen,
  title,
  closeLabel,
  onClose,
  children,
  dismissOnBackdrop = false,
  dismissOnEscape = false,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissOnEscape) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleBackdropClick = () => {
    if (dismissOnBackdrop) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={handleBackdropClick}>
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
