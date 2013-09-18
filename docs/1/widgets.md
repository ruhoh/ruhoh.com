---
title:
description:
icon: icon-plus-sign
layout: docs-1
---


# Overview

Widgets define encapsulated mustache helpers to allow for customized HTML snippets that can optionally run javascripts and take in arbitrary configuration parameters.

Widget directory structure:

{{> trees/widgets }}

## Using a widget

A widget must have a globally unique name. Words should be separated with underscores.
Following the naming scheme outlined above will automatically provide the widget mustache method:

{{# raw_code }}
{{{ some_widget_name }}}
{{/ raw_code }}    

**Note the triple mustache syntax is necessary to render HTML without escaping characters.**

Based on the configuration parameters, a widget will render a respective layout and optionally register javascripts with the asset manager.
This is all taken care of for you automatically.


## Widget Configuration

`config.yml` files are bundled with every widget. The widget documentation will tell you what config params are available to you.

## Widget Layouts

A widget layout may provide an HTML snippet to output wherever the widget method is called.
This layout is processed through Mustache and takes in the wiget's `config.yml` as it's payload, meaning
all widget config params are available in the layout via `config.param_name`

## Widget Styling

Widgets have no concept of styling; all styling is handled by the theme implementation.
However widgets should provid well-formed HTML markup with name-spaced classes for the theme to use.
Documentation for intelligently loading widget-specific stylesheets is outlined in the theming section.

## System-level Widgets

ruhoh comes bundled with system level widgets, which are outlined in detail below.
Users may also specify their own custom widgets by providing them in the widgets folder.

All widgets _always_ cascade. You can overload any system level widget by providing the necessary files in the widget's namespace.
You'll read below how to configure widgets, specify layouts and/or overload layouts as necessary for
the system-level widgets.

# Comments

Ruhoh provides widget codes for [Disqus](http://disqus.com), [Intense Debate](http://intensedebate.com), [livefyre](http://www.livefyre.com/), and [Facebook Comments](https://developers.facebook.com/docs/reference/plugins/comments/).

## Add Comments

To enable commenting for your blog you will need to have setup an account with one of these providers.
In the `config.yml` you should see configuration parameters as shown below: 


{{# folder_tree }}
  widgets
    comments
      config.yml
{{/ folder_tree }}


    # Settings for comments widget
    # Set 'layout' to the comment provider you want to use.
    # Set 'layout' to false to turn commenting off globally.

    layout : disqus
    disqus :
      short_name : ruhoh
    livefyre :
      site_id : 123
    intensedebate :
      account : 123abc
    facebook :
      appid : 123
      num_posts: 5
      width: 580
      colorscheme: light


### Choose a Provider

The comment widgets specifies different layouts for the different engines. 
Set `layout` to the provider you intend to use. Make sure to specify your account credentials for the relevant provider within the hash named for _that_ provider.

In the example above, the **disqus** provider will be used and will be provided with **ruhoh** as the account **short\_name**.


### Custom Providers

To use a custom provider, create a layout with widget code for that provider and specify the new layout name in `layout`, e.g.: `layout: custom_comments`.

{{# folder_tree }}
  widgets
    comments
      config.yml
      layouts
        custom_comments.html
{{/ folder_tree }}

## Disable Comments

Set `layout: false` to disable comments globally. 

Disable comments for individual pages/posts by specifying `comments: false` in the page/post YAML meta-data:

    ---
    layout: post
    categories : lessons
    comments : false
    tags : [yay]
    ---

Internally, the value of "comments" will be cast to a String. So you must specify exactly the value `false` or `"false"` for this to work.


# Analytics

Ruhoh provides analytics codes for [Google](http://google.com/analytics), and [GetClicky](http://getclicky.com).

## Add Analytics

To enable analytics for your blog you will need to have setup an account with one of these providers.
In the `config.yml` you should configuration parameters as shown below:

{{# folder_tree }}
  widgets
    analytics
      config.yml
{{/ folder_tree }}

    # Settings for analytics helper
    # Set 'layout' to the analytics provider you want to use.
    # Set 'layout' to false to turn analytics off globally.
    #        

    layout : google
    google : 
        tracking_id : 'UA-123-12'
    getclicky :
      site_id :


### Choose a Provider

Set `layout` to the provider you intend to use. Make sure to specify your account credentials for the relevant provider within the hash named for _that_ provider.

In the example above, the **google** layout will be used and will be provided with **UA-123-12** as the account **tracking\_id**.

### Custom Providers

To use a custom provider, create a layout with widget code for that provider and specify the new layout name in `layout`, e.g.: `layout: custom_analytics`.


{{# folder_tree }}
  widgets
    analytics
      config.yml
      layouts
        custom_analytics.html
{{/ folder_tree }}


## Disable Analytics

Set `layout: false` to disable analytics globally. 

Disable analytics for individual pages/posts by specifying `analytics: false` in the post/page YAML meta-data:

    ---
    layout: post
    categories : lessons
    analytics : false
    tags : [yay]
    ---

Internally, the value of "analytics" will be cast to a String. So you must specify exactly the value `false` or `"false"` for this to work.


# Syntax Highlighting


## Enable Google\_Prettify

Syntax highlighting is enabled by default using [Google Prettify](http://google-code-prettify.googlecode.com/svn/trunk/README.html).
Content specified in `<pre></pre>` blocks will be automatically highlighted.
Prettify tries to automatically detect the language and highlight the syntax appropriately. 

### Configuration

In the `config.yml` you should see a configuration params as shown below:

{{# folder_tree }}
  widgets
    google_prettify
      config.yml
{{/ folder_tree }}

    linenums : true

In the example above, **linenums** enable line-numbers globally.

## Loading Stylesheets

Widgets cannot specify their own stylesheets. All styling is handled by the theme implementation.

Your installed theme will/should specify a stylesheet to load for the `google_prettify` widget:

{{# folder_tree }}
  themes
    twitter
      theme.yml
{{/ folder_tree }}


    # The twitter-bootstrap.css stylesheet will load when google_prettify is enabled.
    # NOTE: 
    #   Stylesheets will load automatically, without needing to specify this config,
    #   if the stylesheet exists and is named the same as the widget name e.g. : google_prettify.css

    {
      "stylesheets" : {
        "default" : [
          "bootstrap.min.css",
          "style.css"
        ],

        "widgets" : {
          "google_prettify" : "twitter-bootstrap.css"
        }
      }
    }

{{# folder_tree }}
  themes
    twitter
      theme.yml
      stylesheets
      widgets
        google_prettify
          layouts
            stylesheets
              default.css
              desert.css
              sons-of-obsidian.css
              sunburst.css
              twitter-bootstrap.css
{{/ folder_tree }}


Ruhoh's default "twitter" theme comes with all four of Google Prettify's [user-submitted themes](http://google-code-prettify.googlecode.com/svn/trunk/styles/index.html) as well as 
the code-highlighting theme packaged with [Twitter Bootstrap](http://twitter.github.com/bootstrap/base-css.html#code)

Add more stylesheets or edit existing ones, then remember to specify your stylesheets choice in `theme.yml` as shown above.

## Disable Highlighting

Most likely you'd disable Prettify if you intend to use your own highlighting system, whether server-side or 
via another Javascript library.

Set `layout: false` to disable google\_prettify globally.
