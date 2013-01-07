---
title:
description:

layout: two-docs
icon :  icon-file
---

# Create

Drafts work with any registered "page-like" resource. 
Drafts work exactly the same as their modeled resource except they are never included into your compiled (production) website.
Conversely only published drafts are compiled.

### Create a Draft

Drafts may be created by using the `draft` command of the resource's command-line tool:

Create a page draft:

    $ ruhoh pages draft

Create a post draft:

    $ ruhoh posts draft

A file is created in the resource's folder of your blog, named `untitled-draft-n` where n is an iterated number:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>untitled-draft-1.md</em> &larr;</li>
    </ul>
  </li>
</ul>

Optionally pass in a title:

    $ ruhoh posts draft "The Greatest Draft Ever"

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>posts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>the-greatest-draft-ever.md</em> &larr;</li>
    </ul>
  </li>
</ul>

# Publish Drafts

To publish a draft, simply remove the **type** attribute from the draft's metadata.

    ---
    title: Hello World
    date: '2012-04-12'
    categories:
    tags: []

    type: draft # <---- this is the only draft signifier.
    ---

All drafts are identified _only_ by the "type" metadata attribute, so an empty type will be published.

### Working with Drafts in Preview Mode

**Drafts always display as published resources when in development mode**.
This is a feature, it allows you to see and work with all meta-data and permalink structures for the draft in question.

Uses ruhoh's built in dashboard to view all your pages: [http://localhost:9292/dash](http://localhost:9292/dash)

### Preview Your Blog in Production Mode

You can omit displaying drafts in preview mode by setting the ruhoh environment to "production".

In config.ru:

    require 'rack'
    require 'ruhoh'
    run Ruhoh::Program.preview(:env => 'production')

Make sure to kill current preview session, then restart it:
  
    $ rackup -p 9292


# Draft Filenames

Since draft files are automatically named untitled-1, untitled-2, and so forth,
it quickly becomes annoying to have to manually update the filename to the draft's eventual title.

Use the ruhoh command line client to convert all untitled-n files to their corresponding titles if set:

    $ ruhoh pages titleize
    ...
    $ ruhoh posts titleize
    
This command looks for any resource file beginning with `untitled`, then attempts to rename it, but only if a title has been set.
