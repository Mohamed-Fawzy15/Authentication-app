import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Hash } from '../../common';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    minlength: 3,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type HUserDocument = HydratedDocument<User>;

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await Hash(this.password);
      this.password = hashedPassword;
    }
  } catch (error) {
    console.error('Password hashing error:', error);
  }
});

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
