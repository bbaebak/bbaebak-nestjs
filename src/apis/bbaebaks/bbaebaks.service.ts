import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationService } from '../verification/verification.service';
import { SignDto } from './dto/sign.dto';
import { UpdateDto } from './dto/update-bbaebak.dto';
import { Bbaebak } from './entities/bbaebak.entity';
import { Mate } from './entities/mate.entity';

@Injectable()
export class BbaebaksService {
  constructor(
    @InjectRepository(Bbaebak)
    private bbaebaksRepository: Repository<Bbaebak>,
    @InjectRepository(Mate)
    private readonly matesRepository: Repository<Mate>,
    private readonly verificationService: VerificationService,
  ) {}

  // 1. 초기 상태 설정
  async initialize() {
    return await this.bbaebaksRepository.save({
      status: 'draft',
    });
  }

  // 2. 약속 상세 조회
  async getBbaebakById(id: string) {
    const bbaebak = await this.bbaebaksRepository.findOne({
      where: { id },
      relations: ['mates'],
    });

    if (!bbaebak) {
      throw new NotFoundException('약속을 찾을 수 없습니다.');
    }
    return bbaebak;
  }

  // 3. 약속 정보 업데이트
  async update(id: string, updateDto: UpdateDto) {
    const { maker, date, desc, mates } = updateDto;
    if (!maker || !date || !desc || !mates?.length) {
      throw new BadRequestException('필수 입력값이 누락되었습니다.');
    }

    const bbaebak = await this.verificationService.verify(Bbaebak, id);
    if (!bbaebak) {
      throw new NotFoundException('약속을 찾을 수 없습니다.');
    }

    // 기본 정보 업데이트
    bbaebak.maker = maker;
    bbaebak.date = date;
    bbaebak.desc = desc;

    // 참여자 정보 업데이트
    if (updateDto.mates) {
      // 기존 참여자 삭제
      await this.matesRepository.delete({ bbaebak: { id } });

      // 새로운 참여자 추가
      const mates = updateDto.mates.map((name) =>
        this.matesRepository.create({
          name: name.name,
          isSigned: false,
          bbaebak,
        }),
      );
      bbaebak.mates = await this.matesRepository.save(mates);
    }
    return this.bbaebaksRepository.save(bbaebak);
  }

  async makerSign(id: string, signDto: SignDto) {
    const bbaebak = await this.verificationService.verify(Bbaebak, id);
    if (!bbaebak) {
      throw new NotFoundException('약속을 찾을 수 없습니다.');
    }

    bbaebak.status = signDto.isSigned ? 'signed' : 'draft';
    return this.bbaebaksRepository.save(bbaebak);
  }

  async mateSign(id: string, mateId: string, signDto: SignDto) {
    const bbaebak = await this.verificationService.verify(Bbaebak, id, [
      'mates',
    ]);
    if (!bbaebak) {
      throw new NotFoundException('약속을 찾을 수 없습니다.');
    }

    // 참여자 찾기
    const mate = bbaebak.mates.find((m) => m.id === mateId);
    if (!mate) {
      throw new NotFoundException('참여자를 찾을 수 없습니다.');
    }

    // 참여자 서명 상태 업데이트
    mate.isSigned = signDto.isSigned;
    await this.matesRepository.save(mate);

    // 모든 참여자가 서명했는지 다시 확인
    const updatedBbaebak = await this.bbaebaksRepository.findOne({
      where: { id },
      relations: ['mates'],
    });

    const allMatesSigned = updatedBbaebak.mates.every((m) => m.isSigned);
    if (allMatesSigned) {
      updatedBbaebak.status = 'completed';
      return this.bbaebaksRepository.save(updatedBbaebak);
    }

    return this.getBbaebakById(id);
  }

  // 5. 약속 삭제
  async remove(id: string) {
    const bbaebak = await this.verificationService.verify(Bbaebak, id);
    if (!bbaebak) {
      throw new NotFoundException('약속을 찾을 수 없습니다.');
    }

    return this.bbaebaksRepository.softRemove(bbaebak);
  }

  // 6. 약속 목록 조회
  async getBbaebaks() {
    return this.bbaebaksRepository.find({
      relations: ['mates'],
      order: { createdAt: 'DESC' },
    });
  }
}
