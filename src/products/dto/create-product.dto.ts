import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gtin: string;

  @IsNotEmpty({ message: 'O Tamanho deve ser informado' })
  size: string;

  color: string;
}
