<template>
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
    name: 'App',

    data: () => ({
        //
    }),
}
</script>


<!--logowanie dane-->