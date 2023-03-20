import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class User {

    @Prop({ type: String, required: true, trim: true, maxlength: 30, unique: true })
    username: string

    @Prop({ type: String, required: true, trim: true, maxlength: 100 })
    password: string

    @Prop({ type: String, required: true, trim: true, maxlength: 30 })
    name : string

    @Prop({ type: String, required: true, trim: true, maxlength: 100, unique: true })
    email: string

    @Prop({ type: String, trim: true, maxlength: 30 })
    location: string

    @Prop({ type: Boolean, default: false })
    isVerify: boolean

    @Prop({ type: String })
    verifyToken: String

    @Prop({ type: String, trim: true })
    hashedRt: string
    
    @Prop({ type: mongoose.Schema.Types.Date })
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.Date })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);