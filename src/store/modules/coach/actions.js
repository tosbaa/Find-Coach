export default {
  async saveCoach({ commit, rootGetters }, payload) {
    const userId = rootGetters.userId;
    const data = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    const response = await fetch(
      `${process.env.VUE_APP_BACKEND_URL}/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(data)
      }
    );

    //onst responseData = await response.json();
    if (!response.ok) {
      console.log("Error while saving coach");
    }

    commit("addCoach", {
      id: userId,
      ...data
    });
  }
};
