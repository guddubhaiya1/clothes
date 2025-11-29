export function SaleBanner() {
  return (
    <div className="w-full relative overflow-hidden sticky top-16 z-40 bg-red-600 dark:bg-red-700 py-2.5 md:py-3.5 shadow-xl mt-6 mb-4">
      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 opacity-80 animate-light-sweep" />
      
      {/* Animated bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 opacity-80 animate-light-sweep-reverse" />
      
      {/* Scrolling content container */}
      <div className="relative px-4 overflow-hidden">
        <div className="flex items-center gap-8 animate-scroll-horizontal whitespace-nowrap">
          {/* Repeat the message multiple times for seamless scrolling */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 flex-nowrap">
              <span className="text-lg md:text-xl font-black text-white dark:text-yellow-100 tracking-wider drop-shadow-lg">
                🔥 SALE IS GOING ON 🔥
              </span>
              <span className="text-sm md:text-base font-bold text-white dark:text-yellow-100 px-3 py-1 rounded-full bg-yellow-400/30 dark:bg-yellow-300/20 backdrop-blur-sm border-2 border-yellow-300/50 dark:border-yellow-200/40 drop-shadow-lg">
                MINIMUM 70% OFF
              </span>
              <span className="text-xs md:text-sm text-yellow-100 dark:text-yellow-50 font-semibold italic drop-shadow-lg">
                (Yes, we're THAT generous 😏)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
