<template>
    <h3 class="text-center" style="color: gray;">Aby założyć konto wybierz swoją szkołę z listy szkół i dodaj tam swoje
        konto</h3>
    <div>
        <v-card class="mx-auto pa-12 pb-8 logo" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Wpisz swój email</div>
            <v-text-field v-model="userEmail" density="compact" placeholder="Login" variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Wpisz hasło
            </div>
            <v-text-field v-model="userPassword" :append-inner-icon="visible ? 'fa-solid fa-eye mb-1' : 'fa-solid fa-eye-low-vision mb-1'
                " :type="visible ? 'text' : 'password'" density="compact" placeholder="Hasło" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>
            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login()">
                Log In
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    computed: {
        visible: {
            get() {
                return this.$store.getters.getVisible;
            },
            set(val) {
                this.$store.commit("setVisible", val);
            },
        },
        isLogged: {
            get() {
                return this.$store.getters.getIsLogged;
            },
            set(val) {
                this.$store.commit("setIsLogged", val);
            },
        },
        showAlert() {
            return this.$store.getters.getShowAlert
        },
    },
    data() {
        return {
            userEmail: "owosk@gmail.com",
            userPassword: "password",
        };
    },
    methods: {
        login() {
            if (
                this.userEmail.length <= 5 ||
                this.userPassword.length <= 5 ||
                this.userEmail.length >= 50 ||
                this.userPassword.length >= 50
            ) {
                this.$store.dispatch(
                    "showAlert",
                    "Hasło powinno mieć od 5 do 50 znaków"
                );
            }
            else {
                this.$store.dispatch("login", { auth: { email: this.userEmail, password: this.userPassword } })
            }
        },
    },
};
</script>

<style>
.logo {
    position: relative;

    top: 10em;
}
</style>
