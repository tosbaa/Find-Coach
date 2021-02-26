<template>
  <section>
    FILTER
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register As Coach</base-button>
      </div>
      <ul v-if="coachesExist">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No Coaches Available</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CoachItem from "../../components/coach/CoachItem.vue";
export default {
  components: { CoachItem },
  computed: {
    ...mapGetters({
      filteredCoaches: "coaches/coaches",
      coachesExist: "coaches/hasCoaches"
    })
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
