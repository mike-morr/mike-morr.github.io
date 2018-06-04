import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as matter from 'yaml-front-matter';
import { Post } from '../../models/post';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PostComponent implements OnInit {
  created: Date;
  postName = '';
  markdown = '';
  title = '';
  loading = true;

  constructor(private route: ActivatedRoute) { }

  async ngOnInit () {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('postName'))
      )
    ).subscribe(d => this.postName = d);

    const file = await fetch(`/_posts/${this.postName}.md`);
    const text = await file.text();
    const content = text.trim();
    this.parseFrontMatter(content);
  }

  parseFrontMatter (content: string) {
    const frontMatter: Post = matter.loadFront(content);
    this.title = frontMatter.title;
    this.created = frontMatter.created;
    this.markdown = frontMatter.__content;
    this.loading = false;
  }
}
