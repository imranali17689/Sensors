/**
 * Subtle enter animation when opening the trends route.
 */
export default function TrendsTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="animate-page-in motion-reduce:animate-none">{children}</div>
  );
}
