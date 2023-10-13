import BaseRepository from "../base/baseRepository";

class CartRepository extends BaseRepository {
  constructor() {
    super('cart');
  }

  addToCart(productId, quantity) {
    return this.client.get(`/${productId}/${quantity}`);
  }

  getProductByAccount() {
    return this.client.get("/");
  }

  getByInOrder(){
    return this.client.get("/get-in-order");
  }

  getByFinished(){
    return this.client.get("/get-finished");
  }

  updateMountProduct(cartId, increaseStep) {
    return this.client.put(`/${cartId}/${increaseStep}`);
  }

  updateState(cartId, status, delFlag) {
    return this.client.put(`/${cartId}/${status}/${delFlag}`);
  }

}

export default new CartRepository();