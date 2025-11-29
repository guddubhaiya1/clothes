export function SaleBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-accent via-accent to-accent/80 dark:from-neon-cyan dark:via-neon-cyan dark:to-accent py-3 px-4 text-center animate-banner-flash shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-sm md:text-base font-bold text-card dark:text-card tracking-wider">
          SALE IS GOING ON
        </span>
        <span className="text-xs md:text-sm font-semibold text-card dark:text-card/90 px-2 py-1 rounded-full bg-card/20 dark:bg-foreground/20">
          MINIMUM 70% OFF
        </span>
      </div>
    </div>
  );
}
