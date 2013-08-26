---
title:
description:
icon: icon-magic
---

# Overview

Widgets enable self-contained HTML snippets to be embedded into your website.
Widgets are different from partials in that they can encapsulate their own configuration and assets.

The reasoning behind widgets is to allow the easy sharing of HTML and javascript based functionality.

Widget directory structure:

<ul class="folder-tree">
{{> trees/widgets }}
</ul>


## Usage

A widget must have a unique name relative to other widgets. Words should be separated with underscores.
Following this naming scheme will automatically provide the widget mustache method:

{{# raw_code }}
{{{ widgets.some_widget_name }}}
{{/ raw_code }}    

**Note the triple mustache syntax is necessary to render HTML without escaping characters.**

The widget snippet will render wherever this widget is called.

## Snippets

Snippets are the chunks of code that will render when calling a given widget. Widgets may define multiple snippets and let the user decide which one to load.

For example the analytics widget has snippets for google and getclicky. Here's the google snippet:

{{# raw_code }}
&#045;&#045;&#045;
tracking_id : 'UA-123-12'
&#045;&#045;&#045;

<script>
  var _gaq=[['_setAccount','{{ this_config.tracking_id }}'],['_trackPageview']];
  (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
  g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
  s.parentNode.insertBefore(g,s)}(document,'script'));
</script>
{{/ raw_code }}


**this_config**

Notice you can set arbitrary configuration settings via the snippet's top YAML metadata. This metadata is available to the snippet via: `this_config` namespace.

**this_path**

Aside from the widget snippets, widgets may package arbitrary files such as images, javascripts, web-fonts, etc.
Link to these assets using `this_path`:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>widgets</em> 
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>some_widget_name</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>some-snippet.html</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>alternate-snippet.html</em></li>
          <li>
            <span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>some-script.js</em></li>
            </ul>
          </li>
          <li>
            <span class="ui-silk inline ui-silk-folder">.</span> <em>media</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>cool-icon.jpg</em></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

{{# raw_code }}
&#045;&#045;&#045;
tracking_id : 'UA-123-12'
&#045;&#045;&#045;

<script src="{{this_path}}/javascripts/some-script.js"></script>

<img src="{{this_path}}/media/cool-icon.jpg">

...
{{/ raw_code }}

Widget urls follow the pattern:

**URL: /assets/widgets/some\_widget\_name/...**

## Configure

Widgets define configuration settings via their snippet's top YAML metadata:

{{# raw_code }}
&#045;&#045;&#045;
tracking_id : 'UA-123-12'
show_count : true
&#045;&#045;&#045;

...
{{/ raw_code }}

The special `use` configuration setting tells the widget which snippet to use. If `use` is omitted then the `default.html` snippet is used.

The purpose of widgets is to be modular so rather than edit a specific snippet file to customize its configuration,
you can define the widget's global config in `config.yml`:


    #config.yml
    widgets :

      analytics :
        use : getclicky
        # -- config for google --
        # tracking_id : 'UA-123-12'

        # -- config for getclicky  --
        site_id : 9999999

      comments :
        use : disqus
        # -- config for disqus --
        short_name : jekyllbootstrap # Change This!

      google_prettify :
        use : overloaded
        linenums : true


This is only time when `config.yml` will actually override file-specific configuration.

In this particular case the snippet config is meant to describe implementation defaults and should be overridden by user specific config.


## Presentation


Widgets should probably not ship with styling; all presentation logic should be handled by the presentation resources e.g. stylesheets in your theme. Widgets should provide well-formed HTML markup with name-spaced classes for the theme to use.

However, if you'd like to ship styling with your widget you can do so by including a stylesheet and linking to it in your snippet:

{{# raw_code }}
&#045;&#045;&#045;
tracking_id : 'UA-123-12'
&#045;&#045;&#045;

<link href='{{this_path}}/stylesheets/style.css' type='text/css' rel='stylesheet' media='all'>

...
{{/ raw_code }}


## System Widgets

Ruhoh comes bundled with system level widgets which are outlined in the documentation.

Widgets respect the cascade. You can overload any system level widget by providing the necessary files in the widget's namespace.
