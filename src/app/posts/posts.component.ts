import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import * as matter from 'yaml-front-matter';

@Component({
  selector: 'blog-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postTitles = ['Angular-6-Router-How-To-Get-Route-Parameters'];
  posts: Post[] = [];
  loading = true;

  constructor() { }

  ngOnInit () {
    this.postTitles.map(async p => {
      const postUrl = `/_posts/${p}.md`;
      const response = await fetch(postUrl);
      const text = await response.text();
      const content = text.trim();
      const frontMatter: Post = matter.loadFront(content);

      this.posts.push({
        author: frontMatter.author,
        title: frontMatter.title,
        created: frontMatter.created,
        postUrl: `/post/${p}`,
        __content: frontMatter.__content
      });
    });

    this.loading = false;
  }



}
