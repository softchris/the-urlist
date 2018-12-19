import axios from 'axios';
import config from '@/config';
const linkService = {
    saveLinks(vanityUrl = '', description = '', links) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${config.api}/links`, {
                links: links,
                vanityUrl: vanityUrl,
                description: description
            })
                .then(result => {
                resolve(result.data);
            })
                .catch(err => {
                reject(err);
            });
        });
    },
    getLinks(vanityUrl) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${config.api}/links/${vanityUrl}`)
                .then(result => {
                resolve(result.data);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
};
export default linkService;
//# sourceMappingURL=link-service.js.map