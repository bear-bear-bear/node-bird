import { useState, useCallback } from 'react';

export default (initialValue = null, deps = []) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, deps);

  return [value, handler];
};
