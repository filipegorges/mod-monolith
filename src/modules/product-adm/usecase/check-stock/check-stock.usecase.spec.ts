import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock";

describe("Check Stock usecase unit test", () => {
    const product = new Product({
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 100,
        stock: 10,
    });

    const MockRepository = () => {
        return {
            add :jest.fn(),
            find: jest.fn().mockResolvedValue(Promise.resolve(product)),
        };
    }

    it("should check stock", async () => {
        const productRepository = MockRepository();
        const usecase = new CheckStockUseCase(productRepository);

        const input = {
            productId: product.id.id,
            quantity: 5,
        };

        const result = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toBe(input.productId);
        expect(result.stock).toBe(product.stock);
    });
});