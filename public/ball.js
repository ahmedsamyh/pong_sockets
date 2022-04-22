class Ball {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        // this.vel = p5.Vector.random2D();
        this.vel = createVector(random(-1, 1), random(-1,1));
        this.speed = 2;
        this.vel.setMag(this.speed);
        this.r = 10;
        this.start_time = 60;
        this.start_time_max = this.start_time;
        this.speedup_time = 60*5;
        this.speedup_time_max = this.speedup_time;
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
    }

    update() {
        if (this.start_time == 0) {
            this.pos.add(this.vel);
        } else {
            this.start_time--;
        }
        if (this.speedup_time == 0){
            console.log(`ball speedup! speed:${this.speed} -> ${this.speed+0.1}`);
            this.speed+=0.1;
            this.vel.setMag(this.speed)
            this.speedup_time = this.speedup_time_max; 
        } else {
            this.speedup_time--;
        }

        this.vel.limit(10);
    }

    bounce(player, opp) {
        if (this.pos.y <= this.r || this.pos.y >= height - this.r) {
            this.vel.y *= -1;
        }

        if (player) {
            if (this.pos.x >= player.pos.x - player.w / 2 - this.r) {
                if (this.pos.y <= player.pos.y + player.h / 2 && this.pos.y >= player.pos.y - player.h / 2) {
                    this.vel.x *= -1;
                }
            }
        }

        if (opp) {
            if (this.pos.x <= opp.pos.x + opp.w / 2 + this.r) {
                if (this.pos.y <= opp.pos.y + opp.h / 2 && this.pos.y >= opp.pos.y - opp.h / 2) {
                    this.vel.x *= -1;
                }
            }
        }
    }

    reset() {
        this.pos.set(width / 2, height / 2);
        this.speed = 2;
        this.start_time = this.start_time_max;

        console.log(`ball reset!\nspeed:${this.speed}`);
    }
}