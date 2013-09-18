---
title: Ruhoh Version 1.1
date: '2012-08-26'
description:
categories: releases
---

## Upgrading

    # Fetch version 1.1 from rubygems:
    $ gem install ruhoh

    # If you're using bundler:
    $ bundle update ruhoh

## Features

### ruhoh console

Load and play with your data via an IRB console session:

    $ ruhoh console
    
Once the console is running you can inspect your data and run commands:

    > Ruhoh::DB.update_all
      6/6 Posts processed.
      23/23 Pages processed.
      6/6 Layouts processed.
      5/5 Widgets processed.
       => [:site, :posts, :pages, :routes, :layouts, :partials, :widgets, :theme_config, :stylesheets, :javascripts, :payload, :scaffolds]
    >
    > Ruhoh::DB.stylesheets
     => {"default"=>[{"url"=>"/assets/twitter/stylesheets/bootstrap.min.css", "id"=>"/Users/jade/Dropbox/active/ruhoh/ruhoh.com/themes/twitter/stylesheets/bootstrap.min.css"}, {"url"=>"/assets/twitter/stylesheets/style.css", "id"=>"/Users/jade/Dropbox/active/ruhoh/ruhoh.com/themes/twitter/stylesheets/style.css"}], "widgets"=>[{"url"=>"/assets/twitter/widgets/google_prettify/stylesheets/sunburst-custom.css", "id"=>"/Users/jade/Dropbox/active/ruhoh/ruhoh.com/themes/twitter/widgets/google_prettify/stylesheets/sunburst-custom.css"}]}
    >

### File scaffolds

When you generate drafts, posts, pages, and layouts from the command line ruhoh uses it's built in [file scaffolds](https://github.com/ruhoh/ruhoh.rb/tree/master/system/scaffolds).
You can now override these files with your custom blog-level scaffolds:

{{# folder_tree }}
  pages
  scaffolds
    draft.html
    post.html
{{/ folder_tree }}

{{#raw_code}}
&#35; scaffolds/post.html
&#45;&#45;&#45;
title:
date: '&#123;&#123;DATE&#125;&#125;'
description:
categories:
icon:
tags:
&#45;&#45;&#45;

I want this message on every blog post for some reason.
{{/raw_code}}

<i></i>
Generating a post will now always use your custom scaffold:

    $ ruhoh post "cool new post"

### Spawn new blog from mercurial repository.

When you spawn a new blog from the command line, ruhoh tries to git clone the blog scaffold.

    $ ruhoh new myblog

For users who use mercurial rather than git you can specify a mercurial endpoint to clone from:

    $ ruhoh new myblog <scaffold url> --hg


## Changes

### Urls are normalized to omit trailing slashes.

All urls previously added in trailing slashes. Now they are all removed.
This fixes a bug where pages would not be found if a user did not include a trailing slash in a permalink format.

### Partials may now have file extensions.

Partial files may now have extensions but will still be referenced by name excluding extension.

{{# folder_tree }}
  pages
  partials
    pages_list.html
    posts_collate.html
    posts_list.html
{{/ folder_tree }}

### Default partials now embedded into ruhoh gem.

Blogs no longer need to include the "default" partials as they will load automatically from the [ruhoh gem](https://github.com/ruhoh/ruhoh.rb/tree/master/system/partials).
Users may still override system level partials with blog-level partials.

### Theme scaffolding command removed from client.

Theme scaffolding has been removed from the command line tool. 

    $ ruhoh theme <name>

