import { getMongoRepository, EntityTarget } from 'typeorm';
import { ObjectID } from 'mongodb';

export class BaseRepository<T> {
  public model: EntityTarget<T>;

  constructor(model: EntityTarget<T>) {
    this.model = model;
  }

  public getRepository() {
    return getMongoRepository(this.model);
  }

  public findById(id: string) {
    return this.getRepository().findOne({
      where: { _id: new ObjectID(id) },
      cache: true,
    });
  }

  public findAndCount(limit = 10, offset = 0) {
    return this.getRepository().findAndCount({
      take: limit,
      skip: offset,
    });
  }

  public deleteById(id: string) {
    return this.getRepository().deleteOne({ _id: id });
  }

  public remove(item: T) {
    return this.getRepository().remove(item);
  }

  public create(item: T) {
    return this.getRepository().save(item);
  }

  public update(item: T) {
    return this.getRepository().save(item);
  }
}
