---
title: Start
layout: docs
icon : icon-star
---


# Development Setup

Your ruhoh blog is meant to be developed and previewed on your local machine.
Currently the ruhoh beta only supports ruby.

## Ruby 

Install the ruhoh gem to parse your blog using ruby. The ruhoh gem depends on:

- **rack** - for web-server integration
- **directory\_watcher** - for watching files for updates in realtime.
- **mustache** - for templating.
- **maruku** - for Markdown parsing.

These gems will be installed along with Ruhoh if you don't already have them.

    $ gem install ruhoh
    
If you run into a problem you can [create a support issue](https://github.com/plusjade/ruhoh.rb/issues) using GitHub Issues.

# Command-Line

Once the gem is installed your system should have an executable named `ruhoh`.

The command-line tool will be part of your primary workflow. View the help to
see the available commands:

    $ ruhoh help

# Previewing Your Blog

If you've followed the setup on the [homepage](/) you should already have your blog scaffold installed locally:

    cd USERNAME.ruhoh.com
    rackup -p 9292

You can clone a new blog scaffold at any time using ruhoh:

    $ ruhoh new myblog
    $ cd myblog
    $ rackup -p 9292

Using the `rackup` command spawns a web-server that pragmatically loads your blog's pages in real-time.
This means as you update files, the updates are reflected immediately.

View your blog at: [http://localhost:9292/](http://localhost:9292/)

<h2 style="border:0; text-align:center">Now you're ready to create some content!</h2>
<p style="text-align:center">
  <a href="/usage/create" class="btn btn-warning btn-large">Create Content &rarr;</a>
</p>  