import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  book!: any;
  pageList!: any;
  routeParam!: any;
  routeData!: any;
  childData!: any;

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    // private dataTransferService: DataTransferService,
  ) {}

  ngOnInit(): void {

    this.route.children[0].paramMap.subscribe(
      (params) => this.routeParam = params.get("id")
    )

    this.route.children[0].data.subscribe(
      (data) => this.routeData = data["path"]
    )

    this.apiService.get<any>(`/${this.routeData == 'book' ? 'book/book-id' : 'page/page-id'}/${this.routeParam}`).subscribe(
      (value) => {
        this.book = value.book; 
        this.pageList = value.pageList;
      }
    )

    // this.dataTransferService.currentData.subscribe(
    //   (data) => {
    //     const changedData = this.pageList?.map((ele:any) => {
    //       if ( ele._id == data._id ) {
    //         ele.title = data.title
    //       }
    //       return ele;
    //     })
    //     this.pageList = changedData
    //   }
    // )
  }

  createPage() {
    this.apiService.post(`/page/new`, {bookId: this.book._id}).subscribe(
      (data:any) => {
        this.pageList.push(data)
      }
    )
  }

}
