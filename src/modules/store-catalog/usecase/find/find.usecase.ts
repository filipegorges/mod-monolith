import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindInputDto, FindOutputDto } from "./find.dto";

export default class FindUseCase implements UseCaseInterface {
    constructor(private productRepository: ProductGateway) {}

    async execute(input: FindInputDto): Promise<FindOutputDto> {
        const product = await this.productRepository.find(input.id);
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        };
    }
}