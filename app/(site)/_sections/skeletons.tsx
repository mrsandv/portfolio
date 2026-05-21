function Box({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-secondary ${className}`} />;
}

export function NavbarSkeleton() {
  return (
    <header className="fixed top-0 z-50 w-full py-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-12 animate-pulse rounded-full border border-border/40 bg-secondary/60 backdrop-blur-md" />
      </div>
    </header>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative px-6 pt-28 pb-12 md:pt-32">
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 md:grid-cols-4">
        <Box className="md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-2 h-64" />
        <Box className="md:col-start-4 md:row-start-1 md:row-end-3 min-h-[300px]" />
        <Box className="md:col-start-1 md:row-start-2 h-32" />
        <Box className="md:col-start-2 md:row-start-2 h-32" />
        <Box className="md:col-start-3 md:row-start-2 h-32" />
      </div>
    </section>
  );
}

export function BentoSkeleton() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <Box className="md:col-span-4 h-24" />
          <Box className="md:col-span-4 h-12" />
          <Box className="md:col-span-2 md:row-span-2 h-96" />
          <Box className="md:col-span-2 h-80" />
          <Box className="h-72" />
          <Box className="h-72" />
        </div>
      </div>
    </section>
  );
}

export function StackProcessSkeleton() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="space-y-6">
          <Box className="h-8 w-48" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Box key={i} className="h-28" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Box className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} className="h-56" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTASkeleton() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-12 text-center">
        <Box className="mx-auto h-32 w-3/4 md:h-48" />
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Box key={i} className="h-14 w-40" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactFAQSkeleton() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <Box className="h-8 w-48" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Box className="h-14" />
              <Box className="h-14" />
            </div>
            <Box className="h-32" />
            <Box className="h-14" />
          </div>
          <div className="space-y-3">
            <Box className="h-8 w-48" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} className="h-20" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="px-6 py-12 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl">
        <Box className="h-24" />
      </div>
    </footer>
  );
}
