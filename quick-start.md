---
layout: page
categories : usage
description : |
  Quickly get your blog installed and published via GitHub Pages.
  Then run your blog locally and create your first post and page.
---


## 1. Setting Up Your Local Ruhoh Environment

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

## 2. Create a Page

Create pages easily via rake task:

    $ rake page name="about.md"
    
Create a nested page:

    $ rake page name="pages/about.md"
    
Create a page with a "pretty" path:

    $ rake page name="pages/about"
    # this will create the file: ./pages/about/index.html
    
The rake task automatically creates a page file with properly formatted filename and YAML Front Matter 
as well as includes the Ruhoh Bootstrap "setup" file.


## 3. Create a Post

Create posts easily via rake task:

    $ rake post title="Hello World"

The rake task automatically creates a file with properly formatted filename and YAML Front Matter.
Make sure to specify your own title. By default, the date is the current date.

The rake task will never overwrite existing posts unless you tell it to.


## 4. Publish

After you've added posts or made changes to your theme or other files, simply commit them to your git repo and push the commits up to GitHub.

    $ git add .
    $ git commit -m "Add new content"
    $ git push origin master

A GitHub post-commit hook will automatically deploy your changes to your hosted blog. You will receive a success or failure notice for every commit you make to your blog.

## 5. Customize

Ruhoh can be used as-is as a basic blogging platform.  However there are plenty of ways to dig into deeper customization. 
The following outlines deeper Ruhoh customization techniques:

### Themes 

Ruhoh supports modular theming. Themes can co-exist and be enabled/disabled on demand.
Editing, configuring, and creating themes is docummented in the [Theming](/usage/jekyll-theming.html) section.

### Blog Configuration

Ruhoh and Ruhoh has a simple but powerful [Ruhoh Configuration System](/usage/blog-configuration.html). You can:

- Specify a custom permalink format for blog posts.
- Specify a commenting engine like disqus, intensedebate, livefyre, or custom.
- Specify an analytics engine like google, getclicky, or custom.


### Programming Interface

The API pages document main data-structures and code available for use in Ruhoh.
Consult these pages for how and where to use the data and code provided.