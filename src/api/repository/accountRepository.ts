import BaseRepository from "../base/baseRepository";

class AccountRepository extends BaseRepository {
  constructor() {
    super('account');
  }

  signUp(user){
    return this.client.post('/sign-up',user);
  }

}

export default new AccountRepository();