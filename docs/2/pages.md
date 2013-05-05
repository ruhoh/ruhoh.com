---
title:
description:

icon : icon-pencil
---
# What is a Page?

A **Page** in ruhoh is the base resource type for delivering content at a given URL. Usually this content is a literal file and by default the URL is just the 'clean' path to the file as it exists in your directory.

All page-like resources can have a layout, sub-layout, custom permalink, categories, tags and other
features that make a page act like a page.

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

All the pages you create are available as a **pages collection** in your View. The pages collection is modeled by its CollectionView class and contains methods and logic that act on that collection.

In your templates it looks like this:

{{#raw_code}}
{{ pages.some_method }}
{{/raw_code}}

You can see that the methods are namespaced by the given collection. If you create posts you would access the posts collection like this:

{{#raw_code}}
{{ posts.some_method }}
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


## pages.latest

The `pages.latest` helper method is the same as `pages.all` but is limited to the latest _n_ pages as configured

Use mustache syntax to iterate over the array:

{{#raw_code}}
<ul>
{{# pages.latest }}
  <li>
    <a href="{{url}}">{{title}}</a>
    {{{ content }}}
  </li>
{{/ pages.latest }}
</ul>
{{/raw_code}}


## pages.paginator

The paginator method intelligently renders chunks of pages per a given page.
It knows which page it is on so there is no need to pass a specific page number.

To initiate the "root" page (page #1) use `pages.paginator`:


{{#raw_code}}
<h2>Paginated Pages</h2>

{{# pages.paginator }}
<div class="page">
  <h3 class="title"><a href="{{url}}">{{title}}</a> <span class="date">{{ date }}</span></h3>

  {{{ summary }}}

  <div class="more">
    <a href="{{url}}" class="btn">read more..</a>
  </div>
</div>
{{/ pages.paginator }}
{{/raw_code}}


## pages.paginator_navigation

Use `pages.paginator_navigation` to display the page navigation links:

{{#raw_code}}
<ul>
{{#pages.paginator_navigation}}
  <li>
    {{^is_active_page}}
      <a href="{{url}}">{{name}}</a>
    {{/is_active_page}}
    
    {{#is_active_page}}
      <a href="{{url}}" style="color:red">{{name}}</a>
    {{/is_active_page}}
  </li>
{{/pages.paginator_navigation}}
</ul>
{{/raw_code}}


The links link to special pagination pages which use (by default) the `paginator.html` layout,
which just calls `pages.paginator` again but it internally knows which pagination chunk to show.

See the paginator configuration docs below for more details.



# Model View

Each and every page you create is modeled in the View by a ModelView class for that given page-like resource.

The collections should always return ModelView class instances if they are available:

{{#raw_code}}
  <ul>
  {{# pages.all }}
    <li><a href="{{url}}">{{title}}</a></li>
    <!-- 
      The methods called here are called on an instance of a page ModelView object.
    -->
    {{ date }}
    {{ some_custom_method }}
    ...
  {{/ pages.all }}
  </ul>
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

Summary may be used within any block of iterated pages:

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


## page.is\_active\_page

Returns Boolean true/false for whether or not the page is the currently displayed page or "active page".

This is useful for adding styling to denote the active element in a navigation list:


{{#raw_code}}
  <ul>
{{# pages.all }}
  {{# is_active_page }}
    <li class="active"><a href="{{ url }}" class="active">{{ title }}</a></li>
  {{/ is_active_page }}
  {{^ is_active_page }}
    <li><a href="{{ url }}">{{ title }}</a></li>
  {{/ is_active_page }}
{{/ pages.all }}
  </ul>
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

### Default Permalinks

By default all normal pages URLs will simply model their respective physical filepaths:

**FILE: pages/personal/about-me.md** =&gt; **URL: /pages/personal/about-me**

URLs are "pretty" by default; they omit the file extension e.g.: 

**/some-page** vs **/some-page.html** or **/some-page/index.html**.

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


### Custom Permalinks

Pages may also define a custom permalink format:

    # config.yml
    
    pages :
      permalink : '/pages/:title'

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
      <td>Year from the page’s filename</td>
    </tr>
    
    <tr>
      <td>:month</td>
      <td>Month from the page’s filename</td>
    </tr>
    
    <tr>
      <td>:day</td>
      <td>Day from the page’s filename</td>
    </tr>
    
    <tr>
      <td>:title</td>
      <td>Title from the page’s filename</td>
    </tr>

    <tr>
      <td>:path</td>
      <td>The page file's path relative to the base of your website.</td>
    </tr>

    <tr>
      <td>:relative_path</td>
      <td>The page file's path relative to its name-spaced directory.</td>
    </tr>

    <tr>
      <td>:filename</td>
      <td>The page file's filename (path is not included).</td>
    </tr>
    
    <tr>
      <td>:categories</td>
      <td>The specified categories for this page. If more than one category is set, only the first one is used. If no categories exist, the URL omits this parameter.</td>
    </tr>
    
    <tr>
      <td>:i_month</td>
      <td>Month from the page’s filename without leading zeros.</td>
    </tr>
    
    <tr>
      <td>:i_day</td>
      <td>Day from the page’s filename without leading zeros.</td>
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

### Per-Page Permalinks

Set a custom permalink format on a _per-page_ basis via the pages's YAML meta-data:

    # pages/my-cool-page.md
    ---
    title: My Cool Page
    permalink: '/blog/:month/:year:/:title'
    ---

### Literal Per-Page Permalinks

Set a **literal** permalink by omitting variable tokens:

    # pages/my-cool-post.md
    ---
    title: My Cool Page
    permalink: 'legacy-blog/123/RandomFolder/category/my_cool_page'
    ---

Literal permalinks are useful when importing legacy blog pages/posts from other blogging systems, since you'd want to preserve existing links.

### NOTES

Each node of a literal permalink is still passed through `CGI::escape()` to properly build a valid URL.
Please let me know if this causes any problems, or does not fit your use-case.




## Layout

All pages have a global default layout value that will be used when the layout parameter  is _not_ specifically set in the page file's YAML meta-data. The _default_ "default global layout value" for pages is set to: `page`.

Manually set a custom default layout in the config:
  
    pages :
      layout : 'custom-page-layout'
      
Remember this is just a default. It allows you to not always have to specify a layout param in every page file. However layout values in page files always take precedence.


## Summary

The summary is rendered using a "line count" parameter that will intelligently process the first n lines of your page.  A custom summary line-count may be specified in the config file:

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


## Latest

`pages.latest` displays the latest _n_ pages. Set a custom limit in the config file:

    pages :
      latest : 5   # default is 10



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




