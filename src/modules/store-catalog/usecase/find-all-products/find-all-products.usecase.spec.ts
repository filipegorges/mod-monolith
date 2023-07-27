import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

describe('find all products use case', () => {	
    const product = new Product({
        id: new Id('1'),
        name: 'name',
        description: 'description',
        salesPrice: 10
    });

    const product2 = new Product({
        id: new Id('2'),
        name: 'name2',
        description: 'description2',
        salesPrice: 20
    });

    const mockRepository = () => ({
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue(Promise.resolve([product, product2])),
    });

    it("should return all products", async () => {
        const repository = mockRepository();
        const useCase = new FindAllProductsUseCase(repository);
        const result = await useCase.execute();
        expect(result).toEqual({
            products: [
                {
                    id: product.id.id,
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice
                },
                {
                    id: product2.id.id,
                    name: product2.name,
                    description: product2.description,
                    salesPrice: product2.salesPrice
                }
            ]
        });
    });

});