import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Board2Document = HydratedDocument<Board2>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Board2 {
  
  @Prop({ type: String, required: true, maxlength: 30 })
  title: string;

  @Prop({ type: String, required: true, maxlength: 30 })
  description: string;

  @Prop({ type: String, required: true, maxlength: 30 })
  category: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: Boolean, required: true })
  isPublic: Boolean;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: null, type: mongoose.Schema.Types.Date })
  deletedAt: Date;

}

export const Board2Schema = SchemaFactory.createForClass(Board2);