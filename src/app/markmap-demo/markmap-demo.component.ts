import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Markmap, loadCSS, loadJS } from 'markmap-view';
import { Transformer } from 'markmap-lib';
@Component({
  selector: 'app-markmap-demo',
  templateUrl: './markmap-demo.component.html',
  styleUrls: ['./markmap-demo.component.scss']
})
export class MarkmapDemoComponent implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) {
    
  }
  ngAfterViewInit(): void {
     
    const markdownContent = `
    # My Markdown Document
    - Item 1
    - Item 2
      - Subitem 2.1
      - Subitem 2.2
  `;

  const transformer = new Transformer();

  const svgEl = this.el.nativeElement.querySelector('#markmap');

  // 1. transform Markdown
const { root, features } = transformer.transform(markdownContent);

// 2. get assets
// either get assets required by used features
const { styles, scripts } = transformer.getUsedAssets(features);

// // or get all possible assets that could be used later
// const { styles, scripts } = transformer.getAssets(features);
if (styles) loadCSS(styles);
if (scripts) loadJS(scripts, { getMarkmap: () => (window as any)['markmap'] });

  console.log(root);
  Markmap.create(svgEl, {}, root); 
  }
  ngOnInit(): void {
  
  }
   

}
