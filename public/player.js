class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.w = 20;
        this.h = 100;
        this.speed = 5;
        this.score = 0;
    }

    show(opp) {
        noStroke();
        if (opp) {
            fill(255, 88, 51);
        } else {
            fill(255);
        }
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    edges() {
        if (this.pos.y <= this.h / 2) {
            this.pos.y = this.h / 2;
        } else if (this.pos.y > height - this.h / 2) {
            this.pos.y = height - this.h / 2;
        }
    }

    controls(alt) {
        if (alt) {
            if (keyIsDown(87)) {
                // console.log('up');
                this.pos.y -= this.speed;
            }
            if (keyIsDown(83)) {
                // console.log('down');
                this.pos.y += this.speed;
            }

        } else {
            if (keyIsDown(UP_ARROW)) {
                // console.log('up');
                this.pos.y -= this.speed;
            }
            if (keyIsDown(DOWN_ARROW)) {
                // console.log('down');
                this.pos.y += this.speed;
            }

        }


    }
}