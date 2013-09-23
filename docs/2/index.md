---
title: Introduction
---


# QuickStart

> The Quickstart assumes you have a basic understanding of **git**, **ruby** and **bundler**.
If you are new to ruby you might need to read the more verbose [Installation](/docs/2/installation) docs first.

## Launch

Make a new directory to hold your fresh website:

    $ mkdir ruhoh-site

Next we need to load ruhoh as a ruby gem. The proper way to install ruby gems is via bundler as it will save you versioning headaches later on.

Create a file inside "ruhoh-site" named Gemfile, with the following contents:

    source "https://rubygems.org"
    gem 'ruhoh', "~> 2"

You can do this right on the command-line:

    $ cd ruhoh-site
    $ touch Gemfile
    $ echo "source \"https://rubygems.org\"" >> Gemfile
    $ echo "gem 'ruhoh', \"~> 2\"" >> Gemfile


Ensure you are still in the "ruhoh-site" directory, then install the bundle:

    $ bundle install

Once the bundle is complete you can use the ruhoh command-line utility to start the local web-server:

    $ bundle exec ruhoh server 9292

**Success!**

You are now running a ruhoh enabled website previewable locally at: [http://localhost:9292](http://localhost:9292)

The default homepage shows you how to quickly create pages in ruhoh.

## Add Content

<span class='label'>since 2.5</span>

Viewing the [homepage](http://localhost:9292) or any other page not yet created in ruhoh will show you exactly how to quickly create a page for that URL.

Examples:

- [http://localhost:9292/about-me](http://localhost:9292/about-me)
- [http://localhost:9292/pages/my-projects](http://localhost:9292/pages/my-projects)
- [http://localhost:9292/essays/drafts/hell-world](http://localhost:9292/essays/drafts/hell-world)


Ruhoh tries to be as close to a normal website workflow as possible so no other dependencies or configurations are required.

Read the [Pages documentation](/docs/2/pages) for more in-depth info regarding page creation.


## Add Theme

**RECOMMENDED**

Themes are a great way to learn how to build pages, use layouts, javascripts, stylesheets, and the mustache syntax. Additionally they give you default structure, styling and page stubs to quickly get a basic site up.

Starting out, you should install a theme so you have files to play with and test things out. You can easily remove the theme later by deleting the theme folder.

Finally, every theme-level file can be overwritten by providing the same file within your site directory "ruhoh-site".

### How To


We'll use git to clone the default ruhoh theme into our site in the folder "theme-bootstrap-2"

Ensure you are still in the root of the "ruhoh-site" directory then run:

    $ git clone git@github.com:ruhoh/theme-bootstrap-2.git theme-bootstrap-2

Next we have to update `config.yml` to tell ruhoh to model this folder with the collection modeler "theme":

{{# folder_tree }}
  ruhoh-site
    config.yml
{{/ folder_tree }}

Add the following content to config.yml:

    "theme-bootstrap-2" :
      "use" : "theme"


The rack previewer must be restarted in order for this to take affect.
Kill the running process by pressing <kbd>ctrl</kbd>+<kbd>c</kbd> then run:

    $ bundle exec rackup -p 9292


Reload the page at [http://localhost:9292](http://localhost:9292) and you should see your new theme along with more default files!

[More about Themes](/docs/2/themes)


> **Hey!** The rest of this document is a full conceptual overview of how ruhoh works. You will learn important terminology, understand core design, and gain the "big picture" of ruhoh enabling you to feel at home in the system. **It's very important to read this!**


# Design Philosophy

Ruhoh is designed around three separate layers of functionality. Separation allows for a common and well-defined [API](http://en.wikipedia.org/wiki/Application_programming_interface) which in turn avoids dependency-creep and allows the user to freely customize and/or opt in and out of features with little to no consequence.

In other words, because the layers are separate, they don't really depend on eachother. You are free to write vanilla HTML or use ruhoh to render markdown and omit all templating and styling.

### 1. Content

Plain-text files, data files, images, music, videos, and other media are the primary use-cases for static websites. Content may be created using markup languages like HTML and [Markdown](http://daringfireball.net/projects/markdown/).

### 2. View

The View is the layer that encapsulates all programming logic and provides an interface between your content and presentation layers.

Ruhoh strictly enforces separation of programming logic from content and presentation. This is different from embedded-code systems like [erb](http://en.wikipedia.org/wiki/ERuby), [haml](http://en.wikipedia.org/wiki/Haml), [php](http://en.wikipedia.org/wiki/PHP), and most all traditional "web app" style frameworks.

### 3. Presentation

Presentation consists of your site's layout, structure, and aesthetic. In web terms this means structural HTML, CSS stylesheets, and javascripts.


# Interface

Ruhoh has three main user interfaces:

### 1. The filesystem.  

The way files and folders are organized, their content, names and extensions all instruct ruhoh how to model your site.

### 2. Configuration files and data.  

Configuration is done in a language-agnostic data format like [YAML](http://www.yaml.org/) and [JSON](http://www.json.org/) which allows you to give explicit instructions to ruhoh without needing to tap into programming logic. 

### 3. Plugin System.

Users comfortable with tapping into the underlying programming logic are encouraged to do so via the plugin system. Ruhoh uses a services-oriented approach to programming -- modular components are free for users to override, extend, replace, or re-implement without worry.

<!-- 
Ruhoh is launched relative to a given directory, let's call it **my-website**. Ruhoh takes this directory of files and compiles them into a website.
 -->


<!-- 
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
 -->

# Collections



Given a sample site directory structure:

{{# folder_tree }}
  pages
    about.md
  posts
{{/ folder_tree }}

Every top-level sub-folder will define a *collection*. The above example generates collections for "pages", "posts", and "essays".

A collection is just a group of _resources_ which are the files inside the collection folder. Internally, all collections have a _collection modeler_ class which encapsulates and models all the behavior and attributes on a per-collection basis.

Collections are first-class citizens that dictate most everything about how your website generates its output because _every file_ is modeled by a collection.



### Scoped
All collections are scoped; they only track the resources contained in their collection.
For example if I create a folder named "essays" and I create five pages in this folder and put tags on them,
when I call `essays.tags.all` I will get back all the tags within the essays collection only.

### Dynamic

Creating a new folder defines a new collection, instantly.

This means you can create posts, essays, snippets, tutorials, etc all just by creating a new folder and ruhoh will automatically recognize and process it as a new collection.

### Extensible

Collections transparently interface with the configuration files so you can customize functionality on both a per-collection and per-file basis. Collections may also be extended or entirely redefined to work eactly as you want via the plugin system.


### Special Collections

There are some folder names that have special meanings. When you create these folders they automatically default to their special collection class:

{{# folder_tree }}
  layouts
  partials
  javascripts
  stylesheets
  data
  media
  &lt;theme&gt;
{{/ folder_tree }}

These collections are for the most part self-explanatory and can be further studied in their individual sections.


# Pages


New collections will default to "pages" collections. Pages in ruhoh are a special type of resource that automatically include useful behavior:

- permalink/url
- title
- date
- tags
- categories
- drafts
- collation (sortable on custom attributes used to create archive lists)
- RSS
- Pagination

Page-based collections can be paginated, collated, and generate RSS feeds. Their url endpoint defaults to their natural folder hierarchy:

**File:** my-blog/essays/hello-world.md 
**Permalink:** /essays/hello-world

URLs are easily configurable on a per-collection and per-page basis.


# Cascade

As we've covered, ruhoh scans your site directory creating _collections_ from all of its sub-folders. Technically, your site directory is only _one_ of _three_ possible directories ruhoh looks to discover and model collections.

This design feature is called the **cascade**. It allows collections and files to stack on top of eachother in a hierarchical manner, which in turn allows the user to share collections and components without polluting his "core" site directory.

The three cascade levels take a priority from lowest to highest in this order:

1. **system.**  
   This level is contained in the ruhoh gem itself. It is how all the default settings and resources are loaded.
2. **my-website.**  
   This is your base site directory.
3. **theme.**  
   The installed theme, which is covered in more detail below.

The cascade searches these directories from lowest to highest priority. This means a file in the theme folder will overload the same file in `my-website` which in turn will overload the same file in `system`.

# Themes

A theme is a special collection that acts as an encapsulation namespace.

A theme is a collection so it is defined by a sub-folder. However this sub-folder is dynamically named whatever you want (the name of the theme). Let's say you add the folder `twitter-bootstrap` and configure it to be your theme folder. Now sub-folders _within_ `twitter-bootstrap` are discoverable based on the special collection names.

For example:

{{# folder_tree }}
  twitter-bootstrap
    layouts
    javascripts
    partials
{{/ folder_tree }}

are all valid places to load and manage these respective collection files.

### Why?

Themes enable a 'plug-and-play' modular architecture. Users are able to create and publish themes which others can freely install without conflicting with existing files.

# Templates & Views

Ruhoh uses the [Mustache](http://mustache.github.io/) templating language to connect your collection data to the template files.
This connection interface is called the **View Layer**.

The **View Layer** is an abstract concept, it just means a programming interface, which in the case of ruby is a wrapper class whose public methods are accessible inside the templates.

## MasterView

Ruhoh uses a single **MasterView** object to model and render all pages in the system. The MasterView is the global context within the templating environment. Within this global context the MasterView exposes every collection via the collection name.

The following is an example of the mustache syntax being used within an HTML template. All templates render within the global MasterView context. As such, we can access the "pages" and "essays" collection via their names:

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


## CollectionView

Every collection is wrapped in a **CollectionView** object which provides specialized functions to make it easier to work with and render data in the templates. 

{{#raw_code}}
  <ul>
  {{# essays.all }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ essays.all }}
  </ul>
{{/raw_code}}

This example calls the "all" method on the "essays" collection, which is a method inside the **CollectionView**. In this way, any and all functionality required in the templates can be programmed inside plain ruby objects, provided to the **CollectionView**, and immediately accessed within the template environment.


## ModelView

Finally, every _resource_ within every collection is wrapped in a **ModelView** object which also provides specialized functions used to render _resource_ data in the templates.

{{#raw_code}}
  <ul>
  {{# essays.all }}
    <li><a href="{{url}}">{{title}}</a></li>
  {{/ essays.all }}
  </ul>
{{/raw_code}}

This example shows mustache looping through a collection and rendering links with "url" and "title" attributes. Since collections are just groups of _resources_, each loop iteration represents a single _resource_ of that collection.

A **ModelView** wraps every resource so the methods "url" and "title" are actually **ModelView** instance methods.


# Configuration

The `config.yml` file is the primary interface for setting configuration parameters on both a global and per-collection basis.

{{# folder_tree }}
  config.yml
{{/ folder_tree }}

<span class='label'>since 2.4</span>

config now supports JSON:

{{# folder_tree }}
  config.json
{{/ folder_tree }}

## Global level

### base_path

The `base_path` intelligently prepends **all** urls in the system with the given `base_path`.
This allows you to host your blog in a subdirectory of a given website.

    # config.yml
    base_path: "/path/to/my/blog"

**Example:** To host your site on this domain: http://myuniversity.edu/staff/me/~/blog:

    # config.yml
    base_path: "/staff/me/~/blog"

**Note:** The `base_path` is never added in development mode.

### production_url

Set the URL to where your blog will be live on the Internet. This is needed to properly
generate your RSS feed and other features. **This setting has nothing to do with building internal links**. Use `base_path` instead.

    production_url : 'http://yourdomain.com'


## Collection level


Within `config.yml` a collection's configuration is accessible via the collection's name as the top-level key:


    # config.yml

    "my-collection":
      "use": "ignore"

    "essays" :
      "summary_lines" : 10


All collections that are not "special" collections default to "pages" collections. To set a specific collection modeler for your collection, use the `"use"` key and provide a valid collection modeler name:

    # config.yml

    "my-collection":
      "use": "ignore"

## Model Level

A model or "page" in this case is generally the actual file inside a given collection.
Configuration may be set on a per-model level and will (should) override any collection level configuration by the same name.

### Top Metadata

Configuration is done in-file and is referred to as **Top Metadata**. The format looks like this:

    ---
    title: Hello
    date: "2012-12-12"
    description:
    layout: "yay"
    tags: ["apple", "orange"]
    categories : ["random"]
    ---

    ... The rest of the page body is here ...


**Format requirements:**

1. The syntax `---` starts the top metadata block and must be the very first line at the very first character positions.
2. The inside block syntax must be on a newline and is currently YAML syntax so the key-value pairs inside **must be valid YAML**. [Validate your YAML](http://yamllint.com/) if you get YAML parse errors.
3. After the YAML syntax the top metadata block must be closed by another `---` on a newline at the first character positions of that line.

Note Ruhoh can only recognize this metadata if the format is valid.

**Top Metadata is OPTIONAL.** 

If a file does not use metadata, the collection level configuration is used. Note also there are default values for certain attributes like "layout" which may be used.

### JSON

<span class='label'>since 2.4</span>

Top Metadata can now be written in JSON:


    {
      "layout": "yay", 
      "description": null, 
      "tags": [
        "apple", 
        "orange"
      ], 
      "date": "2012-12-12", 
      "title": "Hello", 
      "categories": [
        "random"
      ]
    }

    ... The rest of the page body is here ...

**Format requirements:**

1. The syntax `{` starts the top metadata block and must be the very first line at the very first character position.
2. The resultant object **must be valid JSON**. [Validate your JSON](http://jsonlint.com/) if you get JSON parse errors.
3. The syntax `}` ends the JSON object.

Note Ruhoh can only recognize this metadata if the JSON format is valid.

# Terminal 

Nearly all functionality is exposed to the terminal.


\*If using the bundler version, remember to always precede commands with `bundle exec`.

Once the gem is installed your system should have an executable named `ruhoh`.

The command-line tool will be part of your primary workflow. View the help to see the available commands:

    $ ruhoh help

### New Blog

You can clone a new blog scaffold at any time using ruhoh:

    $ ruhoh new myblog

### Blog Preview

    $ cd myblog
    $ rackup -p 9292

Using the `rackup` command spawns a web-server that pragmatically loads your blog's pages in real-time.
This means as you update files, the updates are reflected immediately.

View your blog at: [http://localhost:9292/](http://localhost:9292/)



# Directory Structure

The following is a sample outline of a site directory structure and includes helpful information and links to full documentation.

{{# folder_tree }}
  config.yml
  data.yml
  _root
    index.md
    about.md
    random-folder
  compiled
  dash
    index.html
  media
    my-hockey-stick-graph.jpg
  partials
    pages_list.html
    pages_collate.html
  plugins
    kramdown.rb
    tag_cloud.rb
  posts
    open-source-is-good.md
    hello-world.md
    drafts
      untitled-draft.md
{{/ folder_tree }}
{{> trees/themes }}
{{> trees/widgets }}


# Next Steps

Hopefully you are excited to start creating content!

- Understand the different collection modelers outlined to the right.
- [Learn how layouts, templates, Views, and mustache work together](/docs/2/views).
- [Learn how to publish](/docs/2/publish).
- [Learn how to add Plugins](/docs/2/plugins).

