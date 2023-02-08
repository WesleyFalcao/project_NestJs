import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FillterException implements ExceptionFilter{

  private HttpAdapter: AbstractHttpAdapter

  constructor(adapterHost: HttpAdapterHost){
    this.HttpAdapter = adapterHost.httpAdapter; //usado para pegar a referência do motor que estou utlizando, seja Fastfy ou Express
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    const { status, body } = exception instanceof HttpException
      ? {
        	status: exception.getStatus(),
          body: exception.getResponse()
        }
        : {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timeStamp: new Date().toISOString(),
            message: exception.message,
            path: request.path
          }
        }
      this.HttpAdapter.reply(response, body, status);
  }
}