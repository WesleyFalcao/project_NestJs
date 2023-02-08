import { NestResponse } from './nest-response';

export class NestResponseBuilder{
  private response: NestResponse = {
    status: 200,
    headers: {},
    body: {}
  }

  public WithStatus(status: number){
    this.response.status = status
    return this  //retorna o proprio objeto NestResponseBuilder, é utilizado para encadear chamadas
  }

  public WithHeaders(header: Object){
    this.response.headers = header
    return this  //retorna o proprio objeto NestResponseBuilder, é utilizado para encadear chamadas
  }

  public WithBody(body: Object){
    this.response.body = body
    return this  //retorna o proprio objeto NestResponseBuilder, é utilizado para encadear chamadas
  }

  public build(){
    return new NestResponse(this.response) //método que cria o objeto dento da class NestResponseBuilder e passa esse objeto para o NestResponse
  }
}