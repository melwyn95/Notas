const WHITE = {
    label: 'white',
    value: '#f5f5f5',
    circleColor: '#e0e0e0',
    optionColor: '#fbc02d',
}
const RED = {
    label: 'red',
    value: '#ef9a9a',
    circleColor: '#ef5350',
    optionColor: '#ef5350',
}
const GREEN = {
    label: 'green',
    value: '#a5d6a7',
    circleColor: '#43a047',
    optionColor: '#43a047',
}
const BLUE = {
    label: 'blue',
    value: '#90caf9',
    circleColor: '#1e88e5',
    optionColor: '#1e88e5',
}
const YELLOW = {
    label: 'yellow',
    value: '#fff59d',
    circleColor: '#fbc02d',
    optionColor: '#fbc02d',
}

const colors = [WHITE, RED, GREEN, BLUE, YELLOW];

const getColorFromLabel = (label, color) => {
    const filteredColor = colors.filter(color => color.label === label)[0];
    return filteredColor ? filteredColor[color] : WHITE.value;
}

export {
    WHITE,
    RED,
    GREEN,
    BLUE,
    YELLOW,
    getColorFromLabel,
}

export default colors;