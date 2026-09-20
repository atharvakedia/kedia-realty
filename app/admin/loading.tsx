export default function AdminLoading() {
  return (
    <section
      className="min-h-dvh bg-soft-white px-5 py-8 md:px-8 md:py-10"
      aria-label="Loading admin page"
      aria-busy="true"
    >
      <div className="mx-auto max-w-7xl animate-pulse motion-reduce:animate-none">
        <div className="border border-border-gray bg-white">
          <div className="flex items-center gap-4 border-b border-border-gray p-5 md:p-6">
            <div className="h-14 w-28 bg-cool-mist md:h-16" />
            <div className="grid gap-3">
              <div className="h-6 w-36 bg-cool-mist" />
              <div className="h-3 w-52 bg-cool-mist" />
            </div>
          </div>
          <div className="grid gap-4 p-6 md:p-8">
            <div className="h-3 w-36 bg-cool-mist" />
            <div className="h-11 w-64 max-w-full bg-cool-mist" />
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="h-44 border border-border-gray bg-white" />
          <div className="h-44 border border-border-gray bg-white" />
        </div>
      </div>
    </section>
  );
}
