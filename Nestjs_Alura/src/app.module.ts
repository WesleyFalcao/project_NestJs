import { Module } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { FillterException } from './filter-exception/filter-exception.filter';
import { UsuarioModule } from './services/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FillterException
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ],
})
export class AppModule {}
