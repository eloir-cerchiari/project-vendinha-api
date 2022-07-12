import {
  IsAlphanumeric,
  IsEAN,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({
    message: 'Nome inválido, existem caracteres não permitidos',
  })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres' })
  @MaxLength(25, { message: 'O nome pode ter no máximo 25 caracteres' })
  name: string;

  @IsEAN({ message: 'O código EAN/Gtin está inválido' })
  gtin: string;

  @IsNotEmpty({ message: 'O peso deve ser informado' })
  @IsAlphanumeric('pt-BR', {
    message: 'O peso pode ser descrito com letras e números',
  })
  @MinLength(2, { message: 'O peso deve ter ao menos 2 caracteres' })
  @MaxLength(6, { message: 'O peso pode ter no máximo 6 caracteres' })
  size: string;


  @MinLength(3, { message: 'A cor deve ter ao menos 3 caracteres' })
  @MaxLength(12, { message: 'A cor pode ter no máximo 12 caracteres' })
  color: string;
}
