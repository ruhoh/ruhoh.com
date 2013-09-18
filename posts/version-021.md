---
title: version 0.2.1
date: '2012-05-09'
description:
categories: releases
tags: []

layout: post
---


## Automatically enable Pretty Urls for Pages.

I prefer the pretty urls over the .html format. Previously this meant making all my pages like this:

{{# folder_tree }}
  _pages
    about
      index.md
    contact
      index.md
{{/ folder_tree }}

But I grew increasingly annoyed that all my pages are named `index`. Also it just feels bloated.
Much better if I can do this:


{{# folder_tree }}
  _pages
    about.md
    contact.md
{{/ folder_tree }}

but still have the urls export to `/about` and `/contact`

Now we can, both globally and per-page:

### Enable global pretty paths for all pages:

    #_config.yml
    pages:
      permalink: 'pretty'
      
### Enable pretty paths on a per page basis:

    # _pages/some-page.md
    ---
    title: some-page
    descripton: you bet
    permalink: 'pretty' # <-----------
    
    layout: page
    ---  

<p style="height:20px"></p>

## Excluding Posts and Pages From Processing.

It's been brought to my attention that environments such as emacs create temporary files which get processed as posts.
I've revamped the exclude filters to solve this problem.

### Excluding Posts

Use the `exclude` attribute to pass a String or an Array of Strings that represent regular expressions:

    #_config.yml
    exclude: '~$'
    # This will omit any post file ending with a tilde.

OR pass in an Array:
  
    #_config.yml
    exclude: ['^_posts/secret-posts/', '~$']
    # This omits any post file in the secret-posts folder, and any file ending with a tilde.

    
**Important:** All strings are processed as regular expressions. They get parsed through:

    Regex.new(mystring)


### Excluding Pages

The exact same rules apply for pages. Only they must be set at:

    #_config.yml
    pages:
      exclude: '~$'
    # This will omit any page file ending with a tilde.

## Thanks!

What do you guys think of the changes? Any more ideas for workflow improvements?