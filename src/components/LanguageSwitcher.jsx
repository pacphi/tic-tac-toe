import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                 cursor-pointer outline-none"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-secondary)',
        border: 'none'
      }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  )
}
