---
title:
description:

layout: docs
icon : icon-list-alt
---



# Overview

Ruhoh uses [Mustache](http://mustache.github.com/) as its primary Templating system.
If you are unfamiliar with Mustache's philosophy and syntax you can get up to speed in about 10 minutes by going through the 
[README Examples](https://github.com/defunkt/mustache#readme)

Mustache takes in three main parameters when expanding a template:

<dl class="dl-horizontal">
  <dt>Template</dt>
  <dd>This is just a string of content. In Ruhoh this will be the current page body as rendered in its given layout(s).</dd>
  
  <dt>View Helpers</dt>
  <dd>The View is a ruby class which defines helper methods that can be used in the layout.</dd>
  
  <dt>Payload</dt>
  <dd>This is a Hash of your blog's data objects which are accessible in the Mustache Template.</dd>
</dl>

All pages in Ruhoh are expanded using one single, global Mustache View (ruby class).
This class defines helper methods useful for displaying your blog's data efficiently.

The mustache class and all of the included helpers are viewable here: <https://github.com/ruhoh/ruhoh.rb/tree/master/lib/ruhoh/templaters>


# Template Data

Much of ruhoh's job is to parse data from your blog. Once the data is processed, it is provided
to the templater to be used in the mustache templating system. 
The following outlines the main data objects available to you:

## Page

`page` is a globally accessible object that contains important meta-data for the **current page**. Remember in ruhoh a Page Object
can be a page, post, or draft.

<table class="table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>page.id</td>
      <td>The page's globally unique id. The id is the relative path to the file on disk.</td>
    </tr>
    <tr>
      <td>page.url</td>
      <td>The pages generated url/permalink.</td>
    </tr>
    <tr>
      <td>page.title</td>
      <td>The page title as determined from the filename or set explicitly in the page's YAML meta-data.</td>
    </tr>
    <tr>
      <td>page.date</td>
      <td>The page date as determined from the filename or set explicitly in the page's YAML meta-data.</td>
    </tr>
    <tr>
      <td>page.layout</td>
      <td>The page layout as set in the page's YAML meta-data.</td>
    </tr>
    <tr>
      <td>page.sub_layout</td>
      <td>The page sub_layout as processed by ruhoh</td>
    </tr>
    <tr>
      <td>page.master_layout</td>
      <td>The page master_layout as processed by ruhoh. May not be set if the post uses only one layout.</td>
    </tr>
    
  </tbody>
</table>

 
### Example Usage:

{{#raw_code}}
  <h1>{{ page.title }}</h1>
  <p>{{ page.date }}</p>
  <p>
    Link: <a href="{{page.url}}">{{page.title}}</a>
  </p>
{{/raw_code}}


### Custom Meta-Data

Note that any data added to a page's YAML meta-data will available in the `page` object.

    ---
    title: Oh Happy Day
    icon : sun
    days :
      - monday
      - tuesday
    ---  

Above, we've set special attributes `icon` and `days` which are now availble:

<table class="table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>page.icon</td>
      <td>String 'sun'</td>
    </tr>
    <tr>
      <td>page.days</td>
      <td>Array ['monday', 'tuesday']</td>
    </tr>
  </tbody>
</table>


## Site

`site` is a globally accessible object that contains all data from your `site.yml` file.
This allows you to define arbitrary data you want access to throughout your templates such as navigational lists.

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em></li>
  <li><span class="ui-silk inline ui-silk-page-white-database">.</span> <em>site.yml</em> &larr;</li>
</ul>

Additionally, the site object places everything found in `config.yml` at the key `site.config`.
Now you can reference all your configuration data in your templates if you need to.

### Example Usage

    # site.yml
    ---
    author :
      name : Jade Dominguez
      email : blah@email.test
      github : username
      twitter : username
      feedburner : feedname

In your templates:

{{#raw_code}}
<ul>
  <li>Author: {{ site.author.name }}</li>
  <li>email: {{site.author.email }}</li>
  <li>github: {{site.author.github }}</li>
</ul>
{{/raw_code}}


## URL Paths

<table class="table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>urls.theme</td>
      <td>The URL path to the currently enabled theme folder.</td>
    </tr>

    <tr>
      <td>urls.theme_stylesheets</td>
      <td>The URL path to the currently enabled theme stylesheets folder.</td>
    </tr>
    <tr>
      <td>urls.theme_javascripts</td>
      <td>The URL path to the currently enabled theme javascripts folder.</td>
    </tr>
    <tr>
      <td>urls.theme_media</td>
      <td>The URL path to the currently enabled theme media folder.</td>
    </tr>
    <tr>
      <td>urls.media</td>
      <td>The URL path to the global media folder.</td>
    </tr>
  </tbody>
</table>

### Example Usage

{{#raw_code}}
<head>
  <link href="{{ urls.theme_stylesheets }}/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="{{ urls.theme_stylesheets }}/css/style.css?body=adsf" media="all">
</head>
...
<img src="{{urls.media}}/images/happy-face.jpg">
{{/raw_code}}


These data objects are passed into the Templating system as the "payload" making them directly
accessible by the mustache templating code.

## Full Payload

The full payload object passed into the templating system is actually much bigger than just the objects we've covered.
Most notably ruhoh passes in the "database", seen below at the key: `db`.

You are free to access these data-structures directly, just as you would any other data-structure.
Think of these main keys as the **top-level endpoints** available to you in mustache.

    {
      "page"    => {...},
      "site"    => {...},
      "db"    => {
        "pages" => {...},
        "posts" => {
          "dictionary" => {...},
          "chronological" => [...],
          "collated" => [...],
          "tags" => {
            "tag1" => {...},
            "tag2" => {...},
          },
          "categories" => {
            "category1" => {...},
            "category2" => {...},
          }
        }
      },
      "urls" = {
        "theme" => "/..",
        "theme_stylesheets" => "/..",
        "theme_javascripts" => "/..",
        "theme_media" => "/..",
        "media" => "/.."
      }
    }

This is an abridged version. The ruhoh command-line tool provides a full output of your payload hash at any given time:

    $ ruhoh payload
    
You may also want to save it to a file to view it better:

    $ ruhoh payload > payload.txt
    
Viewing the payload is useful to understand what exactly is accessible to you in your templates.
It also provides insight into how ruhoh works with data.

## Database

Most all data is actually in the `db` object of the payload.
ruhoh stores "dictionaries" of all pages, posts, categories, and tags. 
A dictionary is an object of objects whose keys are the object ids.

    # example page dictionary:
    
    { "/my-page.md" => {
        "title" => "My Page",
        "id"  => "/my-page.md",
      },
      "/about.md" => {
        "title" => "About",
        "id"  => "/about.md",
      }
    }

The dictionaries are important because they store all the page, post, category, and tag data.
Everywhere else in the payload that references these objects **references only the object id**.

This optimizes the data-structures but it makes using the data with Mustache rather hard.
Firstly mustache does not iterate over objects/hashes, and secondly, when you reference a page id, you don't 
want to work with only the id, you want the page object that id represents.

This is where ruhoh's built-in helpers come in:

# Base Helpers

We've covered the raw data that passes into the template but accessing the raw data-structures is not always efficient or useful.
Ruhoh's base mustache helper methods makes accessing your data easier and more convenient.

## Pages

The `pages` helper method maps to an Array containing all page objects. 
Use mustache syntax to iterate over the array:

{{#raw_code}}
  <ul>
  {{# pages }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ pages }}
  </ul>
{{/raw_code}}


### is\_active\_page


Ruhoh injects a special attribute named `is_active_page` and sets it to `true` for the currently active page.
This allows you to easily highlight the current active page in a navigation menu:

{{#raw_code}}
  <ul>
{{# pages }}
  {{# is_active_page }}
    <li class="active"><a href="{{ url }}" class="active">{{ title }}</a></li>
  {{/ is_active_page }}
  {{^ is_active_page }}
    <li><a href="{{ url }}">{{ title }}</a></li>
  {{/ is_active_page }}
{{/ pages }}
  </ul>
{{/raw_code}}


## Posts

The `posts` helper method maps to an Array containing all posts objects in reverse chronological order.
Use mustache syntax to iterate over the array:

{{#raw_code}}
  <ul>
  {{# posts }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ posts }}
  </ul>
{{/raw_code}}


## Posts_latest

The `posts_latest` helper method is the same as `posts` but is limited to the latest _n_ posts as configured
by your blog. See the [Configuration documentation](/usage/configure) for steps on configuring the posts\_latest limit.

Use mustache syntax to iterate over the array:

{{#raw_code}}
  <ul>
  {{# posts_latest }}
    <li>
      <a href="{{url}}">{{title}}</a>
      {{{ content }}}
    </li>
  {{/ posts_latest }}
  </ul>
{{/raw_code}}


## Summary

The `summary` helper method displays a summary of your post rendered by processing the first _n_ lines of the given post.
See the [Configuration Documentation](/usage/configure) for steps on configuring a custom line-count for summary.

Summary may be used within any block of iterated posts:

{{#raw_code}}
  <ul>
  {{# posts_latest }}
    <li>
      <a href="{{url}}">{{title}}</a>
      {{{ summary }}}
    </li>
  {{/ posts_latest }}
  </ul>
{{/raw_code}}

Summary may also be used for the _current_ page object:

{{#raw_code}}
<h2><a href="{{url}}">{{title}}</a></h2>

{{{ summary }}}
{{/raw_code}}


### How it Works

Summary is optimized for markdown files where content is structured largely into 
contextual blocks and separated by blank lines. (This is also usually true for well-written HTML)

Internally, ruhoh does not count blank lines against the "line count".
Once the line count is reached ruhoh will only break on the "next blank line".
This (theoretically) ensures that the summary outputs only whole blocks of content.

[View Code](https://github.com/ruhoh/ruhoh.rb/blob/0.4.0/lib/ruhoh/templaters/base_helpers.rb#L17) for details.




## Categories

The `categories` helper method maps to an Array containing all category objects. 
Use mustache syntax to iterate over the array:

{{#raw_code}}
<ul class="tag_box inline">
{{# categories }}
  <li>
    <a href="{{ url }}">{{ name }} <span>{{ count }}</span></a>
  </li>
{{/ categories }}
</ul>
{{/raw_code}}


## Tags

The `tags` helper method maps to an Array containing all tag objects. 
Use mustache syntax to iterate over the array:

{{#raw_code}}
<ul class="tag_box inline">
{{# tags }}
  <li>
    <a href="{{ url }}">{{ name }} <span>{{ count }}</span></a>
  </li>
{{/ tags }}
</ul>
{{/raw_code}}


# Contextual Helpers

Ruhoh extends Mustache to include context-aware helper methods.
Contextual helper methods always start with a question mark: `?helper_method`

Contextual helpers act on a given context (a data-structure), usually transforming it into
a new data-structure then passing it back to the block context as if that data was was passed in directly.

This strategy allows us to pass around **ids** of objects rather than the objects themselves.
Now whenever we need an object, we use the helpers to _expand_ those ids into their full objects.
Let's take a look at some common usage examples:

## ?to_pages

This helper method takes in a single String page id or Array of page ids and expands them to their corresponding Page Objects.

### List a user-specified list of pages.

Assume we define a navigation array in `site.yml`:

    navigation:
      - index.md
      - about.md
      - projects/startup.html
      - contact.md

We can can expand these page ids:

{{#raw_code}}
  <ul>
  {{# site.navigation?to_pages }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ site.navigation?to_pages }}
  </ul>
{{/raw_code}}



## ?to_posts

This helper method takes in a single String post id or Array of post ids and expands them to their corresponding Post Objects.

### List posts from a given category

{{#raw_code}}
  <ul>
  {{# db.posts.categories.ruby.posts?to_posts }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ db.posts.categories.ruby.posts?to_posts }}
  </ul>
{{/raw_code}}


## ?next

This helper method takes in a single String post id or Post Object and returns the "next" post object
where next is the _newer_ post in the list of reverse chronologically ordered posts.
Nothing is returned if there is no newer post.

### Finding Next Using a Post Object

Assuming the current `page` object is a post:

{{#raw_code}}
{{# page?next }}
  Newer: <a href="{{ url }}">{{ title }}</a></li>
{{/ page?next }}
{{/raw_code}}


### Finding Next Using a Post id

    # site.yml
    ---
    featured_post : '_posts/2020-10-25-greatest-post-ever.md'
    

Use the id to find the next post:

{{#raw_code}}
{{# site.featured_post?next }}
  Newer: <a href="{{ url }}">{{ title }}</a></li>
{{/ site.featured_post?next }}
{{/raw_code}}


## ?previous

This helper method takes in a single String post id or Post Object and returns the "previous" post object
where previous is the _older_ post in the list of reverse chronologically ordered posts.
Nothing is returned if there is no older post. 

Use this helper exactly as you would the `?next` helper, just replace it with `?previous` =D

## ?to_categories

This helper method takes in a single String category name or Array of category names and expands them to their corresponding Category Objects.

### List categories on a given post.

Assuming the current `page` object is a post:

{{#raw_code}}
  <ul>
  {{# page.categories?to_categories }}
    <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
  {{/ page.categories?to_categories }}
  </ul>
{{/raw_code}}


### List categories on a collection of posts.

{{#raw_code}}
  {{# posts }}
    <h3>{{title}}</h3>
    <h4>Tags</h4>
    <ul>
    {{# categories?to_categories }}
      <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
    {{/ categories?to_categories }}
    </ul>
  {{/ posts }}
{{/raw_code}}


## ?to_tags

This helper method takes in a single String tag name or Array of tag names and expands them to their corresponding Tag Objects.

### List tags on a given post.

Assuming the current `page` object is a post:

{{#raw_code}}
  <ul>
  {{# page.tags?to_tags }}
    <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
  {{/ page.tags?to_tags }}
  </ul>
{{/raw_code}}


### List tags on a collection of posts.

{{#raw_code}}
  {{# posts }}
    <h3>{{title}}</h3>
    <h4>Tags</h4>
    <ul>
    {{# tags?to_tags }}
      <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
    {{/ tags?to_tags }}
    </ul>
  {{/ posts }}
{{/raw_code}}



# Partials

Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included
into any page or layout.

Partials are very useful when used in conjunction with the templating language as they can provide 
standardized layouts for data-structures used throughout your blog.

## Using Partials

Mustache supports partials natively using the "greater than" character:

{{#raw_code}}
  {{> categories_list }}
{{/raw_code}}


## Create a Partial

Create a *default_partial* by creating a file in the default partials folder at: 

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>[...your-partial-file...]</em> &larr;</li>
    </ul>
  </li>
</ul>
    
These partials should be theme independent.

Additionally you may also create *theme_specific* partials by creating files at:

<ul class="folder-tree">
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>themes</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>[ACTIVE-THEME]</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>[...your-partial-file...]</em> &larr;</li>
            </ul>
          </li>
        </ul> 
      </li>
    </ul>
  </li>
</ul>

Theme specific partials are useful when you want to include theme dependent HTML and/or css classes.

## Overload a Partial

Theme specific partials have a higher priority than default partials. That is they will overload default partials of the same name.
