<template>
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
        <v-layout>
            <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
                <template v-slot:image>
                    <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
                </template>
                <v-spacer></v-spacer>
                <v-btn @click="goToProfile">
                    Mój profil
                </v-btn>
            </v-app-bar>
            <v-main>

            </v-main>
        </v-layout>
    </v-card>

    <nav>
        <AlertSnackbar />
        <!-- <router-link :to="{name: 'SchoolList'}">Lista szkół</router-link>-->
        <router-link :to="{ name: 'LoginPage' }"></router-link>

    </nav>
    <router-view />
</template>

<script>
import AlertSnackbar from "@/assets/notifications/AlertSnackbar.vue";
export default {
    components: {
        AlertSnackbar
    },
    methods: {
        goToProfile() {
            if (this.$store.state.isLogged) {
                this.$router.push("/profile")
            } else {
                this.$router.push("/LoginPage")
            }
        }
    },
    name: 'App',

    data: () => ({
        //
    }),
}
</script>


<!--logowanie dane-->