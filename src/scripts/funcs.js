jQuery(document).ready(() => {
  const gn = new GyroNorm();

  gn.init().then(() => {
    gn.start((data) => {
      let x = data.do.beta - 20;
      let y = data.do.gamma;

      const max = 55;
      const min = -max;

      x = Math.min(Math.max(x, min), max);
      y = Math.min(Math.max(y, min), max);

      jQuery('h1').css('text-shadow', `${y}px ${x}px 15px #c1c1c1`);
      jQuery('.border-top, .border-right, .border-bottom, .border-left')
        .css('box-shadow', `${y / 1.5}px ${x / 1.5}px 15px #c1c1c1`);
    });
  });
});
