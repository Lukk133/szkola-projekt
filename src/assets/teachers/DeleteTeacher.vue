<template>
    <v-dialog height="450" width="500" v-model="dialog">
        <template v-slot:activator="{ }">
        </template>
        <template v-slot:default="{ }">
            <v-card text-center title="Czy na pewno chcesz usunąć?">
                <v-card-text>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn size="large" class="ma-3 ml-4 mb-10" text="Nie usuwaj" @click="close"></v-btn>
                    <v-btn size="large" class="ma-3 ml-4 mb-10" text="Usuń" @click="deleteTeacher(teacherId)"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            wrongEmail: false,
        };
    },
    computed: {
        student() {
            return this.$store.getters.getStudent;
        },
    },
    methods: {
        open() {
            this.dialog = true;
            this.$store.commit("initTeacher");
        },
        deleteTeacher() {
            console.log(this.$store.getters.getTeacherId);
            this.$store.dispatch("deleteTeacher", this.$store.getters.getTeacherId);
            this.close();
        },
        close() {
            this.dialog = false;
        },
    },
};
</script>
