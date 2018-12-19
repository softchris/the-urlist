import axios from "axios";
import config from "@/config";
const ogService = {
    Scrape(url) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${config.scraper}/Scrape`, {
                url: url
            })
                .then(result => {
                resolve(result.data);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
};
export default ogService;
//# sourceMappingURL=og-service.js.map