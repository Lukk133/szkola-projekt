<template>
    <h1 class="text-center">Profil użytkownika {{ loggedUser.email }}</h1>
    <h2 class="text-center">Twoje hasło</h2>
    <h3 class="text-center"> {{ loggedUser.password }}</h3>

    <v-btn @click="logout">Wyloguj</v-btn>
</template>

<script>
export default {
    computed: {
        loggedUser() {
            return this.$store.getters.getLoggedUser;
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


