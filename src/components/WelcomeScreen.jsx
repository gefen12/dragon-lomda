import React from "react";

function WelcomeScreen({ onStart }) {
    return (
      <div className="welcome-screen">
        <h1>לומדת דרקונית</h1>
        <p className="startBtn" onClick={onStart}>בואו נתחיל</p>
      </div>
    );
  }
  
  export default WelcomeScreen;