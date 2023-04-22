
class waisted {
    constructor(canvas, size = 100) {
        this.canvas = canvas;
        this.canvas.width = size * 2.5;
        this.canvas.height = size * 2.5;
        this.ctx = this.canvas.getContext("2d");
        this.fill = 0;
        this.x = 0;
        this.y = 0;
        this.size = size;
        this.addEvents()
    }
    draw() {
        let captured = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "green"
        //first part
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2, this.size, Math.PI * 1.5, Math.PI, true);
        this.ctx.lineTo(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2);
        this.ctx.lineTo(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2 - this.size);
        this.ctx.stroke();
        if (this.fill >= 1) {
            this.ctx.fill()
        }
        this.ctx.closePath();
        if (this.ctx.isPointInPath(this.x, this.y)) {
            this.fill = 1;
            captured = true;
        }
        //second part
        this.ctx.beginPath();

        this.ctx.arc(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2, this.size, Math.PI / 2, Math.PI);
        this.ctx.lineTo(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2);
        this.ctx.lineTo(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2 + this.size);
        this.ctx.stroke();
        if (this.fill >= 2) {
            this.ctx.fill()
        }
        this.ctx.closePath();
        if (this.ctx.isPointInPath(this.x, this.y)) {
            this.fill = 2;
            captured = true;
        }
        //third part
        this.ctx.beginPath();

        this.ctx.arc(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2, this.size, 0, Math.PI / 2);
        this.ctx.lineTo(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2);
        this.ctx.lineTo(this.canvas.clientWidth / 2 + this.size, this.canvas.clientHeight / 2)
        this.ctx.stroke();
        if (this.fill >= 3) {
            this.ctx.fill();
        }
        this.ctx.closePath();
        if (this.ctx.isPointInPath(this.x, this.y)) {
            this.fill = 3;
            captured = true;
        }
        //fourth part
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2, this.size, Math.PI * 1.5, 0);
        this.ctx.lineTo(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2);
        this.ctx.lineTo(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2 - this.size);
        this.ctx.stroke();
        if (this.fill >= 4) {
            this.ctx.fill();
        }
        this.ctx.closePath();
        if (this.ctx.isPointInPath(this.x, this.y)) {
            this.fill = 4;
            captured = true;
        }
        if (!captured) {
            this.fill = 0;
        }
    }
    addEvents() {
        this.canvas.addEventListener("mousemove", (e) => {
            this.x = e.clientX - this.canvas.offsetLeft;
            this.y = e.clientY - this.canvas.offsetTop;
        })
        this.interval = setInterval(() => {
            this.draw();
        }, 100);
        this.canvas.addEventListener("click", (e) => {
            if (this.fill > 0) {
                alert(this.fill)
            }
        })
    }
}
let waist = new waisted(document.querySelector("#removeItem canvas"), 200);