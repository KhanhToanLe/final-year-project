import BaseRepository from "../base/baseRepository";

class ProductRepository extends BaseRepository {
  constructor() {
    super('product');
  }

  add(product){
    return this.client.post('/add',product);
  }

  get(){
    
  }

  
}

export default new ProductRepository();