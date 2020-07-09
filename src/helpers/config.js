import Vue from "vue";

/** Конфигурация компонента */
export const config = new Vue({
    data: function () {
        return {
            playerIcon: {
                '1': 'el-icon-sunny',
                '2': 'el-icon-lightning',
            },

            playerTurnId: 1,
        };
    },
});