---
title:
description:

layout: docs
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

A file is created in the drafts folder of your blog, identified by its creation unix timestamp:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_drafts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>1332976976.md</em> &larr;</li>
    </ul>
  </li>
</ul>

## Preview Drafts

The Ruhoh Previewer recognizes a special page which lists links to all available post drafts:

[http://localhost:9292/_drafts](http://localhost:9292/_drafts)

Note that since drafts do not require any parameters, the permalinks for drafts can not be determined so they are not used.

Also, at this time, drafts do not show categories and tags.
This is because tags and categories for drafts do not get parsed into the "database" so
they are not query-able via the templating system.

## Publish Drafts

Publish a draft using the Ruhoh command-line client:

    ruhoh publish

Publishing a draft first validates the draft file, then moves it to the posts folder:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>2012-01-01-hello-world.md</em> &larr;</li>
    </ul>
  </li>
</ul>
    
The above command publishes the **last active** draft.
Internally, this is determined by the file's `ctime` or file modification (change) time.

The typical workflow would be to create a draft, edit it to your liking, then use `ruhoh publish`
to publish the draft you just finished editing.


If you need to publish a specific draft, just make sure to modify that draft in some way before calling publish.
An easy way to do so would be `touch`:

    touch _draft/1332976976.md

See here for info: <http://en.wikipedia.org/wiki/Touch_(Unix)>


## Add Tags

Add one or more tags to a post by including them into the post's YAML Front Matter.
This is the YAML block is at the top of the file:

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
