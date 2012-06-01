---
title: Universal Blog API
description:

layout: page
---


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
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">themes</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em></li>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>layouts</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>default.html</em></li>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>page.html</em></li>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>post.html</em></li>
            </ul>
          </li>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>media</em></li>
          <li>
            <span class="ui-silk inline ui-silk-folder">.</span> <em class="partial">partials</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="partial">posts_collate</em></li>
            </ul>
          </li>
          <li><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>theme.yml</em></li>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em></li>
        </ul> 
      </li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>another-theme</em></li>
    </ul>
  </li>
  <li class="info">
    <strong>[Required]</strong>
    The themes folder holds all your themes. Themes are packaged into folders containing all
    layouts, partials, stylesheets, media, and javascripts necessary to style the website.
    <a href="/usage/theming">theme documentation</a>
  </li>
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>widgets</em> 
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>some_widget_name</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em></li>
          <li>
            <span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>some_widget_name.js</em></li>
            </ul>
          </li>
          <li>
            <span class="ui-silk inline ui-silk-folder">.</span> <em>layouts</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>some_widget_name.html</em></li>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>alternative_view.html</em></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li class="info">
    <strong>[Optional]</strong> Widgets define encapsulated mustache helpers to allow for customized
    HTML snippets that can optionally run javascripts and take in arbitrary configuration parameters.
    Client-side comments, analytics, and syntax highlighting are some automatically provided widgets.
    <a href="/usage/widgets">widget documentation</a>
  </li>
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
