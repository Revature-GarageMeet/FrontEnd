import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringconversionService {

  constructor() { }

  profRegex = /(fuck|pissed|fag|shit|damnit|faggot)|(nig)\B/gi;

  public ChangeCharacter(entry: string): string
  {
    entry = entry.replaceAll(`[ENTER]`, '\n');
    //PROFANITY FILTER
    entry = entry.replaceAll(this.profRegex, "[CENSORED] ");
    //PROFANITY FILTER
    //console.log(entry);

    return entry;
  }
}
