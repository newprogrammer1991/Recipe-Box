export function arrToMap(arr) {
    const map = arr.reduce((map, current) => {
        map[current.id] = current;
        return map;
    }, {})
    return map;
}

export function mapToArr(map) {
    return Object.keys(map).map(item => map[item])

}


export function propIs(obj) {
    for (let key in obj) {
        if (obj[key])return true;
    }
    return false;
}