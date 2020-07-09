<template>
    <el-container>
        <el-header>
            <el-row :gutter="20">
                <el-col :span="12">
                    <player :pid="1"></player>
                </el-col>
                <el-col :span="12">
                    <player :pid="2"></player>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24">Размер поля</el-col>
                <el-col :span="11">
                    <el-input placeholder="Высота" v-model="rowsInGrid"></el-input>
                </el-col>
                <el-col :span="2">:</el-col>
                <el-col :span="11">
                    <el-input placeholder="Ширина" v-model="cellsInRow"></el-input>
                </el-col>
                <el-col :span="24">
                    Количество клеток для победы:
                </el-col>
                <el-col :span="24">
                    <el-input placeholder="Количество клеток для победы" v-model="cellsToWin"></el-input>
                </el-col>
                <el-col :span="24">
                    <el-button type="primary" @click="generateGrid">Сгененировать поле</el-button>
                </el-col>
            </el-row>
            <div v-if="gridExists">
                <div class="row" v-for="(row, rowIndex) in grid.list" :key="rowIndex">
                    <cell v-for="cell in row" :key="cell.id" :data="cell"></cell>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {exists} from "../helpers/tools";

    export default {
        name: 'Tic-Tac-Toe',

        components: {},

        data: function () {
            return {
                /** Высота Х Ширина */
                rowsInGrid: 3,
                cellsInRow: 3,
                cellsToWin: 3,

                grid: null,
            };
        },

        computed: {
            gridExists: function () {
                return exists(this.grid)
            }
        },

        mounted() {
            /**
             * Перейдем на следующий ход
             */
            this._nextTurn = function () {
                this.$config.playerTurnId = 3 - this.$config.playerTurnId;

                if (this.$config.playerTurnId > 2 || this.$config.playerTurnId < 1) {
                    window.location.reload();
                }
            };

            /**
             * Проверим не является ли ход победным
             *
             * @param cell
             * @private
             */
            this._checkWinner = (cell) => {
                if (this.grid.checkLines(cell)) {
                    alert('Победа игрока с ID: ' + this.$config.playerTurnId);
                    window.location.reload();
                }
            }

            this.$eventBus.$on('next-turn', this._nextTurn);
            this.$eventBus.$on('check-winner', this._checkWinner);
        },

        beforeDestroy() {
        },

        methods: {
            generateGrid: function () {
                this.grid = new this.CellGrid(
                    this.rowsInGrid,
                    this.cellsInRow,
                    this.cellsToWin
                );
            }
        }
    }
</script>

<style>

    .el-row {
        margin-bottom: 20px;
    /* &:last-child {
         margin-bottom: 0;
     } */
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>