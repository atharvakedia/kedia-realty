"use client";

type ProjectsPaginationProps = {
  ariaLabel: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function ProjectsPagination({
  ariaLabel,
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: ProjectsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={ariaLabel}
      className={`flex flex-col gap-4 border-t border-border-gray pt-6 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-gray">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="min-h-11 border border-border-gray px-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy transition hover:border-primary-navy hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex size-11 items-center justify-center border text-sm font-semibold transition",
                isActive
                  ? "border-primary-navy bg-primary-navy text-white"
                  : "border-border-gray bg-white text-primary-navy hover:border-primary-navy",
              ].join(" ")}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="min-h-11 border border-border-gray px-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy transition hover:border-primary-navy hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
