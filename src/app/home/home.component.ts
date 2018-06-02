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
  loading = true;

  constructor() { }

  async ngOnInit () {
    const file = await fetch('/_posts/Home.md');
    const text = await file.text();
    const content = text.trim();
    this.parseFrontMatter(content);
  }

  parseFrontMatter (content: string) {
    const frontMatter: Post = matter.loadFront(content);
    this.title = frontMatter.title;
    this.markdown = frontMatter.__content;
    this.loading = false;
  }
}
