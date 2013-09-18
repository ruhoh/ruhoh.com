---
title:
description:

layout: docs-0
icon : icon-pencil
---


# Pages

## Create a Page

Page stubs can automatically be created using the Ruhoh command-line client.

    $ ruhoh page about.md


{{# folder_tree }}
  _posts
  _pages
    about.md
{{/ folder_tree }}


Create a page within a subdirectory:

    $ ruhoh page projects/android.md


{{# folder_tree }}
  _posts
  _pages
    projects
      android.md
{{/ folder_tree }}


Create a page with a "pretty" path:

    $ ruhoh page projects/android


{{# folder_tree }}
  _posts
  _pages
    projects
      andoid
        index.md
{{/ folder_tree }}

### Custom File Extensions.


By default, Ruhoh uses the `.md` markdown extension.
The extension can be customized by passing a custom extension via `--ext`:

    $ ruhoh page projects/android --ext .html
    

{{# folder_tree }}
  _posts
  _pages
    projects
      android.html
{{/ folder_tree }}


# Posts

**All posts must start out as drafts first.**

Drafts require no parameters so as to encourage a "write first" workflow.
Drafts and their meta-data are never compiled as part of your finished static website.
Conversely only published drafts are compiled.

## Create a Draft

To create a draft, execute the following command in the working directory of your blog:

    $ ruhoh draft

<p><span class="label label-info">CHANGED in v0.2.0</span></p>

A file is created in the posts folder of your blog, named `untitled-n` where n is a just an iterated number:

{{# folder_tree }}
  _posts
    untitled-1.md
{{/ folder_tree }}


## Preview Drafts

<p><span class="label label-info">CHANGED in v0.2.0</span></p>

The Ruhoh Previewer comes with a dashboard located at:

[http://localhost:9292/dash](http://localhost:9292/dash)

Draft pages work exactly like published pages _when developing locally_.
Permalinks, dates, categories, and tags on all drafts get processed as if they were posts.

## Publish Drafts

<p><span class="label label-info">CHANGED in v0.2.0</span></p>

To publish a draft, simply remove the **type** attribute from the draft's metadata.

    ---
    title: Hello World
    date: '2012-04-12'
    categories:
    tags: []

    layout: post
    type: draft
    ---

All drafts are identified _only_ by the "type" metadata attribute, so an empty type will be published.

<p><span class="label label-important">Important!</span></p>

In ruhoh 0.2.0+ dates specified in the filename are **optional**, therefore to publish a draft, 
the draft file _must_ specify a valid YYY-MM-DD date in it's YAML meta-data.



## Update Draft Filenames

Since draft files are automatically named untitled-1, untitled-2, and so forth,
it quickly becomes annoying to have to manually update the filename to the draft's eventual title.

Use the ruhoh command line client to convert all untitled-n files to their corresponding post titles if set:

    $ ruhoh titleize

This command looks for any post file beginning with `untitled`, then attempts to rename it, but only if a post title has been set.

## Add Tags

Add one or more tags to a post by including them into the post's YAML Front Matter.
This is the YAML block at the top of the file:

    ---
    layout: post
    title: a nice title
    tags: javascript
    ---
    
To add multiple tags, use an Array:

    ---
    layout: post
    title: a nice title
    tags: [javascript, tutorials, expert]
    ---

or

    ---
    layout: post
    title: a nice title
    tags: 
      - javascript
      - tutorials
      - expert
    ---
    
## Add Categories

Add one or more categories to a post by including them into the post's YAML Front Matter.
This is the YAML block is at the top of the file:

    ---
    layout: post
    title: a nice title
    categories: code
    ---
   
A category can be multiple levels deep:

    categories: "code/android/games"
    
This defines **one** category named `code/android/games`.

Also note that `code`, and `code/android` **will not exist** unless you explicitly define them as categories themselves.


To place the post in multiple categories you'll need to pass in an Array:

    ---
    layout: post
    title: a nice title
    categories: ['code/android/games', 'game-downloads']
    ---

or

    ---
    layout: post
    title: a nice title
    categories :
      - 'code/android/games'
      - 'game-downloads'
    ---


# Media

## Embed Code

<span class="label label-important">Not Implemented</span>


A templating mechanism for embedding a Gist as well as embedding blocks of code specified in a remote file.
This will work similar to partials but be optimized for code.

## Insert Images

The media folder is used as a convenient place to store your blog's media:


{{# folder_tree }}
  _media
    my-media-file.jpg
{{/ folder_tree }}

Organize your files any way you wish, then use the special `paths.media` template variable to refer the media folder:

{{#raw_code}}
<img src="{{paths.media}}/my-media-file.jpg">
{{/raw_code}}
    
Using a dynamic path is helpful when you want to switch to a CDN and or reorganize the way you handle your media.
