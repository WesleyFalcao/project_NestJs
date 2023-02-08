import { Exclude } from 'class-transformer'
import { Expose } from 'class-transformer/decorators'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'
import { IsUniqueNameUser } from 'src/pipes/usuario.pipe'

export class Usuario {

  cd_Id: number

  //---------- Validators nm_Nome --------------//

  @Expose({
    name: 'name'   //determina como o campo vai ser exposto ao ser trafegado
  })
  @IsUniqueNameUser({
    message: 'nm_Nome tem que ser único!'
  })
  @IsNotEmpty({
    message: 'nm_Nome é obrigatório!'
  })
  @IsString({
    message: 'nm_Nome tem que ser do tipo string!'
  })
  nm_Nome: string

  //---------- Validators nm_Email--------------//

  @Expose({
    name: 'email'
  })
  @IsEmail({},{
    message: 'nm_Email tem que ser e-mail válido!'
  })
  nm_Email: string

  //---------- Validators ds_Senha--------------//

  @Expose({
    name: 'password'
  })
  @Exclude({
    toPlainOnly: true  //Exclui o campo no momento da serialização (quando os dadas podem ser trafegados na rede)
  })
  @IsNotEmpty({
    message: 'ds_Senha não pode estar vazio'
  })
  ds_Senha: string

  //------- Validators nm_Nome_Completo---------//

  @Expose({
    name: 'fullname'
  })
  @IsNotEmpty({
    message: 'nm_Nome_Completo é obrigatorio!'
  })
  nm_Nome_Completo: string

  //-------------------------------------------//

  dt_Entrada: string
}