<template>
    <div class="cell" @click="set">
        <i class="icon" :class="iconClass"></i>
    </div>
</template>

<script>
    import Cell from "../classes/cell";

    export default {
        name: "cell",

        props: {
            data: {
                type: Cell,
                required: true,
            },
        },

        data: function () {
            return {
                cell: null,
                iconClass: '',
            };
        },

        created() {
            this.cell = this.data;
        },

        mounted() {
        },

        methods: {
            set: function () {
                if (!this.cell.isClicked) {
                    this.iconClass = this.$config.playerIcon[this.$config.playerTurnId];
                    this.cell.isClicked = true;
                    this.cell.playerId = this.$config.playerTurnId;

                    this.$eventBus.$emit('next-turn');
                    this.$eventBus.$emit('check-winner', this.cell);
                } else {
                    this.$message('Кнопка уже жмакнута');
                }
            }
        }
    }
</script>

<style scoped>
    .icon {
        text-align: center;
        font-size: 5vw;
    }

    .cell {
        width: 5vw;
        height: 5vw;
        display: inline-block;
        margin: 0.2vw;
        border: 1px black solid;
        cursor: pointer;
    }

    .cell:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
</style>