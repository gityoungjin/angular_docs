import { NotFoundException } from '@nestjs/common/exceptions';
import { UpdateBoard2Dto } from './../../dto/board2.dto';
import { CreateBoard2Dto } from '../../dto/board2.dto';
import { Board2, Board2Document } from '../../schema/board2.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class Board2Service {

    constructor(
        @InjectModel(Board2.name)
        private board2Model : Model<Board2Document>,
    ) {}

    // 게시판 목록 조회
    async selectBoard2List(): Promise<any[]> {
      const list = await this.board2Model
        .find();

      return list;
    }

    // 게시판 상세조회
    async selectBoard2Detail(_id:string) : Promise<any> {
      return this.board2Model.findById({_id});
    }

    // 게시판 생성
    async createBoard2(board2Dto : CreateBoard2Dto) : Promise<any> {
        this.board2Model.create({
            ...board2Dto
        });
    }

    // 게시판 수정
    async updateBoard2(_id : string, board2Dto : UpdateBoard2Dto) : Promise<any> {
      const data = await this.board2Model.exists({_id});
      if (!data){
        throw new NotFoundException(`not found.`);
      }
      return this.board2Model.findByIdAndUpdate(_id, board2Dto);
    }

    // 게시판 삭제
    async deleteBoard2(_id : string) {
      const data = await this.board2Model.exists({_id});
      if (!data){
        throw new NotFoundException(`not found.`);
      }

      return await this.board2Model.findByIdAndRemove({_id});
    }

  }