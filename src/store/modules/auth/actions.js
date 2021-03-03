export default {
  login() {},
  async signUp(context, payload) {
    const response = await fetch(
      `${process.env.VUE_APP_AUTH_URL}/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const responseData = response.json();

    if (!response.ok) {
      console.log(responseData);
      throw new Error(responseData.message || "Failed to authenticate");
    }
    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  }
};
