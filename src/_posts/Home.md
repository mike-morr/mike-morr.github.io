---
author: Mike Morrison
created: 6/1/2018
title: Home Page for Blog and a really long blog post title for something interesting!
---
# Random Thoughts #

This blog is mainly for dumping my thoughts on different technologies.  Mostly around development.

---

Things that interest me:

* Angular
* C#
* DotNet Core
* F#
* JavaScript / TypeScript
* PowerShell
* React
* SharePoint Online

Deploy command:

PowerShell with syntax highlighting:

```powershell

$filePath = "./DummyFile.txt"
$siteUrl = "https://path.to.sharepoint/sites/your-team-site"
$docLib = "Documents"

Add-Type -Path .\OnlineClient\Microsoft.SharePoint.Client.dll -ErrorAction Stop
Add-Type -Path .\OnlineClient\Microsoft.SharePoint.Client.Runtime.dll  -ErrorAction Stop

function New-LargeFile {
  Param ([string] $fileSize) # Specified as bytes
  $path = $filePath
  if (Test-Path $path) {
    Remove-Item $path
  }
  $file = [IO.File]::Create($filePath)
  $file.SetLength($fileSize)
  $file.Close()
}

New-LargeFile -FileSize (1024 * 100000) # Creates 100MB File

$creds = Get-Credential -Message "Enter your SPO credentials in user@domain.com format."
$spoCreds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($creds.UserName, $creds.Password)
$clientContext = New-Object Microsoft.SharePoint.Client.ClientContext($siteUrl)
$clientContext.Credentials = $spoCreds
$clientContext.RequestTimeout = -1

. ./Common.ps1

```

TypeScript with syntax highlighting:

```typescript
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
    const file = await fetch('/assets/Home.md');
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

```
