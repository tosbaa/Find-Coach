export default {
  async contactCoach({ commit }, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `${process.env.VUE_APP_BACKEND_URL}/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest)
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to send request");
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;
    commit("addRequest", newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `${process.env.VUE_APP_BACKEND_URL}/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch requests");
    }

    const requests = [];

    for (const key in responseData) {
      requests.push({
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      });
    }
    context.commit("setRequests", requests);
  }
};
