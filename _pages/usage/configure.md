---
title:
description:

layout: docs
icon : icon-cog
---


# Overview

The `config.yml` file holds your blog's global configuration settings.

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em> &larr;</li>
</ul>

**NOTE:** All settings for comments, analytics, and syntax highlighting are now encapsulated into their respective widget modules.
Read the [Widgets Documentation](/usage/widgets) for more information.

# Base Settings


## Theme

Setting a theme name that matches a valid theme directory is required:

    theme : 'theme-name'
    
## Production URL

Set the URL to where your blog will be live on the Internet. This is needed to properly
generate your RSS feed and other features.

    production_url : 'http://yourdomain.com'


# Posts

## Post Summary

Ruhoh's templating system provides a `summary` helper which displays a summary of a post.

The summary is rendered using a "line count" parameter that will intelligently process the first n lines of your post. 
A custom summary line-count may be specified in the config file:

    posts :
      summary_lines : 30   # default is 20

The summary helper method has an "intelligent" way of counting lines so be sure to
read the [summary documentation](/usage/templating) for more info.

## Post Latest

Ruhoh's templating system provides a `posts_latest` helper which displays the latest _n_ posts.
Set a custom limit for `posts_latest` in the config file:

    posts :
      latest : 5   # default is 10


## Post Permalinks

Ruhoh provides fine-grained control over how your post's permalinks are generated.

Set global permalink formatting in the config.yml file as specified:

    posts :
      permalink : '/:categories/:title'


## Permalink Variables

<table class="table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>:year</td>
      <td>Year from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:month</td>
      <td>Month from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:day</td>
      <td>Day from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:title</td>
      <td>Title from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:filename</td>
      <td>NEW! The post file's filename (not including path).</td>
    </tr>
    
    <tr>
      <td>:categories</td>
      <td>The specified categories for this post. If more than one category is set, only the first one is used. If no categories exist, the URL omits this parameter.</td>
    </tr>
    
    <tr>
      <td>:i_month</td>
      <td>Month from the post’s filename without leading zeros.</td>
    </tr>
    
    <tr>
      <td>:i_day</td>
      <td>Day from the post’s filename without leading zeros.</td>
    </tr>
    
  </tbody>  
</table>
        

## Permalink Examples

Given the post filename: `2009-04-29-green-milk-tea.md`   
with categories: `['california/food', 'dairy']`

<table class="table-striped table-bordered">
  <thead>
    <tr>
      <th>Permalink Format</th>
      <th>Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(default)</td>
      <td>/2009/04/29/green-milk-tea.html</td>
    </tr>
    
    <tr>
      <td>/:categories/:title</td>
      <td>/california/food/green-milk-tea/index.html</td>
    </tr>
    
    <tr>
      <td>/:month-:day-:year/:title.html</td>
      <td>/04-29-2009/green-milk-tea.html</td>
    </tr>
    
    <tr>
      <td>/blog/:year/:month/:day/:title</td>
      <td>/blog/2009/04/29/green-milk-tea/index.html</td>
    </tr>

  </tbody>  
</table>

## Per-Post Permalinks

Set a custom permalink format on a _per-post_ basis via the post's YAML meta-data:

    # _posts/my-cool-post.md
    ---
    title: My Cool Post
    permalink: '/blog/:month/:year:/:title'
    ---

## Literal Per-Post Permalinks

Set a **literal** permalink by omitting variable tokens:

    # _posts/my-cool-post.md
    ---
    title: My Cool Post
    permalink: 'legacy-blog/123/RandomFolder/category/my_cool_post'
    ---

Literal permalinks are useful when importing legacy blog posts from other blogging systems,
since you'd want to preserve existing links.

### NOTE

Each node of a literal permalink is still passed through `CGI::escape()` to properly build a valid URL.
Please let me know if this causes any problems, or does not fit your use-case.

## Posts Default Layout

All posts have a global default layout value that will be used when the layout parameter 
is _not_ specifically set in the post file's YAML meta-data. The _default_ "default global layout value" for posts is set to: `post`.

Manually set a custom default layout in the config:
  
    posts :
      layout : 'custom-post-layout'
      
Remember this is just a default. It allows you to not always have to specify a layout param in every post file.
However layout values in post files always take precedence.

## Posts exclude

To exclude post files from the being processed by ruhoh, pass a String representation of a regular expression to the `exclude` parameter:

    posts:
      exclude: '~$'

Optionally pass multiple values via Array:

    posts:
      exclude: ['~$', '^_posts\/rotten-posts\/']

Strings get converted to a regular  expression using: `Regexp.new(str)` so encapsulating forward slashes are not needed.
Remember to also escape necessary special characters.

### NOTE

All posts filenames actually begin with `_posts/`. So if you want to match the start of any post files you have to do it like this:

    posts:
      exclude: '^_posts\/'


# Pages 

## Pages Permalink

Currently all page permalinks simply model their respective physical filepaths.

For "pretty URLS" that omit the file extension e.g.: `/some-page` vs `/some-page.html`.
we can traditionally specify a file at `/some-page/index.html` though all your files will be named `index.html`. 

To enable global _automatic_ "pretty urls" for all pages, _without_ needing to define index.html files:

### Enable global pretty paths for all pages:

    pages:
      permalink: 'pretty'
      
### Enable pretty paths on a per page basis:

    # _pages/some-page.md
    ---
    title: some-page
    descripton: you bet
    permalink: 'pretty' # <-----------
    ---  

## Pages Default Layout

All pages have a global default layout value that will be used when the layout parameter 
is _not_ specifically set in the page file's YAML meta-data. The _default_ "default global layout value" for pages is set to: `page`.

Manually set a custom default layout in the config:
  
    pages :
      layout : 'custom-page-layout'
      
Remember this is just a default. It allows you to not always have to specify a layout param in every page file.
However layout values in page files always take precedence.


## Pages Exclude

To exclude page files from the being processed by ruhoh, pass a String representation of a regular expression to the `exclude` parameter:

    pages:
      exclude: '~$'

Optionally pass multiple values via Array:

    pages:
      exclude: ['~$', '^rotten-pages\/']

Strings get converted to a regular  expression using: `Regexp.new(str)` so encapsulating forward slashes are not needed.
Remember to also escape necessary special characters.

