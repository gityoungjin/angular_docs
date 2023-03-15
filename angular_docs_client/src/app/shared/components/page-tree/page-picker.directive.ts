import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, first } from 'rxjs';

@Directive({
  selector: '[appPagePicker]'
})
export class PagePickerDirective implements OnDestroy, OnInit{
  
  constructor(private router: Router, private route: ActivatedRoute, private el: ElementRef) { }
  
  @Input('pageId')
  pageId: any;
  paramValue: any;
  private routeSub: any;

  @HostListener('mouseenter') 
  onMouseEnter() {
    if ( this.pageId == this.paramValue ) {
      return;
    }
    this.el.nativeElement.style.backgroundColor = '#337ab7'
    this.el.nativeElement.style.color = 'white'
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if ( this.pageId == this.paramValue ) {
      return;
    }
    this.el.nativeElement.style.backgroundColor = 'white'
    this.el.nativeElement.style.color = 'black'
  }

  
  ngOnInit(): void {
    this.route.children[0].paramMap.pipe(first()).subscribe((params) => {
      this.paramValue = params.get('id');
      
      this.highlight();
    })

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
