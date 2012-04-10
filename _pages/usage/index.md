---
title: Start
layout: docs
icon : icon-star
---

# New Blog

The easiest way to start your ruhoh blog is to clone the ruhoh blog scaffold as outlined on the [homepage](/).
Do that know if you haven't already.

# Localhost

## Ruby 

Running your Ruhoh static blog in ruby is as easy as installing the Ruhoh gem.
The ruhoh gem depends on:

- **rack** - for web-server integration
- **directory\_watcher** - for watching files for updates in realtime.
- **mustache** - for templating.
- **maruku** - for Markdown parsing.

These gems will be installed along with Ruhoh if you don't already have them.

    $ gem install ruhoh
    
If you run into a problem you can [create a support issue](https://github.com/plusjade/ruhoh.rb/issues) using GitHub Issues.

Once the gem is installed your system should have an executable named `ruhoh`.
Use this to create your new blog scaffold: 

    $ ruhoh new myblog
    $ cd myblog
    $ rackup -p 9292

Your blog is now available at: [http://localhost:9292/](http://localhost:9292/)

The command-line tool will be part of your primary workflow:

    $ ruhoh help


<h2 style="border:0; text-align:center">Now you're ready to create some content!</h2>
<p style="text-align:center">
  <a href="/usage/create" class="btn btn-warning btn-large">Create Content &rarr;</a>
</p>  