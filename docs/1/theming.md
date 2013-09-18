---
title:
description:

layout: docs-1
icon : icon-adjust
---

# Overview

A theme's primary role is to provide styling and assets to your your content.
Ideally a theme should do this in an unobtrusive and modular way, always acting as an asset namespace.

A theme is simply a collection of layouts, partials, and assets such as stylesheets, images, and javascripts that those partials and layouts depend on.

The theme structure is as detailed below:

{{> trees/themes }}

## Configuration (theme.yml)

All themes should specify a theme.yml file that outlines basic asset dependencies.
Stylesheet and javascript dependencies are covered in their respective sections below.


# Layouts

Layout files are used to provide context around a page's content.

A page may specify a layout to render itself into. Additionally this layout may specify its own layout to render _itself_ into, thereby defining its sub-layout.

This makes it possible for a page to have a sub-layout and a master-layout.
Be aware that layouts will not be nested more than two levels deep.

## Create a layout

The Ruhoh command-line client can automatically create layouts for the active theme.

    $ ruhoh layout splash

The command will create a file at:

{{# folder_tree }}
  themes
    [ACTIVE-THEME]
      layouts
        splash.html
{{/ folder_tree }}

Edit your layout as desired, then make sure to specify your new layout within the pages' YAML meta-data:

    ---
    layout: splash
    categories : ruby
    ---

## Insert page content into layout

Use the mustache helper: {{#raw_code}}{{{ content }}}{{/raw_code}} ... to render a page's content within the given layout.  

**Note we use the triple mustache syntax here so HTML content passes through unescaped**  
See the [mustache manual](http://mustache.github.com/mustache.5.html) for more info.

{{#raw_code}}
---
layout: default
---
<body>
  <div id="sidebar"> ... </div>
  <div id="main">
    {{{ content }}}
  </div>
</body>
{{/raw_code}}


# Stylesheets

All stylesheets should be placed into the theme's stylesheets folder:

{{# folder_tree }}
  themes
    twitter
      javascripts
      media
      theme.yml
      stylesheets
{{/ folder_tree }}

Themes should manage stylesheet dependencies using `theme.yml`:

    {
      "stylesheets" : {
        
        "default" : [
          "bootstrap.min.css",
          "style.css"
        ],
        "post" : [
          "post-specific-styles.css"
        ]
      }
    }

The configuration file specifies an object at key "stylesheets". Keys within this object
should be the names the theme's layouts. An Array of stylesheet names specifies the load dependencies
for the given layout. Any time the layout is used, the dependencies will automatically load in the order provided.

Load dependencies are managed by ruhoh and are output via the mustache helper: `assets`

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    <meta name="author" content="{{ site.author.name }}">
    {{{ assets }}} 
  </head>
  ...
</html>
{{/raw_code}}


Note the triple mustache syntax which is required for rendering non-escaped HTML syntax.

Reference media in stylesheet files using relative paths: `../media`

Manually reference stylesheets in layouts using mustache: 

{{#raw_code}}
<link href="{{urls.theme_stylesheets}}/some-stylesheet.css" rel="stylesheet" type="text/css" media="all">
{{/raw_code}}


Note manually referencing stylesheets is discouraged because they will be unregistered with ruhoh's asset manager.


# Javascripts

All javscripts should be placed into the theme's javascripts folder:

{{# folder_tree }}
  themes
    twitter
      javascripts
      media
      theme.yml
      stylesheets
{{/ folder_tree }}

Themes should manage javascript dependencies using `theme.yml`:

    {
      "javascripts" : {
        
        "default" : [
          "jquery.js",
          "cool-effect.js"
        ],
        "post" : [
          "post-specific-functionality.js"
        ]
      }
    }

The configuration file specifies an object at key "javascripts". Keys within this object
should be the names the theme's layouts. An Array of javascripts names specifies the load dependencies
for the given layout. Any time the layout is used, the dependencies will automatically load in the order provided.

Load dependencies are managed by ruhoh and are output via the mustache helper: `assets`

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    <meta name="author" content="{{ site.author.name }}">
    {{{ assets }}} 
  </head>
  ...
</html>
{{/raw_code}}


Note the triple mustache syntax which is required for rendering non-escaped HTML syntax.


Manually reference javascripts in layouts using mustache: 

{{#raw_code}}
<script src="{{urls.theme_javascripts}}/some-javascript-file.js"></script>
{{/raw_code}}


Note manually referencing javascripts is discouraged because they will be unregistered with ruhoh's asset manager.


# Media 

All theme specific media should be placed into the theme's media folder:

{{# folder_tree }}
  themes
    twitter
      javascripts
      media
      theme.yml
      stylesheets
{{/ folder_tree }}

Reference media in stylesheet files using relative paths `../media`

Reference media in layouts using mustache: 

{{#raw_code}}
<img src="{{urls.theme_media}}/some-image.png">
{{/raw_code}}



# Bundling

**Ruhoh is laying the groundwork for asset bundling but does not currently provide a default implementation strategy.**

Any modern web framework should provide sensible asset bundling. Ruhoh makes a point to abstract out
asset dependencies into one common theme.yml file. This sets the stage to integrate a bundling and post-processing strategy
when compiling your website.

I'd like some more input on this, especially from designer-folk. Please let me know if theme.yml makes sense or just gets in your way.
The obvious thing to do would be to add a compile task that just concatenates the files based on layout, but I don't want to impose any unnecessary
and _implementation specific_ overhead.

Thanks!


# Partials

Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included
into any page or layout.

Theme partials are useful when you want to include theme dependent HTML and/or css classes.
Theme partials have a higher priority than default partials so they will overload default partials of the same name.

## Create a Theme Partial

{{# folder_tree }}
  themes
    [ACTIVE-THEME]
      partials
        my-partial-file
{{/ folder_tree }}

# Widgets

TODO =/


# New Themes

## Install New Theme

To install a new theme just download the folder and place it in the "themes" directory:

{{# folder_tree }}
  themes
    [NEW-THEME-NAME]
{{/ folder_tree }}

Then update your `config.yml` to set the theme to this new theme name

    theme : 'new-theme-name'


## Create New Theme

The Ruhoh command-line client can automatically create scaffolding for building a new theme.

    $ ruhoh theme 'new-theme-name'

Scaffolding for _new-theme-name_ will be available at:

{{# folder_tree }}
  themes
    new-theme-name
{{/ folder_tree }}
