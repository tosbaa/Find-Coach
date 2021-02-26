<template>
  <section>
    FILTER
  </section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="register">Register As Coach</router-link>
    </div>
    <ul v-if="coachesExist">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
        {{ coach.lastName }}
      </li>
    </ul>
    <h3 v-else>No Coaches Available</h3>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      filteredCoaches: "coaches/coaches",
      coachesExist: "coaches/hasCoaches"
    })
  }
};
</script>
