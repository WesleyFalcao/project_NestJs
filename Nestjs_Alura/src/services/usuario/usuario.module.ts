import { UsuarioController } from './../../controllers/usuario.controller';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { IsUserAlreadyExistConstraint } from 'src/pipes/usuario.pipe';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, IsUserAlreadyExistConstraint]
})

export class UsuarioModule{}