
# Layouts

A layout can be thought of as a containing body for a page, a way to present your page and its content.

A page may specify a layout to render itself into. Additionally this layout may specify its own layout to render _itself_ into, thereby defining its sub-layout.

This makes it possible for a page to have a sub-layout and a master-layout. However, layouts will not be nested more than two levels deep.

## Create

Layouts are placed either in the layouts folder at the base of your website, or preferably within your theme's layouts folder for modularity:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>layouts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>common.html</em> &larr; blog-level layout</li>
    </ul>
  </li>
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em> &larr; (your theme)
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>layouts</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>default.html</em> &larr; theme-level layout</li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>posts.html</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>pages.html</em></li>
        </ul>
      </li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>media</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em></li>
    </ul> 
  </li>
</ul>

**Note that theme-level layouts will overload blog-level layouts.


### Create via the Command-line

The Ruhoh command-line client can automatically create layouts for the active theme.

    $ ruhoh layouts new splash

The command will create a file at:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>layouts</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>splash.html</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

Edit your layout as desired, then make sure to specify your new layout within the pages' YAML meta-data:

    ---
    layout: splash
    categories : ruby
    ---


## Not Using a Layout

It is possible to have every page define its own layout by injecting it right into the file:

**post: 'cool-post.html'**

{{#raw_code}}
&#045;&#045;&#045;
date: '2012-09-13'
tags : "chair"
&#045;&#045;&#045;

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    {{# stylesheets.load }}
      style.css
    {{/ stylesheets.load }}
  </head>
  <body>
      <div class="content">
        <p>A cool post about stuff.</p>
        <ul>
          <li>a</li>
          <li>cool</li>
          <li>list</li>
        </ul>
      </div>
  </body>
</html>
{{/raw_code}}


## Using a Layout

But we like separation of content and presentation so we can refactor this to use a layout:

**layout: 'my-layout.html'**

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    {{# stylesheets.load }}
      style.css
    {{/ stylesheets.load }}
  </head>
  <body>
    <div class="content">
      {{{ content }}}
    </div>
  </body>
</html>
{{/raw_code}}

**Note here we use the triple mustache syntax and call `content` which is always used for the master layouts (not sub-layouts).

**post: 'cool-post.html'**
{{#raw_code}}
&#045;&#045;&#045;
layout: "my-layout"
date: '2012-09-13'
tags : "chair"
&#045;&#045;&#045;

<p>A cool post about stuff.</p>
<ul>
  <li>a</li>
  <li>cool</li>
  <li>list</li>
</ul>
{{/raw_code}}

**Note that we tell the page/post which layout it should use in the YAML meta-data.

## Using a Sub-Layout

Suppose we have many type of resources, posts, pages, and we want different layouts for the sub-sections but still load into one global layout:

**layout: 'my-layout.html'**

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    {{# stylesheets.load }}
      style.css
    {{/ stylesheets.load }}
  </head>
  <body>
    <div class="content">
      {{{ content }}}
    </div>
  </body>
</html>
{{/raw_code}}

**Note here we use the triple mustache syntax and call `content` which yields the total content (including any sub-layouts).

**sub-layout: 'posts.html'**

{{#raw_code}}
<h1>My Post: {{page.title}}</h1>
<div class="inner post-body">
  {{{ page.content }}}
</div>
{{/raw_code}}

**Note here we use the triple mustache syntax and call `page.content` rather than `content.`
This is important as `content` is used for the master layouts, and `page.content` is used for the sub-layouts because `page.content` refers only to the specific page's content.

**post: 'cool-post.html'**

{{#raw_code}}
&#045;&#045;&#045;
layout: "posts"
date: '2012-09-13'
tags : "chair"
&#045;&#045;&#045;

<p>A cool post about stuff.</p>
<ul>
  <li>a</li>
  <li>cool</li>
  <li>list</li>
</ul>
{{/raw_code}}





