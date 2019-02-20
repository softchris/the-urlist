export default {
  APP_URL: process.env.VUE_APP_APP_URL,
  API_URL: `${process.env.VUE_APP_API}/api`,
  AUTH_URL: function(provider: string, returnPath: string) {
    return `${
      process.env.VUE_APP_API
    }/.auth/login/${provider}?post_login_redirect_url=${
      process.env.VUE_APP_APP_URL
    }`;
  },
  FUNCTION_KEY: process.env.VUE_APP_FUNCTION_KEY,
  ME_URL: `${process.env.VUE_APP_API}/${process.env.VUE_APP_ME_URL}`
};
