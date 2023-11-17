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
          <RouterLink :to="{ name: 'SchoolPage', params: { id: school.name } }">
            <h2>
              <div type="input" @click="goToSchoolPage()" class="text-left">
                {{ school.name }}
              </div>
            </h2>
          </RouterLink>
        </td>
        <td>{{ school.city }}</td>
        <v-icon
          @click="openSchoolEdit(index)"
          icon="fa fa-edit pl-5 mt-2 mr-4"
        />
        <EditSchool ref="editSchoolDialog" />

        <v-icon @click="deleteSchool(index), refresh" icon="fa fa-trash pl-5 mt-2" />
      </tr>
    </tbody>
  </v-table>

  <v-btn @click="zapytaj">adkjsl;jl</v-btn>
</template>

<script>
import DialogSchool from "../assets/schools/AddSchoolDialog.vue";
import EditSchool from "../assets/schools/EditSchoolDialog.vue";

export default {
  components: {
    DialogSchool,
    EditSchool,
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
    zapytaj() {
      this.$store.dispatch("addSchoolPost");
    },
    openSchoolEdit(index) {
      this.$refs.editSchoolDialog[index].open();
    },
    editSchoolName(index, name) {
      this.$store.dispatch("editSchoolName", { index, name });
    },
    goToSchoolPage() {
      this.$router.push(`/${this.schools.name}`);
    },
    deleteSchool(index) {
      const schoolId = this.schools[index].id;
      this.$store.dispatch("deleteSchool", schoolId);
    },
    refresh(){
      this.$store.dispatch("listAllSchools");
    },
    clearEdit() {
      this.schoolName = "";
    },
  },
  created() {
    this.$store.dispatch("listAllSchools");
  },
  beforeCreate() {
    if ((this.$store.state.isLogged = false)) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
a {
  color: black;
}
</style>
