---
title:
description:
icon : icon-upload
---

> **NOTE:** post.ruhoh.com will not support ruhoh v2+

# Rsync

<span class="label">since 2.5</span>

[rsync](http://linux.die.net/man/1/rsync) is a terminal utility used to sync files from one computer to another. If you have ssh access to a remote server such as a linode VPS or AWS instance you can use rsync!

Configure rsync via the publish.json or publish.yml file:

{{# folder_tree }}
  ruhoh-site
    publish.json
{{/ folder_tree }}


    {
        "rsync" : {
            "user" : "root",
            "host" : "12.345.67.891",
            "destination" : "/home/web/www/ruhoh.com"
        }
    }


Now you can publish via rsync:

    $ cd ruhoh-site
    $ bundle exec ruhoh publish rsync

This command does three things:

1. Compile site
2. rsync compiled folder
3. Cleanup compiled folder

The full rsync command is:

    $ rsync compiled/. -avz --delete --exclude .git root@12.345.67.891:/home/web/www/ruhoh.com

If you need to run a customized rsync command you can specify it via the special "command" attribute in publish.json:

    {
        "rsync" : {
            "command" : "rsync compiled/. -avz --delete --exclude .git root@12.345.67.891:/home/web/www/ruhoh.com"
        }
    }


# GitHub Pages

> **EXPERIMENTAL: I'm still working out all the edge-cases for this but you can help me test it!**

[GitHub Pages](http://pages.github.com/) Hosting Benefits: 

- GitHub integration.
- Free Hosting for unlimited websites.
- Free custom domain mapping for all websites.


## Install Plugin

Add the following ruby file to your plugins path:

{{# folder_tree }}
  ruhoh-site
    plugins
      github.rb
{{/ folder_tree }}

[https://gist.github.com/plusjade/6667109](https://gist.github.com/plusjade/6667109)

{{{ gist.6667109 }}}


## Setup

Your website needs to be a git repository hosted on GitHub. Ensure this is the case by verifying your origin remote:

    $ git remote -v

NOTE if you previously cloned the ruhoh blog scaffold you'll see your remote as: 

    origin git@github.com:ruhoh/blog.git

You need to remove this:

    $ git remote rm origin

Then add in a new origin that points to a repository you created on GitHub:

    $ git remote add origin git@github.com:username/my-website.git

Ensure this is a valid remote from a repository you created on GitHub or this won't work!

The next steps ensure your git repository is setup properly:

## Host at the root domain

http://username.github.io

### NOTE

If you plan to host multiple websites or use custom domain mapping it's easier to follow the "host multiple websites" instructions below.

This is only for users who prefer the domain: http://username.github.io and won't map it to anything else.
Hosting at the root without a custom domain becomes problematic when hosting multiple websites because they share the same path and may collide.

### SETUP

1. Your repository *_must_* be named username.github.io and it must be your username.
1. Your ruhoh source branch *_must_* be 'gh-pages'
1. Your master branch *_must_* be an orphan or non-existant (ruhoh will do this for you)

Assuming the above criteria, when executing the command:

    $ bundle exec ruhoh publish github

ruhoh will compile _from_ gh-pages _into_ the master branch and commit those changes to GitHub.

Give GitHub some time to recognize your deploy, then check your website at: http://username.github.io

### IMPORTANT

Your ruhoh source is in the gh-pages branch so you must work from there.
The master branch should be left untouched so ruhoh can compile and commit to it automatically.

If this is weird to you, please use "host multiple websites" option =)

(GitHub calls this [User/Organization pages](https://help.github.com/articles/user-organization-and-project-pages) hosting.)


## Host multiple websites

- http://username.github.io/my-project-name
- http://username.github.io/my-blog


### SETUP

1. Your repository _*must*_ be named something sensible using word characters like "my-blog"
1. Your ruhoh source branch *_must_* be 'master'
1. Your gh-pages branch *_must_* be an orphan or non-existant (ruhoh will do this for you)

Assuming the above criteria, when executing the command:

    $ bundle exec ruhoh publish github

ruhoh will compile _from_ master _into_ the gh-pages branch and commit those changes to GitHub.

Give GitHub some time to recognize your deploy, then check your website at: http://username.github.io/my-project-name

### IMPORTANT

Your ruhoh source is in the master branch so you must work from there.
The gh-pages branch should be left untouched so ruhoh can compile and commit to it automatically.

(GitHub calls this [Project pages](https://help.github.com/articles/user-organization-and-project-pages) hosting.)

## Custom Domains

> NOTE: This is not supported as of v2.5. Ruhoh fails to port CNAME over correctly. The fix will be in 2.6.

### Required

You must follow [Setting up a custom domain with pages](https://help.github.com/articles/setting-up-a-custom-domain-with-pages) completely.


The CNAME file can be added to your `_root` folder as is and ruhoh will compile it over correctly:

{{# folder_tree }}
  _root
    CNAME
{{/ folder_tree }}

In CNAME file:

    mycustomdomain.com

Finally, you have to tell ruhoh you have a production url to use:

    #config.yml

    production_url: 'http://mycustomdomain.com'


### NOTE

Ruhoh compiles differently when using a production url on GitHub pages so make sure to set this in the config.



# Amazon s3

<span class="label">on the roadmap =/</span>

[Amazon s3](http://aws.amazon.com/s3/)



# heroku

<span class="label">on the roadmap =/</span>

[heroku](http://heroku.com/)

# rack

<span class="label">on the roadmap =/</span>


# Compile

If you are self-hosting your blog you'll first need to compile it.
The compiling step expands all of your pages and templates to their final rendered state.

## Compile Your Blog

The ruhoh command-line client can be used to compile your blog:

    $ ruhoh compile
    
Your blog is generated and output into the compiled directory:


{{# folder_tree }}
  compiled
{{/ folder_tree }}


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
