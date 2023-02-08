import { Injectable } from '@nestjs/common/decorators'
import { Usuario } from 'src/model/usuario.model';

@Injectable()
export class UsuarioService {
  private usuarios: Array<Usuario> = []

  Set_Criar_Usuario(usuario: Usuario): Usuario{
    this.usuarios.push(usuario)

    return usuario
  }

  Get_Buscar_User(nm_User){
    return this.usuarios.find( user => user.nm_Nome == nm_User)
  }
}