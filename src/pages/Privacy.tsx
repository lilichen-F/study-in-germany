export function Privacy() {
  return (
    <article className="prose-sm mx-auto max-w-2xl space-y-6 text-slate-700">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">隱私政策</h1>
        <p className="mt-1 text-xs text-slate-400">最後更新：2026 年 7 月 7 日</p>
      </div>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">1. 我們收集哪些資料</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Google 帳號基本資料</strong>：當你使用 Google
            登入時，我們透過 Supabase Auth 取得你的顯示名稱、頭像與
            Email。Email 僅用於帳號識別，<strong>不會公開顯示</strong>。
          </li>
          <li>
            <strong>你主動發布的內容</strong>：學校評價（星等與文字）、佈告欄貼文（標題、內容、地區、價格、聯絡方式）。
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">2. 哪些資料會被公開</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>你的<strong>顯示名稱與頭像</strong>會顯示在你發布的評價與貼文旁。</li>
          <li>
            佈告欄貼文中的<strong>聯絡方式（Email、通訊軟體 ID 等）會對所有訪客公開</strong>
            ，包括未登入的使用者。發文前你必須明確勾選同意此項。
          </li>
          <li>評價與貼文內容對所有訪客公開，並可能被搜尋引擎索引。</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">3. 資料保存期限</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            佈告欄貼文自發布起 <strong>60 天後自動下架</strong>（資料庫層級的過期機制），不再對外顯示。
          </li>
          <li>學校評價長期保留，以維持評價系統的參考價值，你可隨時自行刪除。</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">4. 你的權利</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            你可隨時在「<strong>我的發文</strong>」頁面查看並刪除自己發布的所有評價與貼文（GDPR
            刪除權）。
          </li>
          <li>刪除帳號時，你發布的所有內容會一併刪除（資料庫層級的連動刪除）。</li>
          <li>評價發布後不可修改（維持公信力），如需更正請刪除後重新發布。</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">5. 資料儲存與第三方服務</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            所有資料儲存於 <strong>Supabase</strong>（PostgreSQL），並以資料庫層級的
            Row Level Security 控管存取權限。
          </li>
          <li>登入服務由 Google OAuth 提供，本站不會取得或儲存你的 Google 密碼。</li>
          <li>本站不使用追蹤型 Cookie，僅使用維持登入狀態所必需的本機儲存。</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">6. 聯絡我們</h2>
        <p>
          若你對個人資料的處理有任何疑問，或需要協助行使上述權利，請透過 GitHub
          專案頁面提出 Issue 與我們聯繫。
        </p>
      </section>
    </article>
  )
}
