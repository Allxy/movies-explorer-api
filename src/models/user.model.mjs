import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('user', userSchema);
