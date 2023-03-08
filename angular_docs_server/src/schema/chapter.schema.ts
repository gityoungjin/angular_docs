import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Book } from "./book.schema";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Chapter {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  bookId: Book;

  @Prop({ type: String, required: true, trim: true, maxlength: 30 })
  title: string;

  @Prop({ type: Number, required: true, maxlength: 3 })
  order: number;

  @Prop({ type: Number, required: true, maxlength: 3 })
  level: number;

  @Prop({ type: mongoose.Schema.Types.Date })
  deletedAt: Date;

}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
export type ChapterDocument = HydratedDocument<Chapter>;