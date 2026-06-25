import type { FAQ } from "@/data/types";

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  return (
    <section className="mt-12">
      <h2 className="section-title text-2xl sm:text-3xl mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="cursor-pointer font-semibold text-gray-900 list-none flex items-center justify-between gap-4">
              {faq.question}
              <span className="shrink-0 text-caribbean-500 group-open:rotate-180 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
