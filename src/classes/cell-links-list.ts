import Cell from "./cell";

export default class CellLinksList {
    /** Верхняя левая клетка */
    topLeft    : Cell | null = null
    /** Верхняя клетка */
    top        : Cell | null = null
    /** Верхняя правая клетка */
    topRight   : Cell | null = null
    /** Правая клетка */
    right      : Cell | null = null
    /** Нижняя правая клетка */
    bottomRight: Cell | null = null
    /** Нижняя клетка */
    bottom     : Cell | null = null
    /** Нижняя левая клетка */
    bottomLeft : Cell | null = null
    /** Левая клетка */
    left       : Cell | null = null
}