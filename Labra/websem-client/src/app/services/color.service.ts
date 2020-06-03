import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  generatePalette(n: number) {
    const max = 0xffffff;
    const palette = [];

    for (let i = 0; i < n; i++) {
      palette.push('#' + Math.round(Math.random() * max).toString(16));
    }
    return palette;
  }
}
