console.clear();
const score = document.querySelector('.score');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const audio = document.querySelector('#drum');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

const bar = {
  sx: undefined,
  sy: canvas.height - 10,
  ex: undefined,
  ey: canvas.height,
};

let currentScore = 0;
audio.play().then((e) => {
  audio.play();
});
class UserBoundary {
  constructor(x) {
    this.x = x;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, canvas.height - 10, 200, canvas.height);
  }

  update(x) {
    this.x = x - 100;
    bar.sx = this.x;
    bar.ex = this.x + 200;
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sx = 10;
    this.sy = 10;
    this.size = 15;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  check() {}

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.sx = -this.sx;
    }
    if (this.y > canvas.height - this.size || this.y < this.size + 20) {
      this.sy = -this.sy;
    }
    this.x += this.sx;
    this.y += this.sy;

    if (this.x >= bar.sx && this.x <= bar.ex) {
      if (this.y <= bar.ey && this.y >= bar.sy) {
        if (currentScore >= 10) {
          this.sx += 5;
          this.sy += 5;
        }
        currentScore++;
        scoreHandler();
      }
    }
  }
}
function scoreHandler() {
  score.innerHTML = currentScore;
}
function defenderBoundary() {
  ctx.fillStyle = 'orange';
  ctx.fillRect(0, 0, canvas.width, 10);
}

const ball = new Ball(canvas.width / 2, canvas.height / 2);
ball.draw();

function bounce() {
  ctx.clearRect(0, 10, canvas.width, canvas.height - 20);
  ball.update();
  ball.draw();
  requestAnimationFrame(bounce);
}

const user = new UserBoundary(canvas.width / 2 - 100);
user.draw();

window.addEventListener('mousemove', (e) => {
  user.update(e.x);
  ctx.clearRect(0, canvas.height - 10, canvas.width, canvas.height - 10);
  user.draw();
});
window.addEventListener('touchmove', (e) => {
  user.update(e.touches[0].clientX);
  ctx.clearRect(0, canvas.height - 10, canvas.width, canvas.height - 10);
  user.draw();
});

bounce();
scoreHandler();
defenderBoundary();
