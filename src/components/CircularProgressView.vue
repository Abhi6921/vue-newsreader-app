<template>
    <div class="circular-progress-container">
      <div class="circular-progress">
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <p class="loading-text">Fetching articles...</p>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  .circular-progress-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Set the height to center vertically */
  }
  
  .circular-progress {
    width: 50px;
    height: 50px;
    position: relative;
    transform: rotate(-90deg); /* Start the rotation from the top */
  }
  
  .circle {
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-radius: 50%;
    position: absolute;
    animation: spin 1.5s linear infinite;
  }
  
  .circle:nth-child(1) {
    border-top-color: #007bff; /* Change this to set the progress color */
  }
  
  .circle:nth-child(2) {
    border-top-color: #f3f3f3; /* Change this to set the background color */
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .loading-text {
    font-size: 1.5rem;
    margin-top: 10px;
    color: #ffffff;
  }
  </style>
  