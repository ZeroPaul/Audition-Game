function choiceReversePercent() {
    return Math.random() < 0.8 ? 'i' : 'n';
}

function generateGroupArrows(mode, type_game) {
    const validArrows = {
        '4k': ['4', '8', '6', '2'],
        '8k': ['4', '8', '6', '2', '1', '3', '7', '9', '5'],
    };

    const arrrows_valids = validArrows[type_game] || [];
    
    const arrows_lenght = Math.floor(Math.random() * 8) + 4;
    const new_arrows = [];

    for (let i = 0; i < arrows_lenght; i++) {
        const random_index = Math.floor(Math.random() * arrrows_valids.length);
        const random_number = arrrows_valids[random_index];
        const modeMap = {
            'n': 'n',
            'i': choiceReversePercent()
        };
        const modeValue = modeMap[mode] || 'n';
        new_arrows.push({ 'arrow': random_number, 'mode': modeValue });
    }

    return new_arrows;
}

