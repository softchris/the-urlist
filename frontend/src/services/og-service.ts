import axios from "axios";
import config from "@/config";
import { IOGData } from "@/models/IOGData";

const ogService = {
  Scrape(url: string): Promise<IOGData> {
    return new Promise<IOGData>((resolve, reject) => {
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
