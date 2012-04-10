---
title:
description:

layout: docs
icon : icon-upload
---


# Publish to ruhoh.com

Use the ruhoh.com free hosting service for the quickest way to publish your blog online. ruhoh.com automatically compiles your static blog
with each update you push to your repository. The following instructions are duplicated here from the homepage:

<form action='#' class="form-inline" id="generate_code">
  <input id='github_username' type='text' placeholder="GitHub Username" style="width:200px;"/>
  <button class='btn' style="width:200px;">Personalize Install Code</button>
</form>

## 1. Setup Your GitHub Repository

<table class="github-install table-condensed">
  <tbody>

    <tr>
      <td>1. Login to GitHub:</td>
      <td><a href='https://github.com/' class="btn" target="_blank">Go to Github Dashboard</a></td>
    </tr>

    <tr>
      <td>2. Create repository:</td>
      <td class="form-inline"><input id="repo_name" type="text" value="USERNAME.ruhoh.com" style="width:175px" /></td>
    </tr>

    <tr>
      <td>3. Add webhook: <a href="http://help.github.com/post-receive-hooks/" target="_blank" style="font-size:0.9em">[how-to?]</a>
      </td>
      <td class="form-inline"><input type="text" value="http://post.ruhoh.com" style="width:175px" /></td>
    </tr>

  </tbody>
</table>

## 2. Push Your New Blog

Clone the ruhoh blog scaffolding then push it to your repo:

<pre id="install-code-wrapper" style="overflow:auto; white-space:pre" class="no-highlight">
<code><span class="kwd">git</span> clone git://github.com/ruhoh/blog.git <span class="typ">USERNAME</span>.ruhoh.com
<span class="kwd">cd</span> <span class="typ">USERNAME</span>.ruhoh.com
<span class="kwd">git</span> remote set-url origin git@github.com:<span class="typ">USERNAME</span>/<span class="typ">USERNAME</span>.ruhoh.com.git
<span class="kwd">git</span> push origin master</code>
</pre>

Your blog is now available at: <a href='http://USERNAME.ruhoh.com' id="blog_link" target="_blank">http://USERNAME.ruhoh.com</a>

## 3. Publishing Updates

Every commit you push to your GitHub master will trigger an update on ruhoh.com

# Self Hosting

To host your blog yourself, you'll simply generate the compiled version on a server 
and point a vanilla web-server to the directory to serve the static files.

## Current Options

In the interest of shipping early and often I have shamefully neglected the Hosting part of the documentation.

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


# How to Compile

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

