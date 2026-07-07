import { Link } from 'react-router-dom'

interface PrivacyNoticeProps {
  checked: boolean
  onChange: (checked: boolean) => void
  /** 同意內容描述，依表單類型客製 */
  message: string
}

/** 發文前的隱私同意勾選。未勾選時表單不得送出。 */
export function PrivacyNotice({ checked, onChange, message }: PrivacyNoticeProps) {
  return (
    <label className="flex items-start gap-2 rounded-md bg-amber-50 p-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4"
        required
      />
      <span>
        {message}
        我已閱讀並同意
        <Link to="/privacy" target="_blank" className="mx-1 text-blue-700 underline">
          隱私政策
        </Link>
        。
      </span>
    </label>
  )
}
