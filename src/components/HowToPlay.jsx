import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function HowToPlay() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation(['common', 'tutorial'])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                   hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-secondary)'
        }}
      >
        {t('common:howToPlay')}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative max-w-md w-full p-6 rounded-2xl shadow-2xl slide-up"
            style={{ backgroundColor: 'var(--bg-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                         rounded-full transition-colors hover:bg-gray-500/20"
              style={{ color: 'var(--text-secondary)' }}
            >
              ✕
            </button>

            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('common:howToPlay')}
            </h2>

            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t('tutorial:objective')}
                  </h3>
                  <p>{t('tutorial:objectiveText')}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t('tutorial:gameModes')}
                  </h3>
                  <p>
                    <span className="text-pink-500 font-medium">{t('game:vsComputer')}:</span> {t('tutorial:vsComputerDesc')}
                    <br />
                    <span className="text-cyan-400 font-medium">{t('game:twoPlayers')}:</span> {t('tutorial:twoPlayersDesc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t('tutorial:howToPlayTitle')}
                  </h3>
                  <p>
                    1. {t('tutorial:step1')}<br />
                    2. {t('tutorial:step2')}<br />
                    3. <span className="text-pink-500">X</span> {t('tutorial:step3')}<br />
                    4. {t('tutorial:step4')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t('tutorial:reset')}
                  </h3>
                  <p>{t('tutorial:resetText')}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white
                         font-semibold rounded-xl transition-all duration-200
                         hover:scale-105 active:scale-95"
            >
              {t('common:gotIt')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
