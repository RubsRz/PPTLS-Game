var x = 0;

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    })
}

async function play(me) {

    temp = setInterval(changeImage, 200);

    var text = ["EMPATE :|", "¡GANAS!", "PIERDES :("];
    var options = ["rock", "paper", "scissors", "lizard", "spock"]

    var game = [
        [0, 1, 2, 2, 1],
        [2, 0, 1, 1, 2],
        [1, 2, 0, 2, 1],
        [1, 2, 1, 0, 2],
        [2, 1, 2, 1, 0]
    ]

    var cpu = Math.floor((Math.random() * 5));



    var result = game[cpu][me];

    console.log("Tu juegas " + options[me]);
    console.log("cpu: " + options[cpu]);
    console.log(text[result]);


    document.getElementById("user-img").src = "./img/" + options[me] + ".svg";
    await sleep(1200);

    document.getElementById("start-text").innerHTML = text[result];
    document.getElementById("cpu-img").src = "./img/" + options[cpu] + ".svg";
    x = 0;
}


function changeImage() {

    var images = [
        "/img/rock.svg",
        "/img/paper.svg",
        "/img/scissors.svg",
        "/img/lizard.svg",
        "/img/spock.svg"
    ]

    if (x > images.length - 1) {
        clearInterval(temp);
    }

    document.getElementById("cpu-img").src = images[x];
    x++;
}