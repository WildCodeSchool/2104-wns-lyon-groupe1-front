/* export default function formattedDate(d: any) {
  // eslint-disable-next-line no-param-reassign
  d = new Date();
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join('/');
} */

export default function formattedDate(d: Date): string | null {
  /*   console.log(d.getDate());
  console.log(d.getMonth());
  console.log(d.getFullYear());
  console.log(d);
 */
  if (d) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
      .map((n) => (n < 10 ? `0${n}` : `${n}`))
      .join('/');
  }
  return null;
}
