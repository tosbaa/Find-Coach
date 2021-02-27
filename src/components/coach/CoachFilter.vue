<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" name="filter" value="frontend" v-model="filters"/>
      <label for="frontend"> Frontend </label>
    </span>
    <span class="filter-option">
      <input type="checkbox" name="filter" value="backend" v-model="filters" />
      <label for="backend"> Backend </label>
    </span>
    <span class="filter-option">
      <input type="checkbox" name="filter" value="career" v-model="filters" />
      <label for="career"> Career </label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filters: ["frontend", "backend", "career"],
    };
  },

  watch: {
    filters() {
      this.$emit("change-filter", this.filters);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
