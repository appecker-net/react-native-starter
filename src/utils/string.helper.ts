export const maskAndDisplayLastFourDigits = (inputString?: string) => {
  if (typeof inputString !== 'string') {
    return '';
  }
  if (inputString.length <= 4) {
    return inputString;
  }

  const displayString =
    '*'.repeat(Math.max(0, inputString.length - 4)) + inputString.slice(-4);

  return displayString;
};
export const concatenateIfValidStrings = (strings?: (string | undefined)[]) => {
  if (strings?.some(s => !s)) {
    return '';
  }
  return strings?.join('');
};

export const titleCaseString = (s: string) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : ' ' + d.toUpperCase(),
  );
