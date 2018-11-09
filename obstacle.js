function Obstacle(x, y, w, h) {
    this.pos = createVector(x, y);
    this.size = createVector(w, h);

    this.show = function () {
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}