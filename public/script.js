let p;
let opp;
let socket;
let start = false;
let other_id;
let name_input;
let room_input;
let create_room_btn;
let join_room_btn;
const setup_fs = document.getElementById('setup');

function addBreak(times) {
    for (let i = 0; i < times; i++) {
        setup_fs.append(document.createElement('br'));
    }
}
function setup() {
    console.log(name.value);
    const p5_canvas = createCanvas(800, 400);
    p5_canvas.id('p5_canvas');

    p = new Player(width - 50, height / 2);
    opp = new Player(50, height / 2);
    ball = new Ball();
    socket = io.connect('http://localhost:80');

    // Name input
    name_input = document.createElement('input');
    name_input.placeholder = 'Enter Your name...';
    setup_fs.append(name_input);

    addBreak(2);

    // Room input
    room_input = document.createElement('input');
    room_input.placeholder = 'Enter Room name...';
    setup_fs.append(room_input);

    addBreak(2);

    // create & join buttons
    create_room_btn = document.createElement('button');
    create_room_btn.innerHTML = 'Create';
    setup_fs.append(create_room_btn);
    join_room_btn = document.createElement('button');
    join_room_btn.innerHTML = 'Join';
    setup_fs.append(join_room_btn);
}

function draw() {

    //console.log(`sending data: ${data.y}`);
    socket.emit('data_ts', {
        y: p.pos.y,
        score: p.score
    });

    socket.on('data_tc', data => {
        opp.pos.y = data.y;
        opp.score = data.score;
        if (!other_id) {
            other_id = data.id;
        }
    })

    background(0);

    //console.log(start);
    // show and update player
    p.show();
    p.edges();
    p.controls();

    opp.show('opp');

    // show the scores
    textAlign(CENTER);
    textSize(24);
    fill(255);
    text(`${opp.score}₧`, width / 2 - 100, 50);
    text(`${p.score}₧`, width / 2 + 100, 50);

    // scoring
    if (ball.pos.x > p.pos.x + 50) {
        opp.score++;
        ball.reset();
    }
    if (ball.pos.x < opp.pos.x - 50) {
        p.score++;
        ball.reset();
    }

    stroke(255);
    line(width / 2, 0, width / 2, height);
}