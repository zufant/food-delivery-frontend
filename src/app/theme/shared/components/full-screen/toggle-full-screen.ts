
import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import screenfull from 'screenfull';

@Directive({
  selector: '[appToggleFullScreen]'
})
export class ToggleFullScreenDirective {
  private elements = inject(ElementRef);
  @HostListener('click')
  onClick() {
    if (screenfull.isEnabled) {
      this.elements.nativeElement.querySelector('.feather').classList.toggle('icon-maximize');
      this.elements.nativeElement.querySelector('.feather').classList.toggle('icon-minimize');
      screenfull.toggle();
    }

    if (isScreenFull(screenfull)) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request();
      }
    }
  }
}

function isScreenFull(sf) {
  return sf.isFullscreen;
}
