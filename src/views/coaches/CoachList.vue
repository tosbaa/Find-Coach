<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button link to="/register">Register As Coach</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="coachesExist">
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
import CoachFilter from "../../components/coach/CoachFilter.vue";
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      filters: ["frontend", "backend", "career"],
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      coachesExist: "coaches/hasCoaches"
    }),
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter(coach =>
        coach.areas.some(area => this.filters.includes(area))
      );
    }
  },

  created() {
    this.loadCoaches();
  },

  methods: {
    setFilters(filters) {
      this.filters = filters;
    },
    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch("coaches/loadCoaches");
      this.isLoading = false;
    }
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
