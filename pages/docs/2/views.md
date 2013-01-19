---
title:
description:

icon : icon-list-alt
---

# Why Mustache

Ruhoh uses [Mustache](http://mustache.github.com/) as its primary Templating system. 

In Mustache you _cannot_ embed code logic in your views.
This is the opposite of erb, haml, or any such system that dynamically processes embedded-code in views.

With views free of code-logic, the API footprint becomes manageable and most importantly, portable:

- Content becomes portable across a minimal API.
- Themes become portable across a minimal API.
- Plugins/widgets become portable across a minimal API.

Ruhoh uses mustache because ruhoh is a publishing system.
As such, portability and "purity of content" are primary goals.
Ruhoh is not a replacement for robust frameworks like sinatra or rails, 
so support for embedded-code templating engines is extremely unlikely.

# Learn Mustache

Get up to speed with Mustache's philosophy and syntax in about 10 minutes by going through the 
[README Examples](https://github.com/defunkt/mustache#readme)

Mustache takes in three main parameters when expanding a template:

<dl class="dl-horizontal">
  <dt>Template</dt>
  <dd>[String] This is your HTML-based layout. In Ruhoh this will be the current page body as rendered in its given layout(s).</dd>
  
  <dt>View</dt>
  <dd>[Class] The View is a ruby class which defines helper methods that can be used in the layout.</dd>
  
  <dt>Payload</dt>
  <dd>[Hash] This is an arbitrary data object which becomes accessible in the Mustache Template. 
    <br>In Ruhoh 2.0. every data-structure is dynamically loaded from ruhoh's database so the payload hash is no longer used.</dd>
</dl>


# Rendering Views

The following is a quick breakdown of what happens when a page-like resource is rendered via its URL.

1. A Mustache MasterView is instantiated and is given the page-like resource to model.
1. The page-like resource defines its layout dependencies.
1. The MasterView expands the page's layout(s) and parses the content (markdown etc).
1. Within the mustache templates, the page-like resource is available at `page` (`@master_view.page` in ruby).
1. All other resources are available at `@master_view.<resources_name>` where resources_name is the pluralized name of the resource.
1. The MasterView fully renders the result to either the web-server interface (rack) or saves it to disk (compile).


## Templating by Example


**1. post: 'cool-post.md'**
   
{{#raw_code}}
&#045;&#045;&#045;
date: '2012-09-13'
tags : "chair"
&#045;&#045;&#045;

A cool post about stuff.

- Formatted
- in
- markdown
{{/raw_code}}


The post, having no layout defined, will implicitly load into the 'post.html' sub-layout.


**2. sub-layout: 'post.html'**

{{#raw_code}}
&#045;&#045;&#045;
layout : 'default'
&#045;&#045;&#045;

<h1 class="post-header">{{ page.title }}</h1>
<div class="post-content">
  {{{ page.content }}}
</div>
<h4>Tags</h4>
<ul class="post-tags">
{{# page.tags }}
  {{> tags_list }}
{{/ page.tags }}
</ul>
{{/raw_code}}


The `page` method represents the 'current' page being rendered, which in this case is a "posts" resource pointing to the file: `cool-post.md`.

`page` acts as a proxy to the resource's ModelView which conveniently exposes the method `content` among other things.
To render the non-escaped content, note we use mustache's triple brackets syntax and call: `page.content` 

 
**3. layout: 'default.html'**

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    {{{ stylesheets.all }}} 
    {{{ javascripts.all }}} 
  </head>
  <body>
      <div class="content">
        {{{ content }}}
      </div>
  </body>
</html>
{{/raw_code}}


Finally in the base layout, we call `content` which is different from `page.content` in that it represents the "total" page's content up until this point.
In this case it would be the page.content fully rendered inside the sub-layout. 

Note we can still freely access `page` as well as our other resources (stylesheets, javascripts, etc).
This is because ruhoh only ever uses one MasterView so the context is always shared across the files.

You can see on a general level, each file just nests itself into its parent and all works as expected with a global context preserved.


## Mustache by Example

Mustache allows for a very clean API within your templates. 
To access any resource collection, you simply call its name; every registered resource dynamically adds its method to the MasterView. 
This method acts as a namespace and proxies to the resource's CollectionView Class which contains the callable methods.


      class Masterview
        def posts
        end
        
        def pages
        end
        
        def stylesheets
        end
      end


A sample CollectionView for the "posts" resource collection:

    module Ruhoh::Resources::Posts
      class CollectionView < Ruhoh::Resources::Page::CollectionView

        def all
          posts = @ruhoh.db.posts.each_value.map { |val| val }
          if @ruhoh.env == "production"
            posts = posts.reject {|p| p["type"] == "draft"}
          end  
          posts.sort {|a,b| 
            Date.parse(b['date']) <=> Date.parse(a['date'])
          }.map {|data|
            new_model_view(data)
          }
        end
        
      end
    end
    

In your mustache template, the `all` method of the posts `CollectionView` is available like so:

{{#raw_code}}
  <ul>
  {{# posts.all }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ posts.all }}
  </ul>
{{/raw_code}}


Note also the nested methods `url` and `title`. 
You can see `posts.all` returns an Array of Posts::ModelView instances of which we can also call methods on.

## Extend by Example

While we are at it, here's how you'd extend the CollectionView to add arbitrary custom functionality:

    module PostsCollectionViewAddons
      def greeting
        "Hello there! How are you?"
      end
      
      def random
        all.sample
      end
    end
    Ruhoh::Resources::Posts::CollectionView.send(:include, PostsCollectionViewAddons)
    
Now you can do:

{{#raw_code}}
<h1>{{posts.greeting}}</h1>
{{#posts.random}}
  <h2>{{title}}</h2>
{{/posts.random}}
{{/raw_code}}


# Master View API

Below are the global mustache methods available in the MasterView
 
## page

As we've covered, `page` is used as a proxy to a ModelView instance for the **current page**.

Attributes and methods available to `page` are determined by the ModelView instance, just have a look at the resource's ModelView docs for
available attributes and methods. Here are the base attributes for all page-like object:

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


## content 

`content` is the global mustache method that renders the page's **fully rendered** content.
This includes any sub-layouts the page may be in as well as conversion of the markup language, e.g. markdown.

### Example Usage

**layout: 'default.html'**

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    {{{ stylesheets.all }}} 
    {{{ javascripts.all }}} 
  </head>
  <body>
      <div class="content">
        {{{ content }}}
      </div>
  </body>
</html>
{{/raw_code}}


## urls

These urls are exposed for convenience in case you want to manually link to assets.
However, ruhoh should do a good job of internally resolving all links so you don't need to manually define links in your content.

**CAUTION:** I will probably change this API again and move them into the resource classes like everything else.

<table class="table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>urls.base_path</td>
      <td>The configured base_path.</td>
    </tr>
    <tr>
      <td>urls.stylesheets</td>
      <td>The URL path to the currently enabled theme stylesheets folder.</td>
    </tr>
    <tr>
      <td>urls.javascripts</td>
      <td>The URL path to the currently enabled theme javascripts folder.</td>
    </tr>
    <tr>
      <td>urls.theme</td>
      <td>The URL path to the currently enabled theme media folder.</td>
    </tr>
    <tr>
      <td>urls.media</td>
      <td>The URL path to the global media folder.</td>
    </tr>
    <tr>
      <td>urls.paginator</td>
      <td>The url endpoint that the paginator uses to make pages.</td>
    </tr>
    
  </tbody>
</table>

### Example Usage

{{#raw_code}}
<head>
  <link href="{{ urls.stylesheets }}/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="{{ urls.stylesheets }}/css/style.css?body=adsf" media="all">
</head>
...
<img src="{{urls.media}}/images/happy-face.jpg">
{{/raw_code}}


## Contextual Helpers

Ruhoh extends Mustache to include context-aware helper methods.
Contextual helper methods always start with a question mark: `?helper_method`

Contextual helpers act on a given context (a data-structure), usually transforming it into
a new data-structure then passing it back to the block context as if that data was was passed in directly.

This strategy allows us to pass around **ids** of objects rather than the objects themselves.
Now whenever we need an object, we use the helpers to _expand_ those ids into their full objects.
Let's take a look at some common usage examples:

### ?to\_resources\_name

This helper method takes in a single String page id or Array of page ids and expands them to their corresponding Page Objects.

### List a user-specified list of pages.

Assume we define a navigation array in `data.yml`:

    navigation:
      - index.md
      - about.md
      - projects/startup.html
      - contact.md

We can can expand these page ids:

{{#raw_code}}
  <ul>
  {{# data.navigation?to_pages }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ data.navigation?to_pages }}
  </ul>
{{/raw_code}}


# Helpful Resource Views

## media

### Insert Images

The media folder is used as a convenient place to store your blog's media:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">media</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em class="template">[...my-media-file...]</em> &larr;</li>
    </ul>
  </li>
</ul>

Organize your files any way you wish, then use the special `urls.media` template variable to refer the media folder:

{{#raw_code}}
<img src="{{urls.media}}/my-media-file.jpg">
{{/raw_code}}


Using a dynamic url path is helpful when you want to switch to a CDN and or reorganize the way you handle your media.

**NOTE** This is now a non-standard legacy API. Using the media resources should work like all other resources, e.g. `media.url`.
Expect this to change in the future.

## partials

Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included
into any page or layout.

Partials are very useful when used in conjunction with the templating language as they can provide 
standardized layouts for data-structures used throughout your blog.

### Using Partials

Mustache supports partials natively using the "greater than" character:

{{#raw_code}}
  {{> categories_list }}
{{/raw_code}}


### Create a Partial

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

### Overload a Partial

Theme specific partials have a higher priority than default partials. That is they will overload default partials of the same name.


## data

`data` is a globally accessible object that contains all data from your `data.yml` file.
This allows you to define arbitrary data you want access to throughout your templates such as navigational lists.

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em></li>
  <li><span class="ui-silk inline ui-silk-page-white-database">.</span> <em>data.yml</em> &larr;</li>
</ul>

### Example Usage

    # data.yml
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
  <li>Author: {{ data.author.name }}</li>
  <li>email: {{data.author.email }}</li>
  <li>github: {{data.author.github }}</li>
</ul>
{{/raw_code}}


## stylesheets

The stylesheets resources manages all stylesheets in the system.

When a theme registers stylesheets the paths are automatically managed and can be loaded like so:

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    {{{ stylesheets.all }}} 
  </head>
</html>
{{/raw_code}}


## javascripts

The javascripts resource manages all javascripts in the system.

When a theme registers javascripts the paths are automatically managed and can be loaded like so:

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    {{{ javascripts.all }}} 
  </head>
</html>
{{/raw_code}}
