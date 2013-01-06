---
title:
description:

layout: edge-docs
icon : icon-upload
---

**NOTE:** post.ruhoh.com does NOT yet support ruhoh 2.0.

# Compiling

If you are self-hosting your blog you'll first need to compile it.
The compiling step expands all of your pages and templates to their final rendered state.

## Compile Your Blog

The ruhoh command-line client can be used to compile your blog:

    $ ruhoh compile
    
Your blog is generated and output into the compiled directory:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>compiled</em></li>
</ul>

### Compile to custom directory

Pass a relative or absolute path to the directory you want to compile to:

    $ ruhoh compile 'my/cool/directory'


## Preview Compiled Blog


### Python

Use python to preview your compiled static blog:

    $ cd compiled
    $ python -m SimpleHTTPServer
    

<http://localhost:8000/>

(credit to [linuxjournal.com](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python))

### PHP 5.4.x

Oh boy the new PHP!

    $ cd compiled
    $ php -S localhost:8000

<http://localhost:8000/>

(credit to [PHP Docs](http://php.net/manual/en/features.commandline.webserver.php))

### Ruby

[Jason](https://github.com/jasonm23) recommended the **white_castle** gem for quickly setting up a static asset server in ruby.

    $ gem install white_castle
    $ cd compiled
    $ white_castle .

<http://localhost:3000/>

Thanks [Jason](https://github.com/jasonm23) and [@nodanaonlyzuul](https://github.com/nodanaonlyzuul/white_castle)


# Hosting

To host your blog yourself, you'll simply generate the compiled version on a server 
and point a vanilla web-server to the directory to serve the static files.

## Current Options

In the interest of shipping early and often I have shamefully neglected the Hosting part of the documentation.

The good news is I know you developers are quite highly self-sufficient.
I'm rushing to add in stunningly easy deploy methods, but until then you can read
the [Jekyll Custom Deploy Options](https://github.com/mojombo/jekyll/wiki/Deployment)
as they will work exactly the same way. Just change `_site` for `compiled`

### On the RoadMap

- Amazon s3
- GitHub.com
- Dropbox.com  
- heroku.com
- rack

