import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  role: USER_ROLE;
}

interface UserDocs extends IUser, mongoose.Document {
  verifyPassword(plainPassword: string): Promise<boolean>;
}

interface UserModelInterface extends mongoose.Model<UserDocs> {
  build(attr: IUser): UserDocs;
}

const userSchema = new mongoose.Schema<UserDocs>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Name too short'],
      maxlength: [100, 'Name too long'],
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [3, 'Username too short'],
      maxlength: [100, 'Username too long'],
      validate: {
        // Check username is already taken or not
        validator: async function (v: string): Promise<boolean> {
          const doc = await User.findOne({ username: v });
          if (doc) return doc.id === this.id;
          else return Boolean(!doc);
        },
        message: 'Username is already taken',
      },
    },
    role: {
      type: String,
      required: true,
      enum: [USER_ROLE.ADMIN, USER_ROLE.USER],
      default: USER_ROLE.USER,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [8, 'Email too short'],
      maxlength: [255, 'Email too long'],
    },
  },
  // createdAt and updatedAt timestamps
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // If password is not modified, then return
  if (!this.isModified('password') || !this.password) next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Password verify method, our own instance method of mongoose Document
userSchema.methods.verifyPassword = async function (
  plainPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, this.password);
};

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

export const User = mongoose.model<UserDocs, UserModelInterface>(
  'User',
  userSchema,
);
