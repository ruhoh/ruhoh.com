---
title:
description:

layout: docs-1
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

Every commit you push to your GitHub master will trigger an update on your ruhoh.com blog.

## 4. Viewing Update Logs

Ruhoh logs the result of each push it receives from your blog. Logs are available at `/log.txt` of your blog url.

ex: <a href='http://USERNAME.ruhoh.com/log.txt' id="blog_log_link" target="_blank">http://USERNAME.ruhoh.com/log.txt</a>

If your blog is not updating properly, and/or your logs are showing errors you need help with, please contact me:

{{> contact_list }}


# Self Hosting

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


# How to Compile

If you are self-hosting your blog you'll first need to compile it.
The compiling step expands all of your pages and templates to their final rendered state.

## Compile Your Blog

The ruhoh command-line client can be used to compile your blog:

    $ ruhoh compile
    
Your blog is generated and output into the compiled directory:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>compiled</em></li>
</ul>

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
