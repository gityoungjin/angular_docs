import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, OnInit } from '@angular/core';

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
  

  constructor(private apiService: ApiService, private route: ActivatedRoute ) {}

  ngOnInit(): void {

    this.route.children[0].paramMap.subscribe(
      (params) => this.routeParam = params.get("id")
    )

    this.route.children[0].data.subscribe(
      (data) => this.routeData = data["path"]
    )

    this.apiService.get<any>(`/${this.routeData == 'book' ? 'book/book-id' : 'page/page-id'}/${this.routeParam}`).subscribe(
      (value) => {this.book = value.book; this.pageList = value.pageList; console.log(this.pageList)}
    )
  }

  createPage() {
    
  }

}
