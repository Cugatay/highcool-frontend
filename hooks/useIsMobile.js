import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [windowSize, setWindowSize] = useState(null);

  function handleResize() {
    // Set window width/height to state
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize ? windowSize < 769 : null;
};

export default useIsMobile;
