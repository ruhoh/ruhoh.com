---
title:
description:

layout: two-docs
icon : icon-pencil
---

A **Page** in ruhoh is the base resource type for exposing content at a URL endpoint and having
functionality like layouts, sub-layouts, custom permalink, categories, tags, etc.

In other words, we can make any resource **page-like** by inheriting from the base `Pages` resource.
In this way, all "posts" are "page-like" -- they inherit from this page resource and share the same functionality.

# Create

## Create Page

Page stubs can be created using the Ruhoh command-line client:

    $ ruhoh pages new about

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>about.md</em> &larr;</li>
    </ul>
  </li>
</ul>
    
Create a page within a subdirectory:

    $ ruhoh pages new projects/android

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em>
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>projects</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>android.md</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>


Ruhoh will generate a file with content similar to:

    ---
    title:
    date: '2012-12-12'
    description:
    ---


### Top YAML Metadata

Note this metadata is known as **Top YAML Metadata** or YAML Front-Matter if you like that better (I don't =p)

The YAML metadata is parsed as YAML so it **must be valid YAML**.

## Categories

### Add Categories

Add one or more categories to a resource by including them into the resource's YAML meta-data.
This is the YAML block is at the top of the file:

    ---
    title: a nice title
    categories: code
    ---
   
A category can be multiple levels deep:

    categories: "code/android/games"
    
This defines **one** category named `code/android/games`.

Also note that `code`, and `code/android` **will not exist** unless you explicitly define them as categories themselves.


To place the resource in multiple categories you'll need to pass in an Array:

    ---
    title: a nice title
    categories: ['code/android/games', 'game-downloads']
    ---

or

    ---
    title: a nice title
    categories :
      - 'code/android/games'
      - 'game-downloads'
    ---


## Tags

### Add Tags

Add one or more tags to a resource by including them into the resource's YAML meta-data.
This is the YAML block at the top of the file:

    ---
    title: a nice title
    tags: javascript
    ---
    
To add multiple tags, use an Array:

    ---
    title: a nice title
    tags: [javascript, tutorials, expert]
    ---

or

    ---
    title: a nice title
    tags: 
      - javascript
      - tutorials
      - expert
    ---











# Collection View

The CollectionView class contains methods and logic that act on a resource's collection.
The CollectionView is exposed to the mustache templating system via its resource namespace:

{{#raw_code}}
{{ pages.some_method }}
{{/raw_code}}



## pages.all

`pages.all` maps to an Array containing all pages each modeled as a Page::ModelView object.
Use mustache syntax to iterate over the array:

{{#raw_code}}
  <ul>
  {{# pages.all }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ pages.all }}
  </ul>
{{/raw_code}}


## pages.categories

`pages.categories` is a namespace for accessing categories defined on the given resource type.

### pages.categories.all

To return a list of all categories for all pages use `pages.categories.all`

{{#raw_code}}
<ul class="tag_box inline">
{{# pages.categories.all }}
  <li>
    Category: <a href="{{ url }}">{{ name }} <span>{{ count }}</span></a>
    <h4>Pages</h4>
    <ul>
    {{# pages?to_pages }}
      <li><a href="{{ url }}">{{ title }}</a></li>
    {{/ pages?to_pages }}
    </ul>
  </li>
{{/ pages.categories.all }}
</ul>
{{/raw_code}}


### pages.categories.my-category-name

To return a specific category, just call that category by name: `pages.categories.my-category-name`

{{#raw_code}}
<ul class="tag_box inline">
{{# pages.categories.my-category-name }}
  <li>
    Category: <a href="{{ url }}">{{ name }} <span>{{ count }}</span></a>
    <h4>Pages</h4>
    <ul>
    {{# pages?to_pages }}
      <li><a href="{{ url }}">{{ title }}</a></li>
    {{/ pages?to_pages }}
    </ul>
  </li>
{{/ pages.categories.my-category-name }}
</ul>
{{/raw_code}}


## pages.tags

`pages.tags` is a namespace for accessing tags defined on the given resource type.

### pages.tags.all

To return a list of all tags for all pages use `pages.tags.all`

{{#raw_code}}
<ul class="tag_box inline">
{{# pages.tags.all }}
  <li>
    Tag: <a href="{{ url }}">{{ name }} <span>{{ count }}</span></a>
    <h4>Pages</h4>
    <ul>
    {{# pages?to_pages }}
      <li><a href="{{ url }}">{{ title }}</a></li>
    {{/ pages?to_pages }}
    </ul>
  </li>
{{/ pages.tags.all }}
</ul>
{{/raw_code}}


### pages.tags.my-tag-name

To return a specific tag, just call that tag by name: `pages.tags.my-tag-name`

{{#raw_code}}
<ul class="tag_box inline">
{{# pages.tags.my-tag-name }}
  <li>
    Tag: <a href="{{ url }}">{{ name }} <span>{{ count }}</span></a>
    <h4>Pages</h4>
    <ul>
    {{# pages?to_pages }}
      <li><a href="{{ url }}">{{ title }}</a></li>
    {{/ pages?to_pages }}
    </ul>
  </li>
{{/ pages.tags.my-tag-name }}
</ul>
{{/raw_code}}


# Model View

The ModelView class contains methods and logic that act on a single resource instance.
If a ModelView is defined, the CollectionView should return a collection of ModelView instances.

A ModelView is also exposed to the view as the global `page` object if and when the resource being rendered
has a ModelView. In other words if ruhoh is displaying a `post` the post in question is available at `page`
where `page` is a proxy to a ..Posts::ModelView instance.

{{#raw_code}}
{{ page.some_method_in_post_model_view }}
{{/raw_code}}


## Metadata

The Model View holds a page's basic attributes as follows:

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


### Top YAML Metadata

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


## page.content

`page.content` provides the pages content body with all templating logic parsed and the markup/markdown language converted.

Note the triple mustaches since we expect HTML to be output and do not want to escape characters.

{{#raw_code}}
{{{page.content}}}
{{/raw_code}}


## page.summary

The `summary` helper method displays a summary of your page rendered by processing the first _n_ lines of the given page.

Summary may be used within any block of iterated posts:

{{#raw_code}}
  <ul>
  {{# pages.all }}
    <li>
      <a href="{{url}}">{{title}}</a>
      {{{ summary }}}
    </li>
  {{/ pages.all }}
  </ul>
{{/raw_code}}

Summary may also be used for the _current_ page object:

{{#raw_code}}
<h2><a href="{{url}}">{{title}}</a></h2>

{{{ page.summary }}}
{{/raw_code}}


### How it Works

Summary is optimized for markdown files where content is structured largely into 
contextual blocks and separated by blank lines. (This is also usually true for well-written HTML)

Internally, ruhoh does not count blank lines against the "line count".
Once the line count is reached ruhoh will only break on the "next blank line".
This (theoretically) ensures that the summary outputs only whole blocks of content.

[View Code](https://github.com/ruhoh/ruhoh.rb/blob/0.4.0/lib/ruhoh/templaters/base_helpers.rb#L17) for details.


## page.categories

Returns all the categories defined on the given page. Categories are represented as objects in the form:

    {
      "name" => "category name", 
      "count" => 12, 
      "url" => '/categories#category-name'
    }

### List categories on the current page.

{{#raw_code}}
  <ul>
  {{# page.categories }}
    <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
  {{/ page.categories }}
  </ul>
{{/raw_code}}


### List categories on a collection of pages.

{{#raw_code}}
  {{# pages.all }}
    <h3>{{title}}</h3>
    <h4>Categories</h4>
    <ul>
    {{# categories }}
      <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
    {{/ categories }}
    </ul>
  {{/ pages.all }}
{{/raw_code}}


## page.tags

Returns all the tags defined on the given page. Tags are represented as objects in the form:

    {
      "name" => "tag name",
      "count" => 12,
      "url" => '/tags#tag-name'
    }


### List tags on the current page.

{{#raw_code}}
  <ul>
  {{# page.tags }}
    <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
  {{/ page.tags }}
  </ul>
{{/raw_code}}


### List tags on a collection of pages.

{{#raw_code}}
  {{# pages.all }}
    <h3>{{title}}</h3>
    <h4>Tags</h4>
    <ul>
    {{# tags }}
      <li><a href="{{url}}">{{name}} <span>{{count}}</span></a></li>
    {{/ tags }}
    </ul>
  {{/ pages.all }}
{{/raw_code}}



## page.next

Returns the next or _newer_ page in the list of all possible page resources.
Nothing is returned if there is no newer page.

{{#raw_code}}
{{# page.next }}
  Newer: <a href="{{ url }}">{{ title }}</a></li>
{{/ page.next }}
{{/raw_code}}


## page.previous

Returns the previous or _older_ page in the list of all possible page resources.
Nothing is returned if there is no previous page.

{{#raw_code}}
{{# page.previous }}
  Older: <a href="{{ url }}">{{ title }}</a></li>
{{/ page.previous }}
{{/raw_code}}









# Configure

## File Extension

By default, Ruhoh uses the `.md` markdown extension.
You can change the default extension for any resource via the config.yml file:

    #config.yml
    posts:
      permalink: "/:categories/:title/"
      ext: ".html" # <-- set custom default (always include leading period)

    pages:
      summary_lines: 1
      ext: ".txt" # <-- set custom default (always include leading period)

Now generating pages produces:

    $ ruhoh pages new projects/android
    
      
<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em>
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>projects</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>android.txt</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

## Scaffold

The generation tasks outlined above clone a resource-specific "scaffold" file.

The scaffold file for "posts" looks like this:

{{#raw_code}}
&#045;&#045;&#045;
title:
date: '{{DATE}}'
description:
&#045;&#045;&#045;
{{/raw_code}}

"scaffolds" is actually just another resource so you can overload the system level scaffold like so:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>scaffolds</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>post.html</em> &larr;</li>
    </ul>
  </li>
</ul>

Specify any customizations you wish:

{{#raw_code}}
&#045;&#045;&#045;
title:
date: '{{DATE}}'
description:
categories: ["default", "categories"]
&#045;&#045;&#045;
<h1>For some reason I think all posts should have this header.</h1>
{{/raw_code}}


## Permalink

Currently all page permalinks simply model their respective physical filepaths.

URLS are "pretty" by default; they omit the file extension e.g.: `/some-page` vs `/some-page.html` or `/some-page/index.html`.

To preserve the "normal" style you can configure it in config.yml:

### Preserve old-school paths for all pages:

    pages:
      permalink: 'preserve'
      
### Preserve the old-school paths on a per page basis:

    # pages/some-page.md
    ---
    title: some-page
    descripton: you bet
    permalink: 'preserve' # <-----------
    ---  

## Layout

All pages have a global default layout value that will be used when the layout parameter 
is _not_ specifically set in the page file's YAML meta-data. The _default_ "default global layout value" for pages is set to: `page`.

Manually set a custom default layout in the config:
  
    pages :
      layout : 'custom-page-layout'
      
Remember this is just a default. It allows you to not always have to specify a layout param in every page file.
However layout values in page files always take precedence.


## Summary

The summary is rendered using a "line count" parameter that will intelligently process the first n lines of your page. 
A custom summary line-count may be specified in the config file:

    pages :
      summary_lines : 30   # default is 20


## Exclude

To exclude page files from the being processed by ruhoh, pass a String representation of a regular expression to the `exclude` parameter:

    pages:
      exclude: '~$'

Optionally pass multiple values via Array:

    pages:
      exclude: ['~$', '^rotten-pages\/']

Strings get converted to a regular  expression using: `Regexp.new(str)` so encapsulating forward slashes are not needed.
Remember to also escape necessary special characters.




