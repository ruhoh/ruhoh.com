---
layout: docs
---


# Development Setup

## Ruby 

Running your Ruhoh static blog in ruby is as easy as intalling the Ruhoh gem.
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


# Configuration

Naturally, Ruhoh works out of the box. But you can fine-tine some settings in `_config.yml`

## Set Permalink Format

    # _config.yml
    
    permalink: /:categories/:title



<table class="table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>:year</td>
      <td>Year from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:month</td>
      <td>Month from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:day</td>
      <td>Day from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:title</td>
      <td>Title from the post’s filename</td>
    </tr>
    
    <tr>
      <td>:categories</td>
      <td>The specified categories for this post. Jekyll automatically parses out double slashes in the URLs, so if no categories are present, it basically ignores this.</td>
    </tr>
    
    <tr>
      <td>:i_month</td>
      <td>Month from the post’s filename without leading zeros.</td>
    </tr>
    
    <tr>
      <td>:i_day</td>
      <td>Day from the post’s filename without leading zeros.</td>
    </tr>
    
  </tbody>  
</table>
        

### Examples

Given the post filename: `2009-04-29-green-milk-tea.md`   
with categories: `['california', 'food']`

<table class="table-striped table-bordered">
  <thead>
    <tr>
      <th>Permalink Format</th>
      <th>Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(default)</td>
      <td>/2009/04/29/green-milk-tea.html</td>
    </tr>
    
    <tr>
      <td>/:categories/:title</td>
      <td>/california/food/green-milk-tea/index.html</td>
    </tr>
    
    <tr>
      <td>/:month-:day-:year/:title.html</td>
      <td>/04-29-2009/green-milk-tea.html</td>
    </tr>
    
    <tr>
      <td>/blog/:year/:month/:day/:title</td>
      <td>/blog/2009/04/29/green-milk-tea/index.html</td>
    </tr>

  </tbody>  
</table>


## Set Theme
  
    # _config.yml
  
    theme: twitter


## Set Comments

Ruhoh provides widget codes for [Disqus](http://disqus.com), [Intense Debate](http://intensedebate.com), [livefyre](http://www.livefyre.com/), and [Facebook Comments](https://developers.facebook.com/docs/reference/plugins/comments/).

To enable commenting for your blog you will need to have setup an account with one of these providers.
In the `_config.yml` you should see a hash named `comments` as shown below:

    # Settings for comments helper
    # Set 'provider' to the comment provider you want to use.
    # Set 'provider' to false to turn commenting off globally.

    comments :
      provider : disqus
      disqus :
        short_name : ruhoh
      livefyre :
        site_id : 123
      intensedebate :
        account : 123abc
      facebook :
        appid : 123
        num_posts: 5
        width: 580
        colorscheme: light


### Choose a Provider

Set `provider` to the provider you intend to use. Make sure to specify your account credentials for the relevant provider within the hash named for _that_ provider.

In the example above, the **disqus** provider will be used and will be provided with **ruhoh** as the account **short\_name**.

### Custom Providers

To use a custom provider, set `provider: custom`, then create a partial in the default partials folder:

    ./_templates/partials/comments

This file will load wherever the theme has included its comments so you can inject your own widget code via this file.

### Disabling Comments

Set `provider: false` to disable comments globally. 

Disable comments for individual pages/posts by specifying `comments: false` in the page/post YAML Front Matter:

    ---
    layout: post
    categories : lessons
    comments : false
    tags : [yay]
    ---


## Set Analytics

Ruhoh provides analytics codes for [Google](http://google.com/analytics), and [GetClicky](http://getclicky.com).

To enable analytics for your blog you will need to have setup an account with one of these providers.
In the `_config.yml` you should see a hash named `analytics` as shown below:

    # Settings for analytics helper
    # Set 'provider' to the analytics provider you want to use.
    # Set 'provider' to false to turn analytics off globally.
    #        
    analytics :
      provider : google
      google : 
          tracking_id : 'UA-123-12'
      getclicky :
        site_id :


### Choose a Provider

Set `provider` to the provider you intend to use. Make sure to specify your account credentials for the relevant provider within the hash named for _that_ provider.

In the example above, the **google** provider will be used and will be provided with **UA-123-12** as the account **tracking\_id**.

### Custom Providers

To use a custom provider, set `provider: custom`, then create a partial in the default partials folder:

    ./_templates/partials/analytics

This file will load wherever the theme has included its analytics so you can inject your own widget code via this file.

### Disabling Analytics

Set `provider: false` to disable analytics globally. 

Disable analytics for individual pages/posts by specifying `analytics: false` in the post/page YAML Front Matter:

    ---
    layout: post
    categories : lessons
    analytics : false
    tags : [yay]
    ---

# Pages

## Create a Page

Page stubs can automatically be created using the Ruhoh command-line client.

    $ ruhoh page about.md

Create a page within a subdirectory:

    $ ruhoh page pages/about.md
    
Create a page with a "pretty" path:

    $ ruhoh page projects/android
    # this will create the file: ./projects/android/index.html

The client automatically creates a page file with properly formatted filename and YAML Front Matter.

# Posts

## Create a Post

Post stubs can automatically be created using the Ruhoh command-line client.

    $ ruhoh post 'Hello World'

The client automatically creates a file with properly formatted filename and YAML Front Matter.
By default, the date is the current date. You can additionally pass in a custom date:

    $ ruhoh post 'Hello World' 2012-10-10

The date must be in the format: `YYYY-MM-DD` else the client will give you a nice error.

The client will never overwrite existing posts unless you tell it to.

## Create a Draft

A post draft is useful for including a post into your blog that will preview in your development environment
but _will not_ be output via the Compiler. Additionally any meta-data on draft-posts are not added to the site-wide meta-data (e.g tag and category aggregates).

Create drafts as you would a post, but instead use the word 'draft':

    $ ruhoh draft 'Hello World' 2012-10-10

When you are ready to publish, just move the file from the `_drafts` folder to the `_posts` folder.

## Tags

## Categories


# Media


## Embed Code

Embed a gist.

## Highlight Code

Grr

## Insert Pictures and slides

Media folder ...



# Templating

## Layouts

Layout files are used to provide context around a page's content.

A page may specify a layout to render itself into. Additionally this layout may specify its own layout to render _itself_ into, thereby defining its sub-layout.

This makes it possible for a page to have a sub-layout and a master-layout.
Be aware that layouts will not be nested more than two levels deep.

## Create a layout

The Ruhoh command-line client can automatically create layouts for the active theme.

    $ ruhoh layout splash
    # this will create a file at: ./_templates/themes/[ACTIVE-THEME]/layouts/splash.html

Edit your layout as desired, then make sure to specify your new layout within the pages' YAML Front Matter:

    ---
    layout: splash
    categories : ruby
    ---

## Render Page Content in a Layout

Use the special template variable: `{ { content } }` to render a page's content within the given layout.

    ---
    layout: default
    ---
    <body>
      <div id="sidebar"> ... </div>
      <div id="main">
        { { content } }
      </div>
    </body>



## Partials

Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included
into any page or layout.

Partials are very useful when used in conjuction with the templating language as they can provide 
standardized layouts for data-structures used throughout your blog.

A good example would be defining a partial for an HTML list which you'd use to render a post's tags or categories.

## Create a Partial


All files contained in the default `partials` folder at : `_templates/partials` are known as _default\_partials_.
These partials should be theme independent.

Additionally you may also create _theme\_specific_ partials by creating files at:
`./_templates/themes/[ACTIVE-THEME]/partials/...`

Theme specific partials are useful when you want to include theme dependent HTML and/or css classes.

## Overload a Partial

Theme specific partials have a higher priority than default partials. That is they will overload default partials of the same name.


## Themes

A theme's primary role is to act as a namespace.
A theme is simply a collection of layouts, partials, and assets that those partials and layouts depend on (CSS, images, javascripts).

## Edit Your Theme

To edit your theme, just edit the layouts, partials, css, etc for the currently active theme.
Your active theme will be the theme specified in `_config.yml`.

The theme structure is as detailed below:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_templates</em><br>
    <ul class="template">
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template">partials</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>themes</em><br>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-folder">.</span> <em>css</em></li>
              <li><span class="ui-silk inline ui-silk-folder">.</span> <em>images</em></li>
              <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template">layouts</em><br>
                <ul>
                  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">default.html</em></li>
                  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">page.html</em></li>
                  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">post.html</em></li>
                </ul>
              </li>
              <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template">partials</em><br>
                <ul>
                  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">posts_collate</em></li>
                </ul>
              </li>
            </ul> 
          </li>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>another-theme</em></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

## Install a New Theme

To install a new theme just download the folder and place it in the `./_templates/themes` directory.
Then update your `_config.yml` to set the theme to this new theme name

    theme : new-theme


## Create a New Theme

The Ruhoh command-line client can automatically create scaffolding for building a new theme.

    $ ruhoh theme new-theme-name

Scaffolding for _new-theme-name_ will be available at : `./_templates/themes/new-theme-name`


# Data Objects


# Mustache API







## Publish

After you've added posts or made changes to your theme or other files, simply commit them to your git repo and push the commits up to GitHub.

    $ git add .
    $ git commit -m "Add new content"
    $ git push origin master

A GitHub post-commit hook will automatically deploy your changes to your hosted blog. You will receive a success or failure notice for every commit you make to your blog.

