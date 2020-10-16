function begin () {
  var screen_width = window.innerWidth;
  var screen_height = window.innerHeight;
  var vid = document.getElementById('vid');

  var cvs = document.getElementById('cvs_pix');
  cvs.width = '480';
  cvs.height = '480';

  cvs.style.position = 'absolute';
  cvs.style.top = (screen_height / 2) - (cvs.height / 2) + 'px';
  cvs.style.left = (-1 * cvs.width) + 'px';
  var end_left = Math.floor((screen_width - cvs.width) / 2);

  show_vid(vid, cvs);

  slide_vid(cvs, 1, 5, end_left);
  vid.play();
}

// https://stackoverflow.com/questions/4429440/html5-display-video-inside-canvas
function show_vid (video, canvas) {
  var ctx = canvas.getContext('2d');

  video.addEventListener('play', () => {
    function step() {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step);
  });
}

async function slide_vid (canvas, direction, speed, end_left) {
  var top = Number(canvas.style.top.split('px')[0]);

  do {
    await sleep(speed);
    place_vid(canvas, left + direction, top);
    var left = Number(canvas.style.left.split('px')[0]);
  } while (left != end_left)
}

function place_vid(vid, x, y) {
  vid.style.left = x + 'px';
  vid.style.top = y + 'px';
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
