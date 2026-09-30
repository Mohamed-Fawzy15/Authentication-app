import {
  HydratedDocument,
  Model,
  ProjectionType,
  QueryOptions,
} from 'mongoose';

export abstract class DbRepository<TDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(data: Partial<TDocument>): Promise<HydratedDocument<TDocument>> {
    return this.model.create(data);
  }

  async findOne(
    filter: Record<string, any>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument | null>,
  ): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findOne(filter, projection, options);
  }

  async find(
    filter: Record<string, any>,
    select?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<HydratedDocument<TDocument>[]> {
    return this.model.find(filter, select, options);
  }
}
