export function ProjectsSkeleton() {
  return (
    <section id="work" className="min-h-screen px-2 py-4 sm:px-3">
      <div className="mx-auto">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="relative aspect-[3/4] bg-muted overflow-hidden" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
