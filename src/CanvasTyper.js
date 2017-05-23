import Letter from './Letter';
import requestAnimFrame from './AnimationSupport';
import CanvasSupport from './CanvasSupport';

// The HSL is a color value from 0 - 360
let hue = 0;
// This will hold our array of letters
const letters = [];
// Canvas methods
const canvas = document.getElementById('canvasTyper');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function printLetter(event) {
  event.preventDefault();
  // Get the letter that the user has pressed
  const eventCode = event.which || event.charCode || event.keyCode;
  const letter = String.fromCharCode(eventCode);
  // Set random values for the x and y coords of the letter
  const [x, y] = [Math.random() * canvas.width, Math.random() * canvas.height];
  // Increment the hue by 30
  hue += 15;
  // If we reach the upper bound of hue, reset it
  if (hue >= 360) {
    hue = 0;
  }
  // Create a new Letters Object passing in the letter pressed, coords and hue value
  const lettersObj = new Letter(letter, x, y, hue);
  // Push your letter onto the Array
  letters.push(lettersObj);
}


function draw() {
  // Uncomment the below line to show the letters going in slow motion
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  letters.forEach((letter) => {
    const localLetter = letter;
    const canvasLeeway = canvas.height + 60;
    // If the letter has past the canvas + 60 (aribitrary number, adjust to your liking)
    if (localLetter.y >= canvasLeeway) {
      localLetter.y = canvasLeeway;
    } else {
      // Increment the Y pos of the letter, moving it down 1 at a time
      localLetter.y += 1;
      // Draw the letter
      localLetter.draw(ctx);
    }
  });
  // We must request a new frame and do it all over again.
  requestAnimFrame(draw);
}

const message = document.createElement('div');
message.id = 'message';
message.textContent = 'Start typing!';
document.body.insertBefore(message, canvas);

export default function init() {
  if (!CanvasSupport) {
    message.innerHTML = 'Sorry Canvas is not supported';
  } else {
    draw();
  }
}

document.addEventListener('keypress', (event) => {
  message.innerHTML = '';
  // Start the magic
  printLetter(event);
});
