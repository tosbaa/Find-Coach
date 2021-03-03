export default {
  async login(context, payload) {
    const response = await fetch(
      `${process.env.VUE_APP_AUTH_URL}/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Email Already Exist");
    }
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  },
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
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Email Already Exist");
    }
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  }
};
