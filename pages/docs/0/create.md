---
title:
description:

layout: 0.3.0-docs
icon : icon-pencil
---


# Pages

## Create a Page

Page stubs can automatically be created using the Ruhoh command-line client.

    $ ruhoh page about.md

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>_pages</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>about.md</em> &larr;</li>
    </ul>
  </li>
</ul>
    
Create a page within a subdirectory:

    $ ruhoh page projects/android.md

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>_pages</em>
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
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>_pages</em>
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
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_posts</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>_pages</em>
    <ul>
      <span class="ui-silk inline ui-silk-folder">.</span> <em>projects</em>
      <ul>
        <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>android.html</em> &larr;</li>
      </ul>
    </ul>
  </li>
</ul>
    
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

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>untitled-1.md</em> &larr;</li>
    </ul>
  </li>
</ul>

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

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_media</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em class="template">[...my-media-file...]</em> &larr;</li>
    </ul>
  </li>
</ul>

Organize your files any way you wish, then use the special `paths.media` template variable to refer the media folder:

{{#raw_code}}
<img src="{{paths.media}}/my-media-file.jpg">
{{/raw_code}}
    
Using a dynamic path is helpful when you want to switch to a CDN and or reorganize the way you handle your media.
