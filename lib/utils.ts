export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const sizeFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

/** Formats a plot size range in square yards, e.g. "100 – 250 sq yd". */
export function formatSizeRange(min: string, max: string) {
  const values = [min, max]
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number)
    .filter((value) => Number.isFinite(value));

  if (values.length === 0) {
    return "—";
  }

  const [low, high] = [Math.min(...values), Math.max(...values)];

  return low === high
    ? `${sizeFormatter.format(low)} sq yd`
    : `${sizeFormatter.format(low)} – ${sizeFormatter.format(high)} sq yd`;
}
