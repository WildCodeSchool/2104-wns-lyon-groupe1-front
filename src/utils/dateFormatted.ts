export default function formattedDate(d: any) {
  // eslint-disable-next-line no-param-reassign
  d = new Date();
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join('/');
}
