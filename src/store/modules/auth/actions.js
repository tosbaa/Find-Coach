let timer;
export default {
  async login(context, payload) {
    await context.dispatch("auth", {
      ...payload,
      mode: "login"
    });
  },

  async signUp(context, payload) {
    await context.dispatch("auth", {
      ...payload,
      mode: "signup"
    });
  },
  async auth(context, payload) {
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

    timer = setTimeout(() =>
      context.dispatch("autoLogout", responseData.expiresIn)
    );

    const expirationDate = new Date(
      new Date().getTime() + responseData.expiresIn * 1000
    );

    localStorage.setItem("tokenExpiration", expirationDate);
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: expirationDate
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(() => context.dispatch("autoLogout"), expiresIn);
    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        tokenExpiration: tokenExpiration
      });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    clearTimeout(timer);
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  },

  autoLogout(context) {
    context.dispatch("logout");
    context.commit("didLogout");
  }
};
