export default {
  API_URL: `${process.env.VUE_APP_API}/api`,
  scraper: process.env.VUE_APP_SCRAPER,
  functionKey: process.env.VUE_APP_FUNCTION_KEY,
  AUTH_URL: `${process.env.VUE_APP_API}/${process.env.VUE_APP_AUTH_URL}`,
  ME_URL: `${process.env.VUE_APP_API}/${process.env.VUE_APP_ME_URL}`
};
