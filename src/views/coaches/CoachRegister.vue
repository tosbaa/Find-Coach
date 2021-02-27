<template>
  <section>
    <base-card>
      <h2>Register As Coach !</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coach/CoachForm.vue";
export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(formData) {
      this.$store.dispatch("coaches/saveCoach", formData);
      this.$router.replace("/coaches");
    }
  }
};
</script>
