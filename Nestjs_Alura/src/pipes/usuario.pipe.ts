import { Injectable } from '@nestjs/common/decorators';
import { UsuarioService } from './../services/usuario/usuario.service';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

  constructor(private usuarioService:  UsuarioService){
  }

  validate(nm_Nome: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    return !!!this.usuarioService.Get_Buscar_User(nm_Nome)
  }
}

export function IsUniqueNameUser(validationOption?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    })
  }
}