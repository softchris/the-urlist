export default {
  APP_URL: process.env.VUE_APP_APP_URL,
  API_URL: process.env.VUE_APP_API_URL,
  AUTH_URL: function(provider: string) {
    return `${
      process.env.VUE_APP_FUNCTION_URL
    }/.auth/login/${provider}?post_login_redirect_url=${
      process.env.VUE_APP_APP_URL
    }`;
  },
  LOGOUT_URL: `${
    process.env.VUE_APP_FUNCTION_URL
  }/.auth/logout?post_logout_redirect_uri=${process.env.VUE_APP_APP_URL}`,
  FUNCTION_KEY: process.env.VUE_APP_FUNCTION_KEY,
  FUNCTION_URL: process.env.VUE_APP_FUNCTION_URL
};
