import { InjectModel } from '@nestjs/mongoose';
import { HUserDocument, User } from './../model/user.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DbRepository } from './db.repository';

@Injectable()
export class UserRepository extends DbRepository<HUserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<HUserDocument>) {
    super(userModel);
  }
}
