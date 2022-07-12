import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';

describe('Validation Pipe Create-product.dto', () => {
  let target;
  beforeEach(() => {
    target = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
  });
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateProductDto,
    data: '',
  };

  it('Validation pass', async () => {
    const testObj = {
      name: 'BIS Caixa 2',
      gtin: '7896019603430',
      size: '121g',
      color: 'branco',
    };
    expect(await target.transform(testObj, {} as any)).toEqual(testObj);
  });

  it('Validation should throw an error ', async () => {
    const testObj = {
      name: 'ab',
      gtin: '',
      size: '121gssasdas',
      color: 'branco de todas as cores',
    };
    try {

      expect(await target.transform(testObj, metadata)).rejects.toThrow();
      await target.transform(testObj, metadata);

    } catch (error) {
      expect(error.getResponse().message).toEqual([
        'O nome deve ter ao menos 3 caracteres',
        'O código EAN/Gtin está inválido',
        'O peso pode ter no máximo 6 caracteres',
        'A cor pode ter no máximo 12 caracteres',
      ]);
    }
  });
});
