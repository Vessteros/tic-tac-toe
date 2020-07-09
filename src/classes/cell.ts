import CellLinksList from "./cell-links-list";

export default class Cell {
    /** Идентификатор клетки */
    private _id: number = -1
        get id(): number {return this._id;}
        set id(value: number) {this._id = value;}

    /** Идентификатор игрока */
    private _playerId: number = -1
        get playerId(): number {return this._playerId;}
        set playerId(value: number) {this._playerId = value;}

    /** Была ли нажата клетка */
    private _isClicked: boolean = false
        get isClicked(): boolean {return this._isClicked;}
        set isClicked(value: boolean) {this._isClicked = value;}

    /** Аттачи соседних клеток */
    private _coordinateList: CellLinksList = new CellLinksList
        get coordinateList(): CellLinksList {return this._coordinateList;}
        set coordinateList(value: CellLinksList) {this._coordinateList = value;}
}