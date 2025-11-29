export function SaleBanner() {
  return (
    <div className="w-full relative overflow-hidden sticky top-16 z-40">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-neon-purple to-accent/90 dark:from-neon-cyan dark:via-neon-pink dark:to-neon-purple opacity-90 animate-gradient-shift" />
      
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/10 opacity-20 animate-shimmer-horizontal" />
      
      {/* Content */}
      <div className="relative px-4 py-3 md:py-4 flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-base md:text-lg font-black text-white dark:text-black tracking-wider animate-text-pulse">
            🔥 SALE IS GOING ON 🔥
          </span>
          <span className="text-xs md:text-sm font-bold text-white dark:text-black px-3 py-1.5 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-black/30 animate-badge-bounce">
            MINIMUM 70% OFF
          </span>
        </div>
        
        {/* Sarcastic subtext */}
        <div className="text-xs md:text-sm text-white/80 dark:text-black/80 font-semibold italic ml-2 animate-fade-in-out">
          (Yes, we're that generous 😏)
        </div>
      </div>
      
      {/* Animated border lights */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-green opacity-50 animate-light-sweep" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-pink opacity-50 animate-light-sweep-reverse" />
    </div>
  );
}
