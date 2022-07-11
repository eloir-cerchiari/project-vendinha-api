import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../src/test-utils/mongo/mongoosetest.module';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productList: any[];
  const mock = {
    name: 'BIS - Caixa 2',
    gtin: '7896019603430',
    size: '121g',
    color: undefined,
  };
  let productId = undefined;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    const productInserted = await service.create(mock);

    productId = productInserted._id;
    productList = await service.findAll();
  });

  it('should be have one element in array', async () => {
    expect(productList.length).toBe(1);
    expect(service).toBeDefined();
  });

  it('Should have mocked attribs', async () => {
    for (const key in mock) {
      expect(productList[0]).toHaveProperty(key, mock[key]);
    }
    expect(productList[0]).toHaveProperty('name');
  });

  it('Should update one product', async () => {
    mock.color = 'green';
    await service.update(productList[0]._id, mock);
  });

  it('Shoul return one product by Id', async () => {
    const response = await service.findOne(productId);
    for (const key in mock) {
      expect(response).toHaveProperty(key, mock[key]);
    }
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
