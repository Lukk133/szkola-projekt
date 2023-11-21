<template>
  <DialogSchool />

  <v-table class="mx-4">
    <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">Nazwa szkoły</th>
        <th class="text-left">Miasto</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(school, index) in schools" :key="school.name">
        <td>{{ school.id }}</td>
        <td>
          <h2 style="cursor: pointer;" @click="goToSchoolPage(school.id)">
            {{ school.name }}
          </h2>
          <!--<RouterLink :to="{ name: 'SchoolPage', params: { id: school.id } }">   </RouterLink> -->
        </td>
        <td>{{ school.city }}</td>
        <v-icon @click="deleteSchool((schoolId = school.id))" icon="fa fa-trash pl-5 mt-2" />
      </tr>
    </tbody>
  </v-table>
  <SchoolAlert />
</template>

<script>
import DialogSchool from "../assets/schools/AddSchoolDialog.vue";
import SchoolAlert from "../assets/notifications/SchoolAlert.vue";

export default {
  components: {
    DialogSchool,
    SchoolAlert,
  },
  name: "HelloWorld",
  data() {
    return {};
  },
  computed: {
    schools() {
      return this.$store.getters.getSchools;
    },
    cities() {
      return this.$store.getters.getCities;
    },
  },
  methods: {
    goToSchoolPage(schoolId) {
      this.$router.push({ name: "SchoolPage", params: { id: schoolId } });
      this.$store.commit("setSelectedSchool", schoolId);
    },
    deleteSchool(schoolId) {
      this.$store.dispatch("deleteSchool", schoolId);
    },
    clearEdit() {
      this.schoolName = "";
    },
  },
  created() {
    this.$store.dispatch("listAllSchools"),
      this.$store.dispatch("listAllStudents");
    this.$store.dispatch("listAllTeachers");
  },
  //beforeCreate() {
  //if (this.$store.state.isLogged === false) {
  // this.$router.push("/");
  //}
  //},
};
</script>

<style>
a {
  color: black;
  cursor: pointer;
}
</style>
