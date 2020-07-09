import {cellExists, empty, exists, isArray} from "../helpers/tools";
import Cell from "./cell";

/**
 * Класс сетки клеток
 */
export default class CellGrid {
    /** Количество клеток в сетке */
    private _cellNumber: number
        get cellNumber(): number {
            this._cellNumber = this.rowLength * this.rowsCount;
            return this._cellNumber;
        }

    /** Количество клеток в строке */
    private readonly _rowLength: number
        get rowLength(): number {
            return this._rowLength;
        }

    /** Количество строк в столбце */
    private readonly _rowsCount: number
        get rowsCount(): number {
            return this._rowsCount;
        }

    /** Количество клеток подряд для победы */
    private readonly _cellsToWin: number
        get cellsToWin(): number {
            return this._cellsToWin;
        }

    /** Сетка */
    private _list: Array<Array<Cell>>
        get list(): Array<Array<Cell>> {
            return this._list;
        }

    /**
     * Рекурсивная проверка существования клеток по вектору и совпадения их значений.
     * Если клетка существует и значение равно предыдущей клетке, то проваливаемся внутрь еще раз, до тех пор, пока условие не упадет.
     * После того, как условие упало, поднимаясь вверх собираем все успешные разы.
     */
    private __vectorChecker = (cell: Cell, vectorDirection: string): number => {
        let direction = vectorDirection;

        let ___recursive = (cell: Cell) => {
            let nextCell = cell.coordinateList[direction];
            return exists(nextCell) && (cell.playerId === nextCell.playerId)
                ? ___recursive(nextCell) + 1
                : 0;
        };

        return ___recursive(cell)
    };

    /** Обработчики для проверки сетки */
    private _vectorList = {
        topLeft: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'topLeft');
        },

        top: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'top');
        },

        topRight: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'topRight');
        },

        right: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'right');
        },

        bottomRight: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'bottomRight');
        },

        bottom: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'bottom');
        },

        bottomLeft: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'bottomLeft');
        },

        left: (cell: Cell): number => {
            return this.__vectorChecker(cell, 'left');
        }
    }

    /**
     * Конструктор
     * @param rowsCount
     * @param rowLength
     * @param cellsToWin
     */
    constructor(
        rowsCount: number = 3,
        rowLength: number = 3,
        cellsToWin: number = 3
    ) {
        this._rowLength = rowLength;
        this._rowsCount = rowsCount;
        this._cellsToWin = cellsToWin;

        this._prepareRowList();
        this._linkCells();
    }

    /**
     * Инициализация массива строк
     * @private
     */
    private _prepareRowList(): void {
        this._list = empty(this.list)
            ? Array.apply(
                null,
                {length: this.rowsCount}
            ).map(this._fillRow, this)
            : this.list;
    }

    /**
     * Наполнить строку значениями клеток
     * @param _
     * @param rowIndex
     * @private
     */
    private _fillRow(_: any, rowIndex: number): Array<Cell> {
        return Array.apply(
            null,
            {length: this.rowLength}
        ).map((_: any, index: number) => {
            let cell = new Cell;
            cell.id = rowIndex * this.rowLength + index;
            return cell;
        });
    }

    /**
     * Слинковать сетку между своими ячейками
     * @private
     */
    private _linkCells(): void {
        this.list.map((row: Array<Cell>, rowIndex: number) => {
            row.map((cell: Cell, cellIndex: number) => {
                let linkList = cell.coordinateList;
                let cellList = this.list;

                linkList.topLeft      = cellExists(cellList, rowIndex - 1, cellIndex - 1) ? cellList[rowIndex - 1][cellIndex - 1] : null;
                linkList.top          = cellExists(cellList, rowIndex - 1, cellIndex)        ? cellList[rowIndex - 1][cellIndex]     : null;
                linkList.topRight     = cellExists(cellList, rowIndex - 1, cellIndex + 1) ? cellList[rowIndex - 1][cellIndex + 1] : null;
                linkList.right        = cellExists(cellList, rowIndex, cellIndex + 1)        ? cellList[rowIndex][cellIndex + 1]     : null;
                linkList.bottomRight  = cellExists(cellList, rowIndex + 1, cellIndex + 1) ? cellList[rowIndex + 1][cellIndex + 1] : null;
                linkList.bottom       = cellExists(cellList, rowIndex + 1, cellIndex)        ? cellList[rowIndex + 1][cellIndex]     : null;
                linkList.bottomLeft   = cellExists(cellList, rowIndex + 1, cellIndex - 1) ? cellList[rowIndex + 1][cellIndex - 1] : null;
                linkList.left         = cellExists(cellList, rowIndex, cellIndex - 1)        ? cellList[rowIndex][cellIndex - 1]     : null;
            })
        });
    }

    /**
     * Проверить обе диагонали (не сетки, а относительно текущей позиции), горизонталь и вертикаль
     * @param cell
     */
    public checkLines(cell: Cell): boolean {
        return this._checkFirstDiagonal(cell)
            || this._checkSecondDiagonal(cell)
            || this._checkHorizontal(cell)
            || this._checkVertical(cell);
    }

    /**
     * Диагональ сверху слева вправо вниз
     * @param cell
     * @private
     */
    private _checkFirstDiagonal(cell: Cell): boolean {
        return this._vectorList.topLeft(cell) + this._vectorList.bottomRight(cell) >= this._cellsToWin - 1;
    }

    /**
     * Диагональ сверху справа влево вниз
     * @param cell
     * @private
     */
    private _checkSecondDiagonal(cell: Cell): boolean {
        return this._vectorList.topRight(cell) + this._vectorList.bottomLeft(cell) >= this._cellsToWin - 1;
    }

    /**
     * Горизонталь
     * @param cell
     * @private
     */
    private _checkHorizontal(cell: Cell): boolean {
        return this._vectorList.left(cell) + this._vectorList.right(cell) >= this._cellsToWin - 1;
    }

    /**
     * Вертикаль
     * @param cell
     * @private
     */
    private _checkVertical(cell: Cell): boolean {
        return this._vectorList.top(cell) + this._vectorList.bottom(cell) >= this._cellsToWin - 1;
    }
}