import ContestEntity from '@src/entities/ContestEntity';
import ContestCreateDto from '@src/models/contest/ContestCreateDto';
import ContestUpdateDto from '@src/models/contest/ContestUpdateDto';
import RepositoryInterface from '../RepositoryInterface';

export default interface ContestRepositoryInterface
  extends RepositoryInterface<
    ContestEntity,
    number,
    ContestCreateDto,
    ContestUpdateDto
  > {}
