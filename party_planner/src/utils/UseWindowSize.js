import { useState, useEffect } from 'react';

//get window size returns the width and height of users window
const getWindowSize = () => {
    // destructuring width and height from the window object
  const { innerWidth: width,  innerHeight: height } = window

  return {
    width,
    height
  }
}

const useWindowSize = () => {

    // setting the initial state to the window size
  const [windowSize, setWindowSize] = useState(getWindowSize())

  useEffect(() => {
    // callback function to update our window size state on resize
    const handleResize = () => setWindowSize(getWindowSize());

    // setting an event listener for a window resize, then using the callback above to update our state
    window.addEventListener('resize', handleResize);

    // clean up of our event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;

}

export default useWindowSize