import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BbaebaksService } from './bbaebaks.service';
import { SignDto } from './dto/sign.dto';
import { UpdateDto } from './dto/update-bbaebak.dto';

@Controller('bbaebak')
export class BbaebaksController {
  constructor(private readonly bbaebaksService: BbaebaksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async initialize() {
    const result = await this.bbaebaksService.initialize();
    return {
      statusCode: HttpStatus.CREATED,
      message: '약속이 생성되었습니다.',
      data: result,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    const result = await this.bbaebaksService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: '약속이 업데이트되었습니다.',
      data: result,
    };
  }

  @Patch(':id/sign')
  @HttpCode(HttpStatus.OK)
  async makerSign(@Param('id') id: string, @Body() signDto: SignDto) {
    const result = await this.bbaebaksService.makerSign(id, signDto);
    return {
      statusCode: HttpStatus.OK,
      message: '메이커 서명이 완료되었습니다.',
      data: result,
    };
  }

  @Patch(':id/sign/:mateId?')
  @HttpCode(HttpStatus.OK)
  async mateSign(
    @Param('id') id: string,
    @Param('mateId') mateId: string,
    @Body() signDto: SignDto,
  ) {
    const result = await this.bbaebaksService.mateSign(id, mateId, signDto);
    return {
      statusCode: HttpStatus.OK,
      message: '메이트 서명이 완료되었습니다.',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const result = await this.bbaebaksService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: '약속이 삭제되었습니다.',
      data: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBbaebaks() {
    const result = await this.bbaebaksService.getBbaebaks();
    return {
      statusCode: HttpStatus.OK,
      message: '약속 목록 조회가 완료되었습니다.',
      data: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBbaebak(@Param('id') id: string) {
    const result = await this.bbaebaksService.getBbaebakById(id);
    return {
      statusCode: HttpStatus.OK,
      message: '약속 조회가 완료되었습니다.',
      data: result,
    };
  }
}
