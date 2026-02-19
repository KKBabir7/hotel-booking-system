(function() {
  // 1. Inject loader HTML and CSS instantly
  document.write(`
    <style>
.loading-icon{
   display: flex;
   align-items: center;
       justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 9999999999;
    background: rgba(250, 250, 250, 0.9);
}
.loading-icon img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

  .dual-ring-advanced {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 0px solid transparent;
      border-top: 3px solid rgb(57, 64, 152);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .ring.ring2 {
      border-top-color: rgb(57, 64, 152);
      animation-duration: 1.5s;
      animation-direction: reverse;
    }

    .ball {
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: rgba(57, 63, 152,0);
      border-radius: 50%;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
    }

    .ring2 .ball {
      background-color: rgba(57, 63, 152, 0);
    }

    .ball2 {
      top: auto;
      bottom: -6px;
    }

    @keyframes spin {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    </style>
    <div class="loading-icon">
      <div class="dual-ring-advanced">
        <div class="ring ring1"><div class="ball ball1"></div></div>
        <div class="ring ring2"><div class="ball ball1"></div></div>
      </div>
    </div>
  `);

  // 2. Remove loader when page fully loaded
  window.addEventListener('load', function() {
    const loader = document.querySelector('.loading-icon');
    if(loader) loader.remove();
  });
})();



