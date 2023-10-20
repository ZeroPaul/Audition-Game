function generateArray() {
    const arrrows_valids = ['4', '8', '6', '2'];
    const arrows_lenght = Math.floor(Math.random() * 8) + 6;
    const new_array = [];

    for (let i = 0; i < arrows_lenght; i++) {
        const random_index = Math.floor(Math.random() * arrrows_valids.length);
        const random_number = arrrows_valids[random_index];
        new_array.push(random_number);
    }

    return new_array;
}

function equalArrays(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function keyNumber(key) {
    const keyMap = {
        "arrowleft": "4",
        "arrowup": "8",
        "arrowright": "6",
        "arrowdown": "2"
    };
    return keyMap[key] || key;
}

function numberToIcons(number) {
    const iconMap = {
        "4": "arrow_back",
        "8": "arrow_upward",
        "6": "arrow_forward",
        "2": "arrow_downward"
    };

    return iconMap[number] || number;
}


function generateArrows(array_arrows, bar_arrows, type_mode) {
    array_arrows.forEach(arrow_one => {
        let new_icon = document.createElement("i");
        new_icon.className = "material-icons arrow-icon";
        new_icon.textContent = numberToIcons(arrow_one);
        let new_arrow = document.createElement("div");
        if (type_mode === "n") {
            new_arrow.className = "arrow arrow-blue";
        } else if (type_mode === "i") {
            new_arrow.className = "arrow arrow-red";
        }
        new_arrow.setAttribute("data-arrow", arrow_one);
        new_arrow.appendChild(new_icon);
        bar_arrows.appendChild(new_arrow);
    });
    arrows = document.querySelectorAll('.arrow');
}

function newMode(type_mode) {
    while (bar.firstChild) {
        bar.removeChild(bar.firstChild);
    }
    entry_letter = [];
    generateArrows(letters, bar, type_mode);
}


function nomalKeyDown(event) {
    if (locked === true) {
        const key_press = event.key.toLowerCase();
        entry_letter.push(keyNumber(key_press));

        if (equalArrays(letters.slice(0, entry_letter.length), entry_letter)) {
            arrows[entry_letter.length - 1].classList.remove("arrow-blue");
            arrows[entry_letter.length - 1].classList.add("arrow-green");
        } else {
            entry_letter = []
            arrows.forEach(arrow => {
                arrow.classList.remove("arrow-green");
                arrow.classList.add("arrow-blue");
            });
        }

        if (letters.length === entry_letter.length) {
            locked = false;
        }
    } else {
        if (event.key.toLowerCase() === "control") {
            while (bar.firstChild) {
                bar.removeChild(bar.firstChild);
            }
            letters = generateArray();
            generateArrows(letters, bar, "n");
            locked = true;
            entry_letter = []

        }
    }
}

function reverseNotes(list_notes) {
    const reverse_arrow = {
        "4": "6",
        "6": "4",
        "8": "2",
        "2": "8",
    };
    const list_reverse = list_notes.map((element) => reverse_arrow[element] || element);
    return list_reverse;
}

function reverseArrow(element) {
    const arrowMap = {
        "arrow_back": "arrow_forward",
        "arrow_forward": "arrow_back",
        "arrow_upward": "arrow_downward",
        "arrow_downward": "arrow_upward"
    };

    return arrowMap[element] || element;
}

function inversaKeyDown(event) {
    if (locked === true) {
        let letters_reverse = reverseNotes(letters);
        const key_press = event.key.toLowerCase();
        entry_letter.push(keyNumber(key_press));

        if (equalArrays(letters_reverse.slice(0, entry_letter.length), entry_letter)) {
            arrows[entry_letter.length - 1].classList.remove("arrow-red");
            arrows[entry_letter.length - 1].classList.add("arrow-green");
            arrows[entry_letter.length - 1].firstChild.textContent = reverseArrow(arrows[entry_letter.length - 1].firstChild.textContent);
        } else {
            entry_letter = []
            arrows.forEach((arrow, index) => {
                arrow.firstChild.textContent = numberToIcons(letters[index]);
                arrow.classList.remove("arrow-green");
                arrow.classList.add("arrow-red");
            });
        }

        if (letters.length === entry_letter.length) {
            locked = false;
        }
        } else {
            if (event.key.toLowerCase() === "control") {
                while (bar.firstChild) {
                    bar.removeChild(bar.firstChild);
                }
                letters = generateArray();
                generateArrows(letters, bar, "i");
                locked = true;
                entry_letter = []
            }
    }
}


function modeGame(radio_buttons) {
    radio_buttons.forEach((radioButton) => {
        radioButton.addEventListener('change', (event) => {
            if (event.target.checked) {
                if (event.target.value === 'n') {
                    newMode(event.target.value);
                    console.log("mode normal");
                    document.removeEventListener('keydown', inversaKeyDown);
                    document.addEventListener('keydown', nomalKeyDown);
                } else if (event.target.value === 'i') {
                    newMode(event.target.value);
                    console.log("mode inversa");
                    document.removeEventListener('keydown', nomalKeyDown);
                    document.addEventListener('keydown', inversaKeyDown);
                }
            }
        });
    });
}


let arrows = document.querySelectorAll('.arrow');
let letters = generateArray();
let entry_letter = [];
let bar = document.getElementById("bar-arrows");
let locked = true;

const radioButtons = document.querySelectorAll('input[name="options"]');
modeGame(radioButtons);