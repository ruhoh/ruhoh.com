---
title:
description:

layout: docs
icon : icon-upload
---


# Compiling

When you are ready to publish your blog you'll first need to compile it.
The compiling step expands all of your pages and templates to their final rendered state.

## Compile Your Blog

The ruhoh command-line client can be used to compile your blog:

    ruhoh compile
    
Your blog is generated and output into the \_compiled directory:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_compiled</em></li>
</ul>

## Preview Compiled Blog


### Python

Use python to preview your compiled static blog:

    cd _compiled
    python -m SimpleHTTPServer
    

<http://localhost:8000/>

(credit to [linuxjournal.com](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python))

### PHP 5.4.x

Oh boy the new PHP!

    cd _compiled
    php -S localhost:8000

<http://localhost:8000/>

(credit to [PHP Docs](http://php.net/manual/en/features.commandline.webserver.php))

### Ruby
    
Would you believe how ridiculously hard it is to serve static files using rack?
`Rack::Static` won't serve documentRoot index.html files. 

If you insist, you can create your config.ru in \_compiled with the following content:

    require 'rack'
    use Rack::Lint
    use Rack::ShowExceptions
    use Rack::Static, {:urls => ['/'], :index => 'index.html' }
    run Proc.new { }

This will work for everything except url paths that should resolve to the documentRoot index.html file.
ex: `http://localhost:9292/projects/` should show `http://localhost:9292/projects/index.html`
but it appears to be a huge pain the ass to do it =/ If you know how to get this to work
it will be much appreciated!


# Hosting

Ruhoh is made to be hosted as a static blog. That is you take the compiled version of your blog and 
point a vanilla web-server to the directory which directly serves the static asset files.

## More

In the interest of shipping early and often I have shamefully neglected
the Hosting part of the documentation.

The good news is I know you developers are quite highly self-sufficient.
I'm rushing to add in stunningly easy deploy methods, but until then you can read
the [Jekyll Custom Deploy Options](https://github.com/mojombo/jekyll/wiki/Deployment)
as they will work exactly the same way. Just change `_site` for `_compiled`

### On the RoadMap

- Amazon s3
- GitHub.com
- Dropbox.com  
- heroku.com
- rack

