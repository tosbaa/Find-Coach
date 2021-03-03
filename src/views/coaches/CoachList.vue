<template>
  <div>
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
          <base-button link to="/auth" v-if="!authenticated">Login</base-button>
          <base-button
            link
            to="/register"
            v-if="!isCoach && !isLoading && authenticated"
            >Register As Coach</base-button
          >
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
  </div>
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
      isLoading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters({
      coachesExist: "coaches/hasCoaches",
      isCoach: "coaches/isCoach",
      authenticated: "isAuthenticated"
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
      try {
        await this.$store.dispatch("coaches/loadCoaches");
      } catch (err) {
        this.error = err.message || "Something went wrong";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
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
