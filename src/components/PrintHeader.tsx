/**
 * 僅列印時顯示：站名 + URL + 列印時間。
 * 螢幕上 display:none。
 */
export default function PrintHeader() {
  return (
    <div className="hidden print:block text-xs text-black border-b border-gray-400 pb-2 mb-4">
      <div className="font-semibold">留德華 · Study in Germany</div>
      <div className="text-gray-600">
        列印於 {new Date().toLocaleString('zh-Hant')}
      </div>
    </div>
  );
}
