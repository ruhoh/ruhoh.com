---
title: How Ruhoh Works
---

# Introduction

Ruhoh 2.x is a static website generator.

You don't need to write _any_ programming code to run or use ruhoh; all user interactions are abstracted into (ideally) a clean, language-agnostic API.

**In ruhoh the goal is _publishing content_ rather than _programming a website._**

I understand that _many_ people _love_ to program their website, and there are many good projects that allow for that ([MiddleMan](http://middlemanapp.com/)).

However, this is a beautiful challenge to me; the idea that a static website generator might be the best intro to _web-programming principles_. And I'd hate to require managing the spaghetti-mess that results with [ruby ERB](http://ruby-doc.org/stdlib-2.0/libdoc/erb/rdoc/ERB.html).

BTW: You should know that ruhoh's internals are completely programmable through the plugin architecture =P.


## Audience

I don't mean to be snide, rather I just want to set clear expectations. Ruhoh has different _ideals_ which some users couldn't care less about.

Ideally, ruhoh will be so simple that beginner's will prefer to use it to learn more about web-programming principles. But for now...

Ruhoh, like most static website generators is fundamentally _pretty technical_ so you're probably a web-developer who's been jaded by Wordpress for a while now, but don't want to use rails to serve an HTML file.


**You should know...**

Ruhoh is not made to have 83 custom helper methods in the middle of your content body and dynamically build forms using haml that turns into erb that turns into ruby that turns into coffescript that turns into javascript -- **ruhoh is a _publishing_ system, not a web-application.**

I believe ruhoh is a fantastic way to publish text-based content. I want you to feel the _ownership_ of your work when you publish from your own text-editor, on your own computer, using your own command-line.

I want you to experience the happiness of creating.


## Philosophy

Ruhoh aims to be a very _clean_, modern publishing system.

### Separation of Concerns

In ruhoh there are three layers:

1. **Content Layer**  
  Text, data, and media based content; all your great writings and thoughts.
1. **View Layer**  
  The programming logic that processes and connects your content to the presentation layer.
1. **Presentation Layer**  
  The HTML structure, stylesheets, fonts, and Javascripts that present your content.

Ruhoh is the system that defines and coordinates the interaction of these three layers. The implementation of these layers is up to you.

 
### Encapsulation

Ruhoh is _very_ deliberate in encapsulating each layer. It is why mustache is relied upon for the templating language. This will take some getting used to and is a shift in the way we normally think about dynamic views/templates.

# How Ruhoh Works


## Interface

As stated, ruhoh is primarily different in that it enforces a strict separation of concerns, uses a language-agnostic API, and requires no programming.

- Everything is modeled and configurable by the files and directories.
- Configuration is done in a language-agnostic data format like [YAML](http://www.yaml.org/) and [JSON](http://www.json.org/)
- [Mustache](http://mustache.github.io/) templating language is used as the primary programming interface (also language agnostic).

Ruhoh is launched relative to a given directory, let's call it **my-website**. Ruhoh takes this directory of files and compiles them into a website.


## Modes

There are 4 modes in ruhoh. These modes are all embedded into ruhoh and work without extra configuration or installations.

- **Development**  
  Used to run ruhoh locally on your computer. This mode allows you to preview your changes in realtime.
  Note that in ruhoh, development mode is not simply the compiled version, it's an optimized, heavily cached development environment.
- **Production**  
  Used to "compile" your website in order to publish it on a static-asset web-server.
- **Command-line**  
  Used to pragmatically manage your website and its files, for example quickly creating new pages or layouts.
- **Console**  
  Used to inspect and debug your website in greater detail.


## Collections

Every top-level sub-folder in `my-website` defines a *collection*. The root of the directory is reserved for support files and therefore does not serve any files.

Collections hold _resources_ which most commonly are _pages_.

Collections encapsulate and model all the behavior and attributes relative to a group of resources.
In this way, collections dictate most everything about how your website ultimately generates its output.

### Scoped
All collections are scoped; they only track the resources contained in their collection.
For example if I create a folder named "essays" and I create five pages in this folder and put tags on them,
when I call `essays.tags.all` I will get back all the tags within the essays collection only.

### Dynamic

Creating a new folder defines a new collection, instantly.

This means you can create posts, essays, snippets, tutorials, etc all just by creating a new folder and ruhoh will automatically recognize and process it as a new collection.

### Extensible

A collection will default to `PageLike` which gives automatic behavior and attributes (such as a URL).

However, you have full control to change many settings through the configuration files both on a per-collection and per-page basis.

Additionally, you can create a plugin that defines custom collections which will behave exactly as you want.

## Page Collections

New collections default to `PageLike` which just means they include certain helpful behavior:

- permalink/url
- title
- date
- tags
- categories
- drafts
- collation (sortable on custom attributes used to create archive lists)
- RSS
- Pagination

Page-based collections can be paginated, collated, and generate RSS feeds.

### URLs

Page-based collections define their permalink structure to model their natural folder directory:

**File:** my-blog/essays/hello-world.md 
**Permalink:** /essays/hello-world

Permalinks can be easily configured on a per-collection and per-page basis.

## \_root Collection

Since every collection is necessarily a sub-folder, it can be annoying to realize you cannot serve root pages from the root of your blog. To compensate for this, the `_root` folder will always default to serving all pages at the root URL.

NOTE: `_root` just automatically sets `permalink: "/:relative_path/:filename"` which you can do manually on any collection you want.

## static Collection

<span class='label'>since 2.3</span>

If you just want to port a folder 1-1 from your website structure to the compiled output, use the 'static' collection modeler.

```yaml
# config.yml
'my-folder':
  'use': 'static'
```

## ignore Collection

<span class='label'>since 2.3</span>

If you want to ignore a folder completely, use the 'ignore' collection modeler.
This is useful if you need configuration-type or helper directories for third-party plugins and services.

```yaml
# config.yml
'my-folder':
  'use': 'ignore'
```

## Special Collections

There are some folder names that have special meanings.
When you create these folders they automatically default to their special collection class:

- layouts
- partials
- javascripts
- stylesheets
- data
- media
- \<theme\>

These collections are for the most part self-explanatory and can be further studied in their individual sections.

## Cascade

There are three possible _cascade levels_ of your website that ruhoh will traverse in search of files.

The obvious one is the root of your website: `my-website`. Here is the list, in order:

1. **System.**  
   This level is contained in the ruhoh gem itself. It is how all the default settings and resources are loaded.
2. **my-website.**  
   This is your base directory.
3. **Theme.**  
   The installed theme, which is covered in more detail below.

The cascade searches in these directories in order. This means a file in the theme folder will overload the same file in `my-website` which in turn will overload the same file in `system`.

## Themes

A theme is a special collection that acts as an encapsulation namespace.

A theme is a collection so it is defined by a sub-folder. However this sub-folder is dynamically named whatever you want (the name of the theme). Let's say you add the folder `twitter-bootstrap` and configure it to be your theme folder. Now sub-folders _within_ `twitter-bootstrap` are discoverable based on the special collection names.

For example:

- `twitter-bootstrap/layouts`
- `twitter-bootstrap/javascripts`
- `twitter-bootstrap/partials` 

are all valid places to load and manage these respective collection files.

### Why?

Themes enable a 'plug-and-play' modular architecture. Users are able to create and publish themes which others can freely install without conflicting with existing files.

## Templating

Ruhoh uses the [Mustache](http://mustache.github.io/) templating language to connect your collection data to the template files.
This connection interface is called the **View Layer**.

The view layer is just a wrapper class that wraps collections and gives it specialized helper methods to make it easier to display data in the templates.

Within the templates, every collection is available globally via their name:

{{#raw_code}}
  <ul>
  {{# pages.all }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ pages.all }}
  </ul>
  
  <ul>
  {{# essays.all }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ essays.all }}
  </ul>
{{/raw_code}}


### Custom Programming

Mustache is used to maintain an _extreme_ separation between programming logic and presentation logic.

Custom programming logic can be added easily via the plugin architecture. You'd simply create module methods and include your module into the appropriate collectionView.


# Directory Structure

The following outlines your blog's directory structure and includes helpful information and links to full documentation.

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em class="config">config.yml</em></li>
  <li class="info">
    <strong>[Optional]</strong>
    The config file is written in YAML and contains site-wide configuration options.
    <a href="/docs/2/setup">config documentation</a>
  </li>

  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-database">.</span> <em>data.yml</em> </li>
  <li class="info">
    <strong>[Optional]</strong>
    The data YAML file is used to specify data that can be used throughout your pages and layouts.
    A useful example is defining a navigation array that the templates can use to create your primary navigation bar.
    <a href="/docs/2/data">data documentation</a>
  </li>

  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em class="page">_root</em> 
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">index.md</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">about.md</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="page">random-folder</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong>
    All files contained in the _root folder will be processed as pages and automatically served from the root URL.
    <a href="/docs/2/pages">pages documentation</a>
  </li>

  <li class="endpoint"><span class="ui-silk inline ui-silk-folder">.</span> <em>compiled</em> </li>
  <li class="info">
    <strong>[Optional]</strong>
    The compiled folder is the default location the Compiler will output pages into.
    When you run the Compiler, your fully rendered blog will output to this folder.
    <a href="/docs/2/publish">compile documentation</a>
  </li>

  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>dash</em> 
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>index.html</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong>
    dash provides a custom view of your dashboard, located at /dash in development mode.
    dash is optional; ruhoh will use its system level view if dash/index.html is not provided.
  </li>

  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>media</em> 
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em>my-hockey-stick-graph.jpg</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong>
    The media folder holds global static media assets such as images, videos, pdfs, downloads, etc.
    Theme-specific assets should NOT exist in this media folder, but rather in the theme's media folder.
    <a href="/docs/2/media">media documentation</a>
  </li>

  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em class="partial">partials</em> 
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="partial">pages_list</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="partial">pages_collate</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong>
    Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included into any page or layout.
    <a href="/docs/2/partials">partials documentation</a>
  </li>

  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>plugins</em> 
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>kramdown.rb</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>tag_cloud.rb</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong>
    Plugins extend and/or overload the base ruhoh functionality. There are 3 types of plugins: mustache helpers, converters, and compiler tasks.
    <a href="/docs/2/plugins">plugin documentation</a>
  </li>

  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em class="post">posts</em> 
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="post">open-source-is-good.md</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="post">hello-world.md</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="post">untitled-draft.md</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong>
    Any user-defined folder will automatically default to a pages collection.
    Here the 'posts' directory may act like a traditional blog and hold your posts.
    <a href="/docs/2/pages">pages documentation</a>
  </li>

{{> trees/themes }}
{{> trees/widgets }}
</ul>






# Installation

This is a walkthrough on how to get ruhoh running on your local machine.

## Ruby 1.9.2+

ruhoh is packaged as a ruby gem. ruhoh is tested with ruby 1.9.2 on mac OSX Lion and runs in production with ruby 1.9.2 on Ubuntu 10.04.4 LTS.

ruby 1.8.7 is not supported.

Ruhoh is packaged as a gem which depends on:

- **rack** - for web-server integration
- **directory\_watcher** - for watching files for updates in realtime.
- **mustache** - for templating.
- **redcarpet** - for Markdown parsing.
- **nokogiri** - for HTML handling and RSS support.

\

    $ git clone 'git://github.com/ruhoh/blog.git' 'blog'
    $ cd blog
    $ bundle install
    $ bundle exec rackup -p 9292

Read the full [installation documentation](https://github.com/ruhoh/blog#readme)

## Ruhoh Command-Line

\*If uses the bundler version, remember to always precede commands with `bundle exec`.

Once the gem is installed your system should have an executable named `ruhoh`.

The command-line tool will be part of your primary workflow. View the help to see the available commands:

    $ ruhoh help

## New Blog

You can clone a new blog scaffold at any time using ruhoh:

    $ ruhoh new myblog

## Blog Preview

    $ cd myblog
    $ rackup -p 9292

Using the `rackup` command spawns a web-server that pragmatically loads your blog's pages in real-time.
This means as you update files, the updates are reflected immediately.

View your blog at: [http://localhost:9292/](http://localhost:9292/)

## Blog Dashboard

The **dashboard** conveniently lists all your pages: [http://localhost:9292/dash](http://localhost:9292/dash)

# Start

<a href="/docs/2/pages" class="btn btn-warning btn-large">Create Content &rarr;</a>


