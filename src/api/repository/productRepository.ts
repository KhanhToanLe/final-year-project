import BaseRepository from "../base/baseRepository";

class ProductRepository extends BaseRepository {
  constructor() {
    super('product');
  }

  add(product) {
    return this.client.post('/add', product);
  }

  get() {
    return this.client.get("/");
  }

  getNewProduct() {
    return this.client.get("/get-new");
  }

  getByType(typeId) {
    return this.client.get(`/get-by-type/${typeId}`);
  }

  getById(id) {
    return this.client.get(`/${id}`)
  }

  getRelated(keyword) {
    return this.client.get(`/get-related/${keyword}`)
  }

 

  update(product) {
    return this.client.put("/", product)
  }

  delete(id) {
    return this.client.delete(`/${id}`);
  }

  deleteRange(guids) {
    return this.client.post("/delete", guids);
  }

}

export default new ProductRepository();