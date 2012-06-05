---
title: version 0.4.0
date: '2012-06-05'
description:
categories: releases
tags: []

layout: post
---

<style type="text/css">
  h2, h3 {
    margin:10px 0;
  }
  h2 {margin-left:-20px}
</style>

## I Just Broke Everything

ruhoh version *0.4.0* has some major API overhauls and pretty much
destroys all the old directory API endpoints for your blog directory.

I've provided a rake task to help the upgrade process below.

Following that is a quick outline all the new changes.

## Installing

```` bash
$ gem install ruhoh --version '0.4.0'
````

## Upgrading

This rake task will upgrade _most_ of your blog directory.

[blah](/meep)

The rake task cannot upgrade any theme you've customized because the Theme API has changed too much.
What it does do is provide the new site with the latest stock theme for you to try out and investigate a little.

Please contact me personally if you need assistance with porting your customized theme.



## New config.yml Format + Optons.

Breaking changes for `permalink` and `exclude`. Must now be name-spaced into `posts` hash.

    posts:
      permalink: ''
      exclude: ''
      layout: ''
  
    pages:
      permalink: ''
      exclude: ''
      layout: ''
    
Pages and posts have default layouts named respectively, and can set default global layout in config
as documented in [Configure Documentation](/usage/configure)

## New summary and posts_latest Helper Methods

An often requested feature was support for a "posts index" page which
displayed the latest n posts and a summary of each post body.

This is now supported view `posts_latest` and `summary` which are outlined in the [Templating Documentation](/usage/templating)

Additionally you can see an example implementation within the default [blog scaffold](https://github.com/ruhoh/blog/blob/1.0/pages/index.html#L16-26)

## Add Support for International Characters.

You should now be able to name your files anything you want.
URLs, tags, categories, and other arbitrary meta-data may be set using International characters.

## Overhauled Permalink formatting

Users reported a lot of problems with the way permalinks were generated. 
I've add these fixes which should take care of all reported issues:

- Supports international characters via unicode regular expressions.
- All non-word characters are now omitted from the URL rather than CGI escaped.
- Titles are always cast to string.
- Strip dashes from start, end, and multi-dash occurrences.
- Category names are CGI escaped to support international characters.
- Permalinks without tokens are now treated as literals.

Additionally you can now reference the token `:filename` which will give you the raw filename of the post file.

[view commit](https://github.com/ruhoh/ruhoh.rb/commit/75a8a1e495558579bb033f572819f841955fe5af)

## Update Draft and Post Workflow

Posts no longer are _required_ to start as drafts.
You may create a draft or post using the command line names respectively:

    $ ruhoh draft

and

    $ ruhoh post
    
These methods additionally take in an optional title argument as specified
in the [Create Documentation](/usage/create)

## Native RSS compiler

[David Long's](http://www.davejlong.com/) RSS compiler task has been added into the main gem and now supports
automatic rss.xml feed generation during compilation.

## Add ability to run previewer in production mode

If you ever want to run the preview in production mode:

    run Ruhoh::Program.preview(:env => 'production')
    
This does stuff like omit drafts from displaying and affecting tag/category aggregates etc.

    
## Change to Converter API

Converters now take in `(content, id)`, rather than a page object: `(page)`

View the new [Plugin Documentation](/usage/plugins/) for more info.


## New Widgets System

A new "widget" system has been implemented. Analytics, comments, and syntax highlighting
have been re-implemented as widgets.

View the new [Widget Documentation](/usage/widgets/) for full information.

## Overhauled Theme API.

Themes have a new, more sensical, directory structure and API as outlined in the new 
[Theming Documentation](/usage/documentation)

All old themes formats will now be **completely broken**, but it's for the best.

### SPECIAL NOTE

New themes make extensive use of mustache's **triple mustache syntax**. The triple mustache 
tells mustache to not escape special characters when rendering HTML:

{{#raw_code}}
  {{{ content }}}
{{/raw_code}}
    
## New Stylesheets Asset Manager

Themes now have a concept of a stylesheets manager which paves the way for asset bundling and post-processing.

## New Javascripts Asset Manager

Themes now have a concept of a javascripts manager for asset bundling and post-processing.

## Thanks!

Thanks for your support. I encourage everyone to give the [documentation](/usage) 
another read-through to get up to speed with all the new stuff.

