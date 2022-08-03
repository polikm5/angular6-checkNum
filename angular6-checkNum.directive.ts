
import { Directive,ElementRef,HostListener,Input,Renderer2,OnInit } from '@angular/core';

@Directive({
  selector: '[numFormat]'
})
export class NumFormatDirective implements OnInit {
  constructor(private e1:elementRef,
              private renderer: Renderer2) { }
   //小数位数
   @Input('numFormat') numFormat: number = 2;
   
   ngOnInit() {}
   
   @HostListener('keyup',["event"]) format(ev) {
      let val = ev.target.value;
      if(this.numFormat == 0) {
        ev.target.value = val.replace(/^(0+)|[^\d]+/g,'');
      } else if(this.numFormat > 0) {
            ev.target.value = ev.target.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符

        　　ev.target.value = ev.target.value.replace(/^\./g,""); //验证第一个字符是数字而不是.

        　　ev.target.value = ev.target.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
    
        　　ev.target.value = ev.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");//只允许输入一个小数点
            let str = '\\d'.repeat(this.numFormat);
            let reg = new RegExp(`^(\\-)*(\\d+)\\.(${str}).*$`)
        　　ev.target.value = ev.target.value.replace(reg,'$1$2.$3'); //只能输入numFormat个小数
      }
      
      // jquery 的trigger事件 可以换成原生的
      $(this.el.natvieElement).trigger('input');
      $(this.el.natvieElement).trigger('change');
   }
}


// 使用
<input type="text" [numFormat]="2" />
