---
title: Ruhoh Version 0.2.0
date: '2012-05-04'
description:
categories: releases

layout: post
---

Ruhoh v0.2.0 is just released! Most notably there is a more intuitive draft/publish workflow
enabled by a more comprehensive /dash panel for managing your files.

[history.txt](https://github.com/ruhoh/ruhoh.rb/blob/master/history.txt) reference.


## API changes:

#### Dates in post filenames are now optional.
If the filename does not have a date it will be required in the meta-data.
This makes draft/post creation much easier and eliminates potential meta-data discrepancies.

#### Remove \_draft folder.
Drafts are now simply a 'type' of post.  
This allows drafts to be treated exactly the same as posts when in development.

#### Remove publish and un-publish commands from client.
Publishing is now done by removing the 'type' meta attribute on the draft file.

#### Add titleize method to client.
Titleize renames draft filenames to their titles if set.
This solves the problem of all your draft files being named "untitled-n"

#### /\_draft panel is now /dash with updated UI.
The /dash is much more robust and acts as a place to manage all your files.

#### (change) rackup configuration is now through Ruhoh::Program.preview.
This makes maintaining updates easier, and paves the way for the 0.3.0 which
will support plugins through an event+hook system.


## How to Upgrade

Fetch version 0.2.0 from rubygems:

    $ gem install ruhoh --version 0.2.0

### In your Blog Directory:

Add `type: draft` to all existing draft files:

        ---
        title: Hello world
        date: '2012-04-12'
        
        layout: post
        type: draft
        ---

Move all draft files from `_drafts` to `_posts` folder.

The draft folder is no longer supported so you can remove it.

### \_config.yml

Update `RuhohSpec` in `_config.yml` to 0.2:

      ---
      RuhohSpec: '0.2'
      
      ---


### config.ru

Lastly change `config.ru` to look like this:

    require 'rack'
    require 'ruhoh'
    run Ruhoh::Program.preview


### Workflow:

**Create** a draft by using either:

    $ ruhoh draft
    
or

    $ ruhoh post
    

**Publish** files by setting the title, date and removing the `type: draft` attribute:

    ---
    title: 'Hello world'
    date: '2012-04-12'
    
    layout: post
    type: draft     # <---------- remove this to publish the file.
    ---

**Update** draft filenames to their appropriate titles:

    $ ruhoh titleize

**Manage** all your files at <http://localhost:9292/dash>


Please let me know in the comments, twitter, or email what you think of the new additions. Thanks!
