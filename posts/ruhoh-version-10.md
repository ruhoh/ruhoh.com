---
title: Ruhoh Version 1.0
date: '2012-08-23'
description:
categories: releases
---

[history.json](https://github.com/ruhoh/ruhoh.rb/blob/master/history.json) reference.

## How to Upgrade

Fetch version 1.0 from rubygems:

    $ gem install ruhoh

If you're using bundler you can:

    $ bundle update ruhoh


## API changes:

### New Ruhoh.setup

Ruhoh.setup is now broken up into modular setup routines.
Unless you run your own custom Ruhoh environment you shouldn't need to update anything.

    Ruhoh.setup
    
is now

    Ruhoh.setup
    Ruhoh.config.env = 'production'
    Ruhoh.setup_paths
    Ruhoh.setup_urls
    Ruhoh.setup_plugins

This allows you to execute custom code before, after, or around each step, as well as pragmatically override configuration settings.

### Themes now port over ALL static assets.

Previously only assets registered via `theme.yml` would get ported to production.
This caused the problem of not including asset dependencies linked to within parent assets.

Now ALL files are ported over.

To exclude files from production, use the "exclude" hash in `theme.yml`

    # theme.yml
    
    {
      "exclude" : [
        "layouts/*",
        "stylesheets/_sass/*",
        '*README.md',
        '*sample.html'
      ],

      "stylesheets" : {
        ...
      },

      "javascripts" : {
        ...
      }
    }
    
The exclude hash supports a super-simple wildcard "*".
The wildcard can only be added to the start or end of the path.
If at the start it will match all files _ending_ with the given string.

      # match all files with the extension: .sass
      
      "*.sass"

If it at the end it will match all all files _starting_ with the given string

    # match all files in the directory: sass

    "sass/*"


### Support for base_path

    # config.yml
    
    base_path: "/path/to/my/blog"

Setting a base\_path intelligently prepends **all** urls in the system with the given base\_path.
This allows you to host your blog in a subdirectory of a given website.

To host your site on this domain: http://myuniversity.edu/staff/me/~/blog

    # config.yml
    
    base_path: "/staff/me/~/blog"

done!
    
### Absolute links to asset files.

    # in theme.yml

    {
      "stylesheets" : {
        "default" : [
          "bootstrap.min.css",
          "http://s3.amazonaws.com/mysite/style.css"
        ]
      },

      "javascripts" : {
        "default" : [
          "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js",
          "libs/ping.js"
        ]
      }

    }
    
Absolute paths to assets now work as expected.


### urls.theme

{{#raw_code}}
  &#123;&#123; urls.theme &#125;&#125;
{{/raw_code}}

provides the url to the current theme's folder. This provides an easy way to link
to arbitrary files packaged within your theme.

### JSON in your views
  
{{#raw_code}}
  &#123;&#123;&#123; site?to&#95;json &#125;&#125;&#125;
{{/raw_code}}

?to&#95;json can be done to any raw data-structure.