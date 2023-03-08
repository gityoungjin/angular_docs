import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Book {

  @Prop({ type: String, required: true, trim: true, maxlength: 30 })
  title: string;

  @Prop({ type: String, required: true, maxlength: 2000  })
  description: string;

  @Prop({ type: String, required: true, trim: true, maxlength: 30 })
  author: string;
  
  @Prop({ type: Number, default: 0, maxlength: 4 })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: null })
  deletedAt: Date;

}

export const BookSchema = SchemaFactory.createForClass(Book);
export type BookDocument = HydratedDocument<Book>;