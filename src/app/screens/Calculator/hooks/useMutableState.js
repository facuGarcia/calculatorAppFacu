import { useState, useRef } from 'react';

const useMutableState = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const valueRef = useRef(value);
  valueRef.current = value;

  return [valueRef, setValue];
};

export default useMutableState;
