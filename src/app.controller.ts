import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello() {
    const result = this.appService.getHello();
    return {
      statusCode: HttpStatus.OK,
      message: 'Hello World',
      data: result,
    };
  }
}
