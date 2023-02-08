import { Injectable } from '@nestjs/common/decorators';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { NestResponse } from './nest-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Esse interceptor serve para 'Ensinar' o Nestjs a utilizar o retorno NestResponse na controller de Usuario

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor{

  private HttpAdapter: AbstractHttpAdapter

  constructor(adapterHost: HttpAdapterHost){
    this.HttpAdapter = adapterHost.httpAdapter; //usado para pegar a referência do motor que estou utlizando, seja Fastfy ou Express
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle()
                .pipe(
                  map( (responseController: NestResponse) => {
                    if (responseController instanceof NestResponse){
                      const contexto = context.switchToHttp()   //pegando o contexto http da aplicação
                      const response = contexto.getResponse()

                      const { headers, status, body } = responseController
                      
                      const namesHeaders = Object.getOwnPropertyNames(headers) //Retorna um array com o nomes dos cabecalhos['cabecalho1', 'cabecalho2']

                      namesHeaders.forEach( nameHeader => {
                        const valueHeader = headers[nameHeader]
                        this.HttpAdapter.setHeader(response, nameHeader, valueHeader)
                      })

                      this.HttpAdapter.status(response, status)

                      return body
                    }

                    return responseController
                  })
                )
  }
}