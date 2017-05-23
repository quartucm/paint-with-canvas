export default class Letter {
  constructor(letter, x, y, hue) {
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.hue = hue;
  }
  draw(ctx) {
    ctx.font = '80px Arial';
    ctx.fillStyle = `hsl(${this.hue}, 100%, 75%)`;
    ctx.fillText(this.letter, this.x, this.y);
  }
}
