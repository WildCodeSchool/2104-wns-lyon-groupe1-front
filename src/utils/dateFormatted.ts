export default function formattedDate(d: Date): string | null {
  if (d) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
      .map((n) => (n < 10 ? `0${n}` : `${n}`))
      .join('/');
  }
  return null;
}
