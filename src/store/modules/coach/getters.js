export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  getCoachByID(state) {
    return id => state.coaches.find(coach => coach.id === id);
  }
};
