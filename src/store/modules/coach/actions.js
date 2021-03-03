export default {
  async saveCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const data = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    const response = await fetch(
      `${process.env.VUE_APP_BACKEND_URL}/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(data)
      }
    );

    //const responseData = await response.json();
    if (!response.ok) {
      console.log("Error while saving coach");
    }

    context.commit("addCoach", {
      id: userId,
      ...data
    });
  },

  async loadCoaches(context) {
    const response = await fetch(
      `${process.env.VUE_APP_BACKEND_URL}/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch !");
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit("setCoaches", coaches);
  }
};
