import BaseRepository from "../base/baseRepository";

class TypeRepository extends BaseRepository {
  constructor() {
    super('type');
  }

  add(type) {
    return this.client.post('/',type);
  }

  get() {
    return this.client.get("/");
  }

  delete(guid){
    return this.client.delete(`/${guid}`);
  }
  

}

export default new TypeRepository();