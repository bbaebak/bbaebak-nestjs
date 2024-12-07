import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class VerificationService {
  constructor(private readonly dataSource: DataSource) {}

  async verify<TEntity extends { id: string }>(
    entity: new () => TEntity,
    entityId: string,
    relations: string[] = [],
  ): Promise<TEntity | undefined> {
    const repository: Repository<TEntity> =
      this.dataSource.getRepository(entity);
    return await repository.findOne({
      where: { id: entityId } as FindOptionsWhere<TEntity>,
      relations,
    });
  }
}
