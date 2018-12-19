import axios from 'axios';
import config from '@/config';
import IList from '@/models/IList';
import ILink from '@/models/ILink';

const linkService = {
  saveLinks(
    vanityUrl: string = '',
    description: string = '',
    links: Array<ILink>
  ): Promise<IList> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.api}/links`, {
          links: links,
          vanityUrl: vanityUrl,
          description: description
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
