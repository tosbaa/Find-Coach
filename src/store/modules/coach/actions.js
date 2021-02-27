export default {
  saveCoach({ commit }, payload) {
    const data = {
      id: new Date().toISOString(),
      firstName: payload.first,
      lastName: payload.last,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas
    };
    commit("addCoach", data);
  }
};
