---
title: Setup
icon : icon-cog
---

# Development Setup

This is a walkthrough on how to get ruhoh running on your local machine.

## Ruby 1.9.2+

ruhoh is packaged as a ruby gem. ruhoh is tested with ruby 1.9.2 on mac OSX Lion and runs in production with ruby 1.9.2 on Ubuntu 10.04.4 LTS.

ruby 1.8.7 is not supported.


Install the ruhoh gem to parse your blog using ruby. The ruhoh gem depends on:

- **rack** - for web-server integration
- **directory\_watcher** - for watching files for updates in realtime.
- **mustache** - for templating.
- **redcarpet** - for Markdown parsing.
- **nokogiri** - for HTML handling and RSS support.


**Please use the new v2.0.alpha blog scaffold to setup your new environment!**

Step by step instructions are available here:

https://github.com/ruhoh/blog/tree/2.0.alpha#readme


## Command-Line

Once the gem is installed your system should have an executable named `ruhoh`.

The command-line tool will be part of your primary workflow. View the help to
see the available commands:

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

# Configuration

The `config.yml` file holds your blog's global configuration settings.

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em> &larr;</li>
</ul>

## base_path

The `base_path` intelligently prepends **all** urls in the system with the given `base_path`.
This allows you to host your blog in a subdirectory of a given website.

    # config.yml
    base_path: "/path/to/my/blog"

**Example:** To host your site on this domain: http://myuniversity.edu/staff/me/~/blog:

    # config.yml
    base_path: "/staff/me/~/blog"

**Note:** The `base_path` is never added in development mode.

## production_url

Set the URL to where your blog will be live on the Internet. This is needed to properly
generate your RSS feed and other features. **This setting has nothing to do with building internal links**. Use `base_path` instead.

    production_url : 'http://yourdomain.com'


# Directory API

## RuhohSpec v2.0 Directory Structure

<p>
  The following outlines your blog's directory structure and 
  includes helpful information and links to full documentation.
</p>

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em class="config">config.yml</em></li>
  <li class="info">
    <strong>[Optional]</strong>
    The config file is written in YAML and contains site-wide configuration options.
    <a href="/docs/2/setup">config documentation</a>
  </li>
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>dash.html</em> </li>
  <li class="info">
    <strong>[Optional]</strong>
    dash.html provides a custom view of your dashboard, located at /dash in development mode.
    dash.html is optional; ruhoh will use its system level view if dash.html is not provided.
  </li>
  <li class="endpoint"><span class="ui-silk inline ui-silk-folder">.</span> <em>compiled</em> </li>
  <li class="info">
    <strong>[Optional]</strong>
    The compiled folder is the default location the Compiler will output pages into.
    When you run the Compiler, your fully rendered blog will output to this folder.
    <a href="/docs/2/publish">compile documentation</a>
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
    <span class="ui-silk inline ui-silk-folder">.</span> <em class="page">pages</em> 
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">index.md</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">about.md</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="page">random-folder</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong>
    All files contained in the pages folder will be processed as pages.
    <a href="/docs/2/pages">pages documentation</a>
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
    All files contained in the posts folder will be processed as posts.
    <a href="/docs/2/posts">posts documentation</a>
  </li>
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-database">.</span> <em>data.yml</em> </li>
  <li class="info">
    <strong>[Optional]</strong>
    The data YAML file is used to specify data that can be used throughout your pages and layouts.
    A useful example is defining a navigation array that the templates can use to create your primary navigation bar.
    <a href="/docs/2/data">data documentation</a>
  </li>

{{> trees/themes }}
{{> trees/widgets }}
</ul>

# Creating Content

<a href="/docs/2/pages" class="btn btn-warning btn-large">Create Content &rarr;</a>


