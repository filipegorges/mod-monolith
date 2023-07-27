import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe('product repository', () => {
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
    })

    afterAll(async () => {
        await sequelize.close();
    });

    it("should find all products", async () => {
        await ProductModel.create({
            id: new Id('1').id,
            name: 'name',
            description: 'description',
            salesPrice: 10
        });

        await ProductModel.create({
            id: new Id('2').id,
            name: 'name2',
            description: 'description2',
            salesPrice: 20
        });

        const productRepository = new ProductRepository();
        const result = await productRepository.findAll();
        
        expect(result).toHaveLength(2);
        expect(result[0].id.id).toBe('1');
        expect(result[0].name).toBe('name');
        expect(result[0].description).toBe('description');
        expect(result[0].salesPrice).toBe(10);
        expect(result[1].id.id).toBe('2');
        expect(result[1].name).toBe('name2');
        expect(result[1].description).toBe('description2');
        expect(result[1].salesPrice).toBe(20);
    });

    it("should find a product", async () => {
        const product = new Product({
            id: new Id('1'),
            name: 'name',
            description: 'description',
            salesPrice: 10
        });
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        });
        const productRepository = new ProductRepository();
        const result = await productRepository.find(product.id.id);
        expect(result).not.toBeNull();
        expect(result.id.id).toBe('1');
        expect(result.name).toBe('name');
        expect(result.description).toBe('description');
        expect(result.salesPrice).toBe(10);
    });
});