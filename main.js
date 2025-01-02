const divs = document.querySelectorAll('.custom-box-1');
const players = document.querySelectorAll('.pp');
const load = document.querySelector('.load');
const single = document.querySelector('.single');
const multi = document.querySelector('.multi');
const win = document.querySelector('.win');
const back = document.querySelector('.back');

const p = ['X', 'O'];

let current = 'X';
const boxes = Array(9);
boxes.fill(null);

const winPat = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let _win = false;

const checkWinner = () => {
    for (const pat of winPat) {
        const pos1 = boxes[pat[0]];
        const pos2 = boxes[pat[1]];
        const pos3 = boxes[pat[2]];

        if(pos1 !== null && pos2 !== null && pos3 !== null) {
            if(pos1 == pos2 && pos2 == pos3) {
                const t = `<p class="text-white">Winner Is Player <span>${current}</span></p>`;
                win.innerHTML = t;
                load.style.display = "block";
                _win = true;
            }
        }

    }
    if(boxes[0] !== null && boxes[1] !== null && boxes[2] !== null && boxes[3] !== null &&
        boxes[4] !== null && boxes[5] !== null && boxes[6] !== null && boxes[7] !== null &&
        boxes[8] !== null
    ) {
        const t = `<p class="text-white">Match Is Tie</p>`;
        win.innerHTML = t;
        load.style.display = "block";  
    }
}

back.onclick = () => {
    win.innerHTML = "";
    load.style.display = "block"; 
}

multi.onclick = () => {
    current = p[Math.floor(Math.random() * 2)];
    load.style.display = "none";
    boxes.fill(null);
    divs.forEach(div => {
        div.innerText = "";
        div.classList.remove('selected');
    })
    divs.forEach(div => {
        div.onclick = multiPlayer;
    })
    players[0].innerText = current;
    players[1].innerText = current === "X" ? "O" : "X";
}

const multiPlayer = e => {
    e.target.innerText = current;
    boxes[e.target.id] = current;
    e.target.onclick = null;
    e.target.classList.add('selected');
    checkWinner();
    current = current === "X" ? "O" : "X";
}

single.onclick = () => {
    current = p[Math.floor(Math.random() * 2)];
    load.style.display = "none";
    _win = false;
    boxes.fill(null);
    divs.forEach(div => {
        div.innerText = "";
        div.classList.remove('selected');
    })
    divs.forEach(div => {
        div.onclick = singlePlayer;
    })
    players[0].innerText = current;
    players[1].innerText = current === "X" ? "O" : "X";
}

const singlePlayer = e => {
    e.target.innerText = current;
    boxes[e.target.id] = current;
    e.target.onclick = null;
    e.target.classList.add('selected');
    checkWinner();
    current = current === "X" ? "O" : "X";
    setTimeout(() => computer(), 50);  
}

// computer
const computer = () => {
    for(;;) {
        let ran = Math.round(Math.random() * 9);
        console.log(_win)
        if(boxes[ran] == null && !_win) {
            boxes[ran] = current;
            divs[ran].innerText = current;
            divs[ran].classList.add('selected');
            divs[ran].onclick = null;
            checkWinner();
            current = current === "X" ? "O" : "X";
            break;
        } else if(_win) break;
    }
}



