// Professional AdSlot for Google AdSense / Custom Ads
// Replace with your AdSense code

export default function AdSlot({ type = 'banner', className = '' }) {
  if (type === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-gray-50 to-gray-100 border border-dashed border-gray-200 rounded-2xl p-6 text-center ${className}`}>
        <p className="text-[10px] tracking-[0.2em] text-gray-400 font-bold mb-2">ADVERTISEMENT</p>
        <div className="h-[90px] flex items-center justify-center bg-white rounded-xl">
          <span className="text-sm text-gray-400">Google AdSense - 728x90 Banner<br/>Replace this component with your ad code</span>
        </div>
        {/* Real AdSense:
        <ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-XXXXXXXX"
          data-ad-slot="XXXXXXXX"
          data-ad-format="auto"></ins>
        */}
      </div>
    )
  }

  if (type === 'sidebar') {
    return (
      <div className={`bg-white border rounded-2xl p-4 ${className}`}>
        <p className="text-[10px] tracking-widest text-gray-400 font-bold mb-3">SPONSORED</p>
        <div className="space-y-3">
          <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center text-xs text-gray-500">
            300x250 Ad Unit
          </div>
          <p className="text-xs text-gray-400">Monetize with AdSense, affiliate links, or sell this space</p>
        </div>
      </div>
    )
  }

  return null
}
