<<<<<<< HEAD
export default function formattedDate(d: any) {
  // eslint-disable-next-line no-param-reassign
  d = new Date();
=======
export default function formattedDate(d = new Date()) {
>>>>>>> 5f940206d53cf65d4ebd16748a5f072d8ff3b345
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join('/');
}
