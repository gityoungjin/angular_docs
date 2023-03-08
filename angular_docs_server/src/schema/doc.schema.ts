import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Chapter } from "./chapter.schema";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Doc {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' })
  chapterId: Chapter;

  @Prop({ type: Number, required: true, maxlength: 3 })
  order: number;

  @Prop({ type: String, required: true, trim: true, maxlength: 100 })
  title: string;

  @Prop({ type: String, maxlength: 3000 })
  content: string;
  
  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: null })
  deletedAt: Date;

}

export const DocSchema = SchemaFactory.createForClass(Doc);
export type DocDocument = HydratedDocument<Doc>;