export function formatDate(d) {
  const time = `${d.getHours() < 10 ? '0' : ''}${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}${d.getMinutes()}`;
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  return `${time} | ${date}`;
}

export function limitText(string, limit) {
  if (string.length > limit) {
    string = string.substring(0, limit) + '...';
  }

  return string;
}
