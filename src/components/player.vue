<template>
    <el-container>
        <el-row :gutter="20">
            <el-col :span="6">#{{id}}</el-col>
            <el-col :span="18">
                <div v-if="showPlain" @click="switchEditability">{{name}}</div>
                <el-input v-else placeholder="Имя игрока" v-model="name"
                          @keyup.enter.native="switchEditability"></el-input>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: 'Player',

        props: {
            pid: {
                type: Number,
                required: true,
            },
        },

        components: {},

        data: function () {
            return {
                id: -1,
                name: 'Игрок',
                turnsCount: 0,

                editable: true,
            };
        },

        computed: {
            showEditable: function () {
                return this.editable;
            },

            showPlain: function () {
                return !this.showEditable;
            }
        },

        /** Жизненный цикл */
        created() {
            this.id = this.pid;
        },

        beforeMount() {
        },

        mounted() {
        },

        beforeDestroy() {
        },
        /** /Жизненный цикл */

        methods: {
            switchEditability: function () {
                this.editable = !this.editable;
            },
        }
    }
</script>