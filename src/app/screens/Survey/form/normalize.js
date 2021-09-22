export const normalizePhone = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
  }
  return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 6)}-${onlyNums.slice(6, 10)}`;
};

export const normalizeName = value => {
  if (!value) {
    return value;
  }
  return value.replace(/[^a-zA-Z]/g, '');
};

