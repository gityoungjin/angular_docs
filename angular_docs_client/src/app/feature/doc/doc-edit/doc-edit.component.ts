import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.scss']
})
export class DocEditComponent implements OnInit{

  docId!: string | null;
  
  chapters: any;

  doc: any;
  title!: string;
  contents!: string;
  
  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.docId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.apiService.get(`/doc/${this.docId}`).subscribe(
      (data) => this.doc = data
    )
  }

  saveData() {

  }

  deleteData() {
    
  }

}
