function begin () {
  var cvs = document.getElementById('cvs_pix');
  cvs.style.position = 'absolute';
  cvs.style.top = '100px';
  //alert(cvs.style.width);
  cvs.style.width = '-200px';
  cvs.style.left = '-100px'; //-1 * cvs.style.width.split('px')[0];

  show_vid();
  move_vid();
}

function show_vid () {
  var canvas = document.getElementById('cvs_pix');
  var ctx = canvas.getContext('2d');
  var video = document.getElementById('vid');

  video.addEventListener('play', function() {
    var $this = this; //cache
    (function loop() {
      if (!$this.paused && !$this.ended) {
        ctx.drawImage($this, 0, 0);
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
    })();
  }, 0);
}

async function move_vid (derp) {
  var cvs = document.getElementById('cvs_pix');
  
  for(ii = 0; ii < 10000; ii++) {
    var left = Number(cvs.style.left.split('px')[0]);
    var top = Number(cvs.style.top.split('px')[0]);
    await sleep(100);
    place_vid(cvs, left + 1, top);
  }
}

function place_vid(vid, x, y) {
  vid.style.left = x + 'px';
  vid.style.top = y + 'px';
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
