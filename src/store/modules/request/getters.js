export default {
  requests(state, _, rootState) {
    const userId = rootState.userId;
    return state.requests.filter(req => req.coachId === userId);
  },
  hasRequest(state) {
    return state.requests && state.requests.length > 0;
  }
};
