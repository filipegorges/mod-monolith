import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindUseCase from "../usecase/find/find.usecase";

export default class StoreCatalogFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    return new StoreCatalogFacade({
      findUseCase: new FindUseCase(productRepository),
      findAllUseCase: new FindAllProductsUseCase(productRepository),
    });
  }
}
