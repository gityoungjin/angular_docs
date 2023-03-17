import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {

  routeParam!: any;
  page!: any;
  subPageList!: any;

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService,
  ){ }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(
      (params) => {
        this.routeParam = params.get("id");
        this.getSubPageList();
        this.getPageEditData();
      }
    )

  }

  getPageEditData() {
    this.apiService.get(`/page/${this.routeParam}`).subscribe(
      (data) => {
        this.page = data;
      }
    )
  }

  getSubPageList() {
    this.apiService.get(`/page/sub-pages/${this.routeParam}`).subscribe(
      (data) => {
        this.subPageList = data; 
        this.subPageList = [
          {
            _id: null,
            title: '없음',
          },
          ...this.subPageList,
        ]
      }
    )
  }

  saveData() {
    const formData = {
      title: this.page.title,
      content: this.page.content,
      parentId: this.page.parentId,
    }

    this.apiService.put(`/page/${this.page._id}`, formData).subscribe(
      () => location.reload()
      // () => this.dataTransferService.transferData({...formData, _id: this.page._id})
    )
  }

  deleteData() {
    this.apiService.delete(`/page/${this.page._id}`).subscribe(
      () => {
        this.router.navigateByUrl(`/edit/book/${this.page.bookId}`).then(
          () => location.reload()
        )
      }
    )
  }
  
}