import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindUseCase from "./find.usecase";

describe("find usecase", () => {
  const product = new Product({
    id: new Id("1"),
    name: "name",
    description: "description",
    salesPrice: 10,
  });

  const mockRepository = () => ({
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  });

  it("should return a product", async () => {
    const repository = mockRepository();
    const useCase = new FindUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await useCase.execute(input);
    expect(repository.find).toBeCalledWith("1");
    expect(result).toEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  });
});
