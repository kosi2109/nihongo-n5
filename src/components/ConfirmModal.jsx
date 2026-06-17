import { motion, AnimatePresence } from 'framer-motion';

/**
 * A beautiful confirmation modal.
 * Props:
 *   isOpen   - boolean
 *   title    - string
 *   message  - string
 *   onConfirm - () => void   (Yes / Continue)
 *   onCancel  - () => void   (No / Stay)
 */
export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — also acts as flex centering container */}
          <motion.div
            key="confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            {/* Modal — stop click propagation so backdrop click doesn't fire */}
            <motion.div
              key="confirm-modal"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ duration: 0.22, ease: [0.34, 1.26, 0.64, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 'min(90vw, 380px)',
                background: 'var(--bg-card)',
                border: '1px solid rgba(232,65,90,0.25)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
            {/* Top accent bar */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, var(--accent-red), #f5c842)',
            }} />

            <div style={{ padding: '28px 28px 24px' }}>
              {/* Icon */}
              <div style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '16px', lineHeight: 1 }}>
                ⚠️
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                textAlign: 'center',
                marginBottom: '10px',
                lineHeight: 1.3,
              }}>
                {title}
              </h2>

              {/* Message */}
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}>
                {message}
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* Stay (Cancel) */}
                <button
                  onClick={onCancel}
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-glass)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-glass-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-glass)'}
                >
                  ← ဆက်စစ်ဆေးမည်
                </button>

                {/* Leave (Confirm) */}
                <button
                  onClick={onConfirm}
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--accent-red), #c0392b)',
                    color: 'white',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  ထွက်မည်
                </button>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
