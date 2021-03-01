export default {
  saveCoach({ commit, rootGetters }, payload) {
    const data = {
      id: rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas
    };
    commit("addCoach", data);
  }
};
