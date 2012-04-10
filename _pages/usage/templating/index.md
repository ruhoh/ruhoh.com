---
title:
description:

layout: docs
icon : icon-list-alt
---



# Mustache Overview

Ruhoh uses [Mustache](http://mustache.github.com/) as its primary Templating system.
If you are unfamiliar with Mustache's philosophy and syntax you can get up to speed in about 10 minutes by going through the 
[README Examples](https://github.com/defunkt/mustache#readme)

Mustache takes in three main parameters when expanding a template:

<dl class="dl-horizontal">
  <dt>Template</dt>
  <dd>This is just a string of content. In Ruhoh this will be the layout content plus the injected page content.</dd>
  
  <dt>View</dt>
  <dd>This is a ruby class which defines helper methods that can be used in the layout.</dd>
  
  <dt>Payload</dt>
  <dd>This is a Hash of your blog's data objects which are accessible in the Mustache Template.</dd>
</dl>

All pages in Ruhoh are expanded using one single, global Mustache View (ruby class).
This class defines helper methods useful for displaying your blog's data efficiently.

# Template Data

Your posts and pages exist as "data objects" in the Ruhoh system, which in turn have
other data objects associated with them, namely a URL, categories, tags, and so on.

These data objects are passed into the Templating system along with your layouts and partials
which all come together to render the final page views.

## Payload

This following hash outlines the **top-level endpoints** accessible within the Templating System.
The unabridged version is comprehensively documented in the API section.

    {
      "page"    => {},
      "site"    => {},
      "pages"   => {},
      "_posts"  => {
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
      },
      "THEME_PATH" => "/_templates/themes/some-theme/",
      "paths.syntax" => "/_templates/syntax/",
      "paths.media" => "/_media/"
    }
    
Next we'll document how to use this data throughout your pages using the Templating system.


# Mustache Helpers

Ruhoh extends Mustache to include context-aware helper methods.
Helper methods act on a given context (a data-structure), usually transforming it into
a new data-structure then passing it back to the block context as if that data was was passed in directly.

This strategy allows us to pass around **ids** of objects rather than the objects themselves.
Now whenever we need an object, we use the helpers to _expand_ those ids into their full objects.
Let's take a look at some common usage examples:


## ?to_posts

This helper method takes in a single or Array of post ids and expands them to their corresponding Post Objects.

### List site-wide posts

{{#raw_code}}
  <ul>
  {{# _posts?to_posts }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ _posts?to_posts }}
  </ul>
{{/raw_code}}


### List posts from a given category

{{#raw_code}}
  <ul>
  {{# _posts.categories.ruby.posts?to_posts }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ _posts.categories.ruby.posts?to_posts }}
  </ul>
{{/raw_code}}

## ?to_pages

This helper method takes in a single or Array of page ids and expands them to their corresponding Page Objects.

### List site-wide pages.

{{#raw_code}}
  <ul>
  {{# pages?to_pages }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ pages?to_pages }}
  </ul>
{{/raw_code}}

### List a user-specified list of pages.

Assume we define a navigation array in `_site.yml`:

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


## ?to_categories

This helper method takes in a single or Array of category names and expands them to their corresponding Category Objects.

### List site-wide categories.

{{#raw_code}}
  <ul>
  {{# _posts.categories?to_categories }}
    <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
  {{/ _posts.categories?to_categories }}
  </ul>
{{/raw_code}}

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
  {{# posts?to_posts }}
    <h3>{{title}}</h3>
    <h4>Tags</h4>
    <ul>
    {{# categories?to_categories }}
      <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
    {{/ categories?to_categories }}
    </ul>
  {{/ posts?to_posts }}
{{/raw_code}}


## ?to_tags

This helper method takes in a single or Array of tag names and expands them to their corresponding Tag Objects.

### List site-wide tags.

{{#raw_code}}
  <ul>
  {{# _posts.tags?to_tags }}
    <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
  {{/ _posts.tags?to_tags }}
  </ul>
{{/raw_code}}

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
  {{# posts?to_posts }}
    <h3>{{title}}</h3>
    <h4>Tags</h4>
    <ul>
    {{# tags?to_tags }}
      <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
    {{/ tags?to_tags }}
    </ul>
  {{/ posts?to_posts }}
{{/raw_code}}



# Partials

Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included
into any page or layout.

Partials are very useful when used in conjuction with the templating language as they can provide 
standardized layouts for data-structures used throughout your blog.

A good example would be defining a partial for an HTML list which you'd use to render a post's tags or categories.

## Create a Partial

Create a _default\_partial_ by creating a file in the default partials folder at: 

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_templates</em><br>
    <ul class="template">
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template">partials</em><br>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">[...your-partial-file...]</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
    
These partials should be theme independent.

Additionally you may also create _theme\_specific_ partials by creating files at:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_templates</em><br>
    <ul class="template">
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>themes</em><br>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>[ACTIVE-THEME]</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template">partials</em><br>
                <ul>
                  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">[...your-partial-file...]</em> &larr;</li>
                </ul>
              </li>
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

