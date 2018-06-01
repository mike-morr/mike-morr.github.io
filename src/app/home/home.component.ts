import { Component, OnInit } from '@angular/core';
import * as matter from 'yaml-front-matter';
import { Post } from '../../models/post';

@Component({
  selector: 'blog-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  markdown = '';
  title = '';

  constructor() { }

  async ngOnInit () {
    const file = await fetch('/assets/home.md');
    const text = await file.text();
    const content = text.trim();
    this.parseFrontMatter(content);
    // this.stripYaml(text);
  }
  parseFrontMatter (content: string) {
    const frontMatter: Post = matter.loadFront(content);
    this.title = frontMatter.title;
    this.markdown = frontMatter.__content;
  }

  stripYaml (content: string) {
    if (content.startsWith('---')) {
      const endingTagPos = content.indexOf('---', 4);
      this.markdown = content.substring(endingTagPos + 3).trim();
    }
  }

}
