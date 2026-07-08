import FAQ from '../components/FAQ';

export default function Faq() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">常見問答</h1>
        <p className="text-sm text-content-secondary mt-1">
          關於申請語言簽證、封閉帳戶、健保、語校收費等常見疑問。
        </p>
      </div>
      <FAQ />
    </div>
  );
}
