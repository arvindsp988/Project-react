import React, { useState, useEffect } from 'react';

function Test() {
  const [isDivVisible, setDivVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setDivVisible(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isDivVisible ? (
        <div>
          <h1>This is div 2.</h1>
        </div>
      ) : (
        <div>
          <h1>This is div 1.</h1>
        </div>
      )}
    </div>
  );
}

export default Test;
