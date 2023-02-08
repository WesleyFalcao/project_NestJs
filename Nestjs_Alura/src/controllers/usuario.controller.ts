import { UsuarioService } from '../services/usuario/usuario.service';
import { Body, Controller, Post, Get, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { Usuario } from '../model/usuario.model';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';

@Controller('users')
export class UsuarioController{

  constructor(private usuarioService: UsuarioService){}

  @Get(':nm_User')
  public Get_Buscar_Usuario(@Param('nm_User') nm_Nome: String){
    const objUser = this.usuarioService.Get_Buscar_User(nm_Nome)

    if(!objUser){
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado'
      })
    }
    return objUser
  }

  @Post()
  public Set_Criar_Usuario(@Body() usuario: Usuario): NestResponse{

    const objusuarioCriado = this.usuarioService.Set_Criar_Usuario(usuario) 
    
    return new NestResponseBuilder()  //configurando o tipo da resposta
      .WithStatus(HttpStatus.CREATED)
      .WithHeaders({
        'Location': `/users/${objusuarioCriado.nm_Nome}`
      })
      .WithBody(objusuarioCriado)
      .build()
    }; 
}

