import faq from '../data/faq.json'
import type { FaqItem } from '../lib/types'

export function FAQ() {
  return (
    <div className="space-y-3">
      {(faq as FaqItem[]).map((item) => (
        <details
          key={item.question}
          className="group rounded-lg border border-slate-200 bg-white p-4"
        >
          <summary className="cursor-pointer font-medium text-slate-900 group-open:text-blue-700">
            {item.question}
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
