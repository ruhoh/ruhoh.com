
# QuickStart

**ATTENTION**

> This tutorial will get you started very quickly to make a "hello world" site but it assumes you have a basic understanding of **git**, **ruby** and **bundler**.
If you are not a rubyist, you get stuck, a command fails, or you just want to learn about what's going on, please read [Installation](/docs/2/installation) first.

## Initialize

First we'll git clone some ruby-specific [initialization files](https://github.com/ruhoh/init-ruby) needed to run ruhoh.

We'll clone the files into our site directory named "ruhoh-site":

    $ git clone git@github.com:ruhoh/init-ruby.git ruhoh-site

Since this git repository is meant only for initialization, I recommended deleting `.git` so you can reinitialize the directory as your own repository:

    $ cd ruhoh-site
    $ rm -r .git
    $ git init

**NOTE** If you don't want to use git you can download the [.zip version](https://github.com/ruhoh/init-ruby/archive/master.zip)

Ensure you are still in the "ruhoh-site" directory, then install the bundle:

    $ bundle install

Once the bundle is complete you can run rackup to initialize a local web-server:

    $ bundle exec rackup -p 9292


**SUCCESS!** 
You are now running a ruhoh enabled website previewable locally at: [http://localhost:9292](http://localhost:9292)

You won't see any content because "ruhoh-site" doesn't contain any =)


## Add Content

To add an index page we'll use the "_root" collection and add index.md:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>ruhoh-site</em>
    <ul>
      <li class="endpoint">
        <span class="ui-silk inline ui-silk-folder">.</span> <em>_root</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>index.md</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>


We can write some sample markdown inside index.md:


    # Hello World

    > A profound quote.

    ### Fruits I like

    - apples
    - oranges
    - watermelons
    - tomatoes
    - avocados


Reload the page at [http://localhost:9292](http://localhost:9292) and you should see the updated content =D.

### That's it!

Ruhoh tries to be as close to a normal website workflow as possible so no other dependencies or configurations are required.

The left menu lists all ruhoh's **collection modelers** which provide powerful functionality if you want it. Notably, you can continue to [Creating Pages](/docs/2/pages) in ruhoh.


## Add Theme

**RECOMMENDED**

Themes are a great way to learn how to build pages, use layouts, javascripts, stylesheets, and the mustache syntax. Additionally they give you default structure, styling and page stubs to quickly get a basic site up.

Starting out, you should install a theme so you have files to play with and test things out. You can easily remove the theme later by deleting the theme folder.

Finally, every theme-level file can be overwritten by providing the same file within your site directory "ruhoh-site".

### How To


We'll use git again to clone the default ruhoh theme into our site in the folder "theme-bootstrap-2"

Ensure you are still in the root of the "ruhoh-site" directory then run:

    $ git clone git@github.com:ruhoh/theme-bootstrap-2.git theme-bootstrap-2

Next we have to update `config.yml` to tell ruhoh to model this folder with the collection modeler "theme":

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>ruhoh-site</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>config.yml</em> &larr;</li>
    </ul>
  </li>
</ul>

Add the following content to config.yml:

    "theme-bootstrap-2" :
      "use" : "theme"


The rack previewer must be restarted in order for this to take affect.
Kill the running process by pressing <kbd>ctrl</kbd>+<kbd>c</kbd> then run:

    $ bundle exec rackup -p 9292


Reload the page at [http://localhost:9292](http://localhost:9292) and you should see your new theme along with more default files!

[More about Themes](/docs/2/themes)

## Next Steps

Hopefully you are excited to start creating content!

- [Read the Conceptual Overview if you haven't already](/docs/2/).
- Understand the different collection modelers outlined to the right.
- [Learn how layouts, templates, Views, and mustache work together](/docs/2/views).
- [Learn how to publish](/docs/2/publish).
- [Learn how to add Plugins](/docs/2/plugins).


<!-- 

## Upgrading

[Upgrade Reference](http://ruhoh.com/docs/2/upgrading)

It's best to first get a fresh blog installed and running locally via bundler as outlined.
Next you'll want to compare your existing ruhoh 1.x and 2.0.alpha blog to the newest blog scaffold.

Once you've converted your existing blog, try running it with ruhoh 2.1 by copying the [Gemfile][] into your existing blog and running it with bundler as outlined above.

# Hello World

 -->
