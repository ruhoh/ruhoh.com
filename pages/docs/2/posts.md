---
title:
description:

layout: docs-2
icon : icon-pencil
---

The post resource inherits from the same base resource class as the "pages" resource.
This means all documentation for pages is also true for the posts. Just replace "pages" with "posts" where appropriate.

# Create

Posts require no parameters so as to encourage a "write first" workflow.

## Create Post

To create a post, execute the following command in the working directory of your blog:

    $ ruhoh posts new

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>untitled-post.md</em> &larr;</li>
    </ul>
  </li>
</ul>

You can optionally pass in a title:

    $ ruhoh posts new "The Greatest Post Ever"

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>the-greatest-post-ever.md</em> &larr;</li>
    </ul>
  </li>
</ul>

Post files receive default meta-data, specifically, the date is always set the current date:

    ---
    date: '2012-04-12'
    categories:
    tags: []
    ---

Posts always use the _implicit_ "post.html" layout if no layout is specified.
Feel free to manually specify a layout on a per-post basis:

    ---
    date: '2012-04-12'
    categories:
    tags: []
    
    layout: 'super-post' # <------ specify your own layout
    ---


    
# Collection View

## posts.all

Returns an Array containing all posts objects in reverse chronological order.
Use mustache syntax to iterate over the array:

{{#raw_code}}
  <ul>
  {{# posts.all }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ posts.all }}
  </ul>
{{/raw_code}}


## posts.latest

The `posts_latest` helper method is the same as `posts` but is limited to the latest _n_ posts as configured

Use mustache syntax to iterate over the array:

{{#raw_code}}
<ul>
{{# posts.latest }}
  <li>
    <a href="{{url}}">{{title}}</a>
    {{{ content }}}
  </li>
{{/ posts.latest }}
</ul>
{{/raw_code}}


## posts.paginator

The paginator method intelligently renders chunks of posts per a given page.
It knows which page it is on so there is no need to pass a specific page number.

To initiate the "root" page (page #1) use `posts.paginator`:


{{#raw_code}}
<h2>Paginated Posts</h2>

{{# posts.paginator }}
<div class="post">
  <h3 class="title"><a href="{{url}}">{{title}}</a> <span class="date">{{ date }}</span></h3>

  {{{ summary }}}

  <div class="more">
    <a href="{{url}}" class="btn">read more..</a>
  </div>
</div>
{{/ posts.paginator }}
{{/raw_code}}


## posts.paginator_navigation

Use `posts.paginator_navigation` to display the page navigation links:

{{#raw_code}}
<ul>
{{#posts.paginator_navigation}}
  <li>
    {{^is_active_page}}
      <a href="{{url}}">{{name}}</a>
    {{/is_active_page}}
    
    {{#is_active_page}}
      <a href="{{url}}" style="color:red">{{name}}</a>
    {{/is_active_page}}
  </li>
{{/posts.paginator_navigation}}
</ul>
{{/raw_code}}


The links link to special pagination pages which use (by default) the `paginator.html` layout,
which just calls `posts.paginator` again but it internaly knows which pagination chunk to show.

See the paginator configuration docs below for more details.


# Model View

See the "pages" section for all model view methods since "posts" inherits from "pages".


# Configuration

See the "pages" section for all base configuration options since "posts" inherits from "pages".
Just remember to replace "pages" with "posts" where appropriate.

## Permalink

Ruhoh provides fine-grained control over how your post's permalinks are generated.

Set global permalink formatting in the config.yml file as specified:

    posts :
      permalink : '/:categories/:title'


### Permalink Variables

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
        

### Permalink Examples

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

### Per-Post Permalinks

Set a custom permalink format on a _per-post_ basis via the post's YAML meta-data:

    # posts/my-cool-post.md
    ---
    title: My Cool Post
    permalink: '/blog/:month/:year:/:title'
    ---

### Literal Per-Post Permalinks

Set a **literal** permalink by omitting variable tokens:

    # posts/my-cool-post.md
    ---
    title: My Cool Post
    permalink: 'legacy-blog/123/RandomFolder/category/my_cool_post'
    ---

Literal permalinks are useful when importing legacy blog posts from other blogging systems,
since you'd want to preserve existing links.

#### NOTE

Each node of a literal permalink is still passed through `CGI::escape()` to properly build a valid URL.
Please let me know if this causes any problems, or does not fit your use-case.


## Latest

`posts.latest` displays the latest _n_ posts.
Set a custom limit in the config file:

    posts :
      latest : 5   # default is 10



## RSS limit

An RSS feed is automatically generated when compiling your blog. By default
the latest 20 posts are added to the feed. Configure this amount using `rss_limit`:

    posts :
      rss_limit : 30   # default is 20


## Paginator

Currently the paginator only works with "posts" even though it should work with any resource.
Also the configuration is not scoped the the "posts" resource; it uses its own configuration:

    # config.yml
    paginator:
      namespace: "/posts/"
      per_page: 2
      root_page: "/"
      layout: "paginator"


<table class="table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>attribute</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>namespace</td>
      <td>URL namespace for paginated pages e.g: /posts/1, /posts/2</td>
    </tr>
    <tr>
      <td>per_page</td>
      <td>Number of posts per page</td>
    </tr>
    <tr>
      <td>root_page</td>
      <td>Where the root page (page #1) is. Will be '/' assuming you want the traditional blog style.</td>
    </tr>
    <tr>
      <td>layout</td>
      <td>The layout to use for every paginated page.</td>
    </tr>
  </tbody>
</table>


