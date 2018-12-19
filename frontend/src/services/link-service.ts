import axios from 'axios';
import config from '@/config';
import IList from '@/models/IList';
import ILink from '@/models/ILink';

const linkService = {
  saveLinks(list: IList): Promise<IList> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.api}/links`, {
          links: list.links,
          vanityUrl: list.vanityUrl,
          description: list.description
        })
        .then(result => {
          resolve(<IList>result.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getLinks(vanityUrl: string): Promise<IList> {
    return new Promise<IList>((resolve, reject) => {
      axios
        .get(`${config.api}/links/${vanityUrl}`)
        .then(result => {
          resolve(<IList>result.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default linkService;
