<template>
    <h1 class="text-center">Profil użytkownika {{ actualUser.email }}</h1>
    <h2 class="text-center">Twoje hasło</h2>
    <h3 class="text-center"> {{ actualUser }}</h3>

    <v-btn @click="logout">Wyloguj</v-btn>
</template>

<script>
export default {
    computed: {
        actualUser() {
            return this.$store.getters.getActualUser;
        }
    },
    methods: {
        logout() {
            this.$router.push(`/`)
            this.$store.commit("setIsLogged", false)
            this.$store.commit("initLogout")
            this.$store.dispatch("logoutUser")
        }
    }
};
</script>


