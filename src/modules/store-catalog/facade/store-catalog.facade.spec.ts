import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import FindUseCase from "../usecase/find/find.usecase";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import StoreCatalogFacade from "./store-catalog.facade";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("store catalog facade", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const facade = StoreCatalogFacadeFactory.create();

    const product = await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    });

    const result = await facade.find({ id: product.id });
    expect(result.id).toBe(product.id);
    expect(result.name).toBe(product.name);
    expect(result.description).toBe(product.description);
    expect(result.salesPrice).toBe(product.salesPrice);
  });

  it("should find all products", async () => {
    const facade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const result = await facade.findAll();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Description 1");
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Description 2");
    expect(result.products[1].salesPrice).toBe(200);
  });
});
