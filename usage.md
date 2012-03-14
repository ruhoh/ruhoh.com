---
layout: docs
---


# Development Setup

## Ruby 

### Install Ruhoh

[Install Ruhoh-Bootsrap](/index.html#start-now) if you haven't already.

  
In order to preview your blog locally you'll need to install the Ruhoh ruby gem. Note gem dependencies will also be installed.
You don't have to run a local version but it helps if you want to preview your content before publishing.

    $ gem install ruhoh

If you run into a problem you can [create a support issue](https://github.com/plusjade/jekyll-bootstrap/issues) using GitHub Issues.

Once the gem is installed you can navigate to your Ruhoh directory.
If you've followed the homepage instructions this will be: USERNAME.github.com.
Once in the directory you'll run jekyll with server support:

    $ cd USERNAME.github.com 
    $ rackup -p 9292
    # remember to change USERNAME to your GitHub username.

Your blog is now available at: [http://localhost:4000/](http://localhost:4000/).


# Main Configuration

## Set Permalink Format

## Set Theme


## Create a Page

Create pages easily via rake task:

    $ rake page name="about.md"
    
Create a nested page:

    $ rake page name="pages/about.md"
    
Create a page with a "pretty" path:

    $ rake page name="pages/about"
    # this will create the file: ./pages/about/index.html
    
The rake task automatically creates a page file with properly formatted filename and YAML Front Matter 
as well as includes the Ruhoh Bootstrap "setup" file.


## Create a Post

Create posts easily via rake task:

    $ rake post title="Hello World"

The rake task automatically creates a file with properly formatted filename and YAML Front Matter.
Make sure to specify your own title. By default, the date is the current date.

The rake task will never overwrite existing posts unless you tell it to.


## Publish

After you've added posts or made changes to your theme or other files, simply commit them to your git repo and push the commits up to GitHub.

    $ git add .
    $ git commit -m "Add new content"
    $ git push origin master

A GitHub post-commit hook will automatically deploy your changes to your hosted blog. You will receive a success or failure notice for every commit you make to your blog.

