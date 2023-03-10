import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Book } from "./book.schema";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Page {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  bookId: Book;

  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Page' })
  parentId: Page;

  @Prop({ type: String, required: true, trim: true, maxlength: 30 })
  title: string;

  @Prop({ type: String, maxlength: 3000 })
  content: string;

  @Prop({ type: Number, required: true, maxlength: 3 })
  order: number;

  @Prop({ type: Number, required: true, maxlength: 3 })
  level: number;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: null })
  deletedAt: Date;

}

export const PageSchema = SchemaFactory.createForClass(Page);
export type PageDocument = HydratedDocument<Page>;