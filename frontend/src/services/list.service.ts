import ApiService from "./api.service";

const ListService = {
  get(vanityUrl: string) {
    return ApiService.get(`api/links/${vanityUrl}`);
  },
  create(payload: object) {
    return ApiService.post(`api/links`, payload);
  },
  validate(url: string) {
    return ApiService.post("api/validatePage", { url: url });
  },
  update(vanityUrl: string, payload: object) {
    return ApiService.patch(`api/links/${vanityUrl}`, payload);
  },
  destroy(vanityUrl: string) {
    return ApiService.destroy(`api/links/${vanityUrl}`);
  }
};

export default ListService;
