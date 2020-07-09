import Cell from "../classes/cell";

export function empty(array: any): boolean {
    return !(isArray(array) && array.length !== 0);
}

export function isArray(item: any): boolean {
    return item instanceof Array;
}

export function isUndefined(item: any): boolean {
    return item === undefined;
}

export function isNull(item: any): boolean {
    return item === null;
}

export function exists(item: any): boolean {
    return !isNull(item) && !isUndefined(item);
}

/**
 * Проверка существования клетки с заданными координатами в сетке
 * @param cellGrid - сетка
 * @param j        - номер строки
 * @param i        - номер ячейки в строке
 */
export function cellExists(
    cellGrid: Array<Array<Cell>>,
    j: number,
    i: number
): boolean {
    let row = cellGrid[j];

    return exists(row) && exists(row[i]);
}