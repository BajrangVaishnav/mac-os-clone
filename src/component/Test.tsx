import React, { useState, useEffect } from 'react';

const Test: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Failed to enter full-screen:", err);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Listen for full-screen change events
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button
        onClick={toggleFullScreen}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isFullScreen ? "Exit Full Screen" : "Go Full Screen"}
      </button>

      <div className="mt-8 p-8 bg-white rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isFullScreen ? "You're in Full Screen Mode! 🚀" : "Click to Enter Full Screen"}
        </h1>
        <p className="text-gray-700">
          This will hide the browser UI (address bar, tabs, etc.).
        </p>
      </div>
    </div>
  );
};

export default Test;