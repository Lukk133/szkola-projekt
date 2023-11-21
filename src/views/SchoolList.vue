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
        <td>{{ index + 1 }}</td>
        <td>
          <h2 style="cursor: pointer" @click="goToSchoolPage(school.id)">
            {{ school.name }}
          </h2>
        </td>
        <td>Stary York</td>
        <!--{{ school.city }}-->

        <v-icon @click="deleteSchool(school.id)" icon="fa fa-trash pl-5 mt-2" />
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import DialogSchool from "../assets/schools/AddSchoolDialog.vue";

export default {
  components: {
    DialogSchool,
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
      console.log(schoolId);
      this.$store.dispatch("deleteSchool", schoolId);
    },
    clearEdit() {
      this.schoolName = "";
    },
  },
  created() {
    this.$store.dispatch("listAllSchools"),
      this.$store.dispatch("listStudents");
    this.$store.dispatch("listTeachers");
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
}
</style>
