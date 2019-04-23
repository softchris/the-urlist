import ApiService from "./api.service";
import User from "@/models/User";
import IUserList from "@/models/IUserList";

const UserService = {
  async me(): Promise<User> {
    const response = await ApiService.get(".auth/me");
    return new User(response.data[0]);
  },

  async lists(userName: string): Promise<Array<IUserList>> {
    const response = await ApiService.get(`links/user/${userName}`);
    return response ? <Array<IUserList>>response.data : [];
  }
};

export default UserService;
