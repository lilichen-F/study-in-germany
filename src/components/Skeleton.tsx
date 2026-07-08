export function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`bg-surface-hover rounded-lg animate-pulse ${className ?? ''}`}
      aria-hidden
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card space-y-2">
      <SkeletonBox className="h-4 w-1/3" />
      <SkeletonBox className="h-6 w-2/3" />
      <SkeletonBox className="h-16 w-full" />
    </div>
  );
}

export function SkeletonList({ n = 3 }: { n?: number }) {
  return (
    <div className="space-y-3" role="status" aria-label="載入中">
      {Array.from({ length: n }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
