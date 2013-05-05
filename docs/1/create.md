---
title:
description:

layout: docs-1
icon : icon-pencil
---


# Pages

## Create a Page

Page stubs can automatically be created using the Ruhoh command-line client.

    $ ruhoh page about.md

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>about.md</em> &larr;</li>
    </ul>
  </li>
</ul>
    
Create a page within a subdirectory:

    $ ruhoh page projects/android.md

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em>
    <ul>
      <span class="ui-silk inline ui-silk-folder">.</span> <em>projects</em>
      <ul>
        <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>android.md</em> &larr;</li>
      </ul>
    </ul>
  </li>
</ul>
    
Create a page with a "pretty" path:

    $ ruhoh page projects/android

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em>
    <ul>
      <span class="ui-silk inline ui-silk-folder">.</span> <em>projects</em>
      <ul>
        <li>
          <span class="ui-silk inline ui-silk-folder">.</span> <em>android</em>
          <ul>
            <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>index.md</em> &larr;</li>
          </ul>
        </li>
      </ul>
    </ul>
  </li>
</ul>

### Custom File Extensions.


By default, Ruhoh uses the `.md` markdown extension.
The extension can be customized by passing a custom extension via `--ext`:

    $ ruhoh page projects/android --ext .html
    
<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em>
    <ul>
      <span class="ui-silk inline ui-silk-folder">.</span> <em>projects</em>
      <ul>
        <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>android.html</em> &larr;</li>
      </ul>
    </ul>
  </li>
</ul>
    
# Posts

Posts require no parameters so as to encourage a "write first" workflow.

## Create a Post

To create a post, execute the following command in the working directory of your blog:

    $ ruhoh post

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>untitled-post.md</em> &larr;</li>
    </ul>
  </li>
</ul>

You can optionally pass in a title:

    $ ruhoh post "The Greatest Post Ever"

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>the-greatest-post-ever.md</em> &larr;</li>
    </ul>
  </li>
</ul>

Post files receive default meta-data, specifically, the date is always set the current date:

    ---
    date: '2012-04-12'
    categories:
    tags: []
    ---

Posts always use the _implicit_ "post.html" layout if no layout is specified.
Feel free to manually specify a layout on a per-post basis:

    ---
    date: '2012-04-12'
    categories:
    tags: []
    
    layout: 'super-post' # <------ specify your own layout
    ---


# Drafts

Drafts work exactly the same as posts except they are never included into your compiled (production) website.
Conversely only published drafts are compiled.

## Create a Draft

To create a draft, execute the following command in the working directory of your blog:

    $ ruhoh draft

A file is created in the posts folder of your blog, named `untitled-draft-n` where n is an iterated number:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>untitled-draft-1.md</em> &larr;</li>
    </ul>
  </li>
</ul>

Optionally pass in a title:

    $ ruhoh draft "The Greatest Draft Ever"

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>the-greatest-draft-ever.md</em> &larr;</li>
    </ul>
  </li>
</ul>

## Publish Drafts

To publish a draft, simply remove the **type** attribute from the draft's metadata.

    ---
    title: Hello World
    date: '2012-04-12'
    categories:
    tags: []

    layout: post
    type: draft # <---- this is the only draft signifier.
    ---

All drafts are identified _only_ by the "type" metadata attribute, so an empty type will be published.


### A Note About Dates

<p><span class="label label-important">Important!</span></p>

In ruhoh 0.2.0+ dates specified in the filename are **optional**, therefore to publish a draft, 
the draft file _must_ specify a valid YYY-MM-DD date in it's YAML meta-data.



## Working with Drafts in Preview Mode

**Drafts always display as posts when in development mode**.  
This is a feature, it allows you to see and work with all meta-data and permalink structures for the draft in question.

Uses ruhoh's built in dashboard to view all your pages: [http://localhost:9292/dash](http://localhost:9292/dash)

## Preview Your Blog in Production Mode

You can omit displaying drafts in preview mode by setting the ruhoh environment to "production".

In config.ru:

    require 'rack'
    require 'ruhoh'
    run Ruhoh::Program.preview(:env => 'production')

Make sure to kill current preview session, then restart it:
  
    $ rackup -p 9292


## Update Draft Filenames

Since draft files are automatically named untitled-1, untitled-2, and so forth,
it quickly becomes annoying to have to manually update the filename to the draft's eventual title.

Use the ruhoh command line client to convert all untitled-n files to their corresponding post titles if set:

    $ ruhoh titleize

This command looks for any post file beginning with `untitled`, then attempts to rename it, but only if a post title has been set.


# Categories
   
## Add Categories

Add one or more categories to a post by including them into the post's YAML meta-data.
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


# Tags
  
## Add Tags

Add one or more tags to a post by including them into the post's YAML meta-data.
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


# Media

## Embed Code

<span class="label label-important">Not Implemented</span>


A templating mechanism for embedding a Gist as well as embedding blocks of code specified in a remote file.
This will work similar to partials but be optimized for code.

## Insert Images

The media folder is used as a convenient place to store your blog's media:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">media</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em class="template">[...my-media-file...]</em> &larr;</li>
    </ul>
  </li>
</ul>

Organize your files any way you wish, then use the special `urls.media` template variable to refer the media folder:

{{#raw_code}}
<img src="{{urls.media}}/my-media-file.jpg">
{{/raw_code}}
    
Using a dynamic url path is helpful when you want to switch to a CDN and or reorganize the way you handle your media.
