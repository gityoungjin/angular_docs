import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, first } from 'rxjs';

@Directive({
  selector: '[appPageTreePicker]'
})
export class PageTreePickerDirective implements OnDestroy, OnInit{
  
  // 현재 page id(== book id)
  @Input('pageId')
  pageId: any;

  // 라우트 파라미터로부터 추출한 page id(== book id)
  paramValue: any;

  // 시발뭐더라이게 ?
  private routeSub: any;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    // 현재 요소
    private el: ElementRef
  ) { }

  // "mouse-enter"시 해당 페이지 스타일 변경
  @HostListener('mouseenter') 
  onMouseEnter() {
    if ( this.pageId == this.paramValue ) {
      return;
    }
    this.el.nativeElement.style.backgroundColor = '#337ab7'
    this.el.nativeElement.style.color = 'white'
  }

  // "mouse-leave"시 해당 페이지 스타일 변경
  @HostListener('mouseleave')
  onMouseLeave() {
    if ( this.pageId == this.paramValue ) {
      return;
    }
    this.el.nativeElement.style.backgroundColor = 'white'
    this.el.nativeElement.style.color = 'black'
  }

  
  ngOnInit(): void {

    // 라우트 파라미터로부터 id 추출
    this.route.children[0].paramMap.pipe(first()).subscribe((params) => {
      this.paramValue = params.get('id');
      
      this.highlight();
    })

    // 시발뭐지이게?
    this.routeSub = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.paramValue = this.route.children[0].snapshot.paramMap.get('id');
      
      this.highlight();
    })

  }

  highlight() {
    if ( this.pageId == this.paramValue ) {
      this.el.nativeElement.style.backgroundColor = '#337ab7'
      this.el.nativeElement.style.color = 'white'
    } else {
      this.el.nativeElement.style.backgroundColor = 'white'
      this.el.nativeElement.style.color = 'black'
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
