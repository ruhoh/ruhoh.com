---
title: Usage Docs
layout: docs
icon : icon-star
---

Docs are for current version: **v1.0.0.alpha** - [View Deprecated 0.3.0 Documentation](/0-3-0/usage)

# Development Setup

Your ruhoh blog is meant to be developed and previewed on your local machine.
Currently the ruhoh beta only supports ruby.

## Ruby 

Install the ruhoh gem to parse your blog using ruby. The ruhoh gem depends on:

- **rack** - for web-server integration
- **directory\_watcher** - for watching files for updates in realtime.
- **mustache** - for templating.
- **redcarpet** - for Markdown parsing.
- **nokogiri** - for HTML handling and RSS support.

These gems will be installed along with Ruhoh if you don't already have them.

    $ gem install ruhoh
    
If you run into a problem you can [create a support issue](https://github.com/ruhoh/ruhoh.rb/issues) using GitHub Issues.

# Command-Line

Once the gem is installed your system should have an executable named `ruhoh`.

The command-line tool will be part of your primary workflow. View the help to
see the available commands:

    $ ruhoh help

# Previewing Your Blog

If you've followed the setup on the [homepage](/) you should already have your blog scaffold installed locally:

    cd USERNAME.ruhoh.com
    rackup -p 9292

You can clone a new blog scaffold at any time using ruhoh:

    $ ruhoh new myblog
    $ cd myblog
    $ rackup -p 9292

Using the `rackup` command spawns a web-server that pragmatically loads your blog's pages in real-time.
This means as you update files, the updates are reflected immediately.

View your blog at: [http://localhost:9292/](http://localhost:9292/)

## Blog Dashboard

The **dashboard** conveniently lists all your pages: [http://localhost:9292/dash](http://localhost:9292/dash)


# Directory API

## RuhohSpec v1.0 Directory Structure

<p>
  The following outlines your blog's directory structure and 
  includes helpful information and links to full documentation.
</p>

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em class="config">config.yml</em></li>
  <li class="info">
    <strong>[Required]</strong>
    The config file is written in YAML and contains site-wide configuration options.
    <a href="usage/configure">config documentation</a>
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
    <a href="/usage/publish#toc_8">compile documentation</a>
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
    <a href="/usage/create#toc_10">media documentation</a>
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
    <a href="/usage/create">pages documentation</a>
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
    <a href="usage/plugins">plugin documentation</a>
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
    <a href="/usage/create#toc_3">posts documentation</a>
  </li>
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-database">.</span> <em>site.yml</em> </li>
  <li class="info">
    <strong>[Optional]</strong>
    The site YAML file is used to specify site-wide data that can be used throughout your pages and layouts.
    A useful example is defining a navigation array that the templater can use to create your primary navigation bar.
  </li>

{{> trees/themes }}
{{> trees/widgets }}
</ul>

## Interface Specification

Ruhoh parses your blog for data based on a standardized _interface specification_. 

First, your blog is assumed to be wholly contained in one directory. This directory acts as the primary interface. 
Secondly, files contained in this directory have three vectors of specificity:

<dl class="dl-horizontal">
  <dt>File Position</dt>
  <dd>
    Files in specific folders necessarily define them as a certain data type.
    For example files in the "layouts" directory define the file as a layout and will error if not properly formatted as such.
  </dd>
  <dt>File Name</dt>
  <dd>
    Secondly, a file's name may define it's role. 
    For example the main configuration file must be in a specific position (the root) <em>and</em> it 
    must be named exactly config.yml. 
  </dd>
  <dt>File Contents</dt>
  <dd>
    Lastly, a file's content <em>must</em> match it's implicit data-type as defined by its position and name. 
    This means files in the posts folder must contain content formatted <em>as a post</em>,
    and files in the layouts folder must have a valid layout as its content.
  </dd>
</dl>



# Next Steps

<h2 style="border:0; text-align:center">Now you're ready to create some content!</h2>
<p style="text-align:center">
  <a href="/usage/create" class="btn btn-warning btn-large">Create Content &rarr;</a>
</p>  