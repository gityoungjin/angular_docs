import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Doc, DocDocument } from "src/schema/doc.schema";

@Injectable()
export class DocService {

  constructor(
    @InjectModel(Doc.name)
    private docModel : Model<DocDocument>,
  ) {}

  }