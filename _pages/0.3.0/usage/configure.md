---
title:
description:

layout: 0.3.0-docs
icon : icon-cog
---


# Permalinks

Set the permalink format in the `_config.yml` file:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>_config.yml</em> &larr;</li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_posts</em></li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>...</em></li>
</ul>

    permalink: /:categories/:title


## Permalink Variables

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
      <td>The specified categories for this post. If more than one category is set, only the first one is used. If no categories exist, the URL omits this parameter.</td>
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
        

## Permalink Examples

Given the post filename: `2009-04-29-green-milk-tea.md`   
with categories: `['california/food', 'dairy']`

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


# Comments

Ruhoh provides widget codes for [Disqus](http://disqus.com), [Intense Debate](http://intensedebate.com), [livefyre](http://www.livefyre.com/), and [Facebook Comments](https://developers.facebook.com/docs/reference/plugins/comments/).

## Add Comments

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

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_templates</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>custom_comments</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

This file will load wherever the theme has included its comments so you can inject your own widget code via this file.

## Disable Comments

Set `provider: false` to disable comments globally. 

Disable comments for individual pages/posts by specifying `comments: false` in the page/post YAML Front Matter:

    ---
    layout: post
    categories : lessons
    comments : false
    tags : [yay]
    ---

Internally, the value of "comments" will be cast to a String. So you must specify exactly the value `false` or `"false"` for this to work.


# Analytics

Ruhoh provides analytics codes for [Google](http://google.com/analytics), and [GetClicky](http://getclicky.com).

## Add Analytics

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

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_templates</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>custom_analytics</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

This file will load wherever the theme has included its analytics so you can inject your own widget code via this file.

## Disable Analytics

Set `provider: false` to disable analytics globally. 

Disable analytics for individual pages/posts by specifying `analytics: false` in the post/page YAML Front Matter:

    ---
    layout: post
    categories : lessons
    analytics : false
    tags : [yay]
    ---

Internally, the value of "analytics" will be cast to a String. So you must specify exactly the value `false` or `"false"` for this to work.



# Syntax Highlighting


## Enable Highlighting

Syntax highlighting is enabled by default using [Google Prettify](http://google-code-prettify.googlecode.com/svn/trunk/README.html).
Content specified in `<pre></pre>` blocks will be automatically highlighted.
Prettify tries to automatically detect the language and highlight the syntax appropriately. 

### Settings

In the `_config.yml` you should see a hash named `syntax` as shown below:


    syntax :
      provider : google_prettify
      google_prettify : 
          theme: sunburst
          linenums : true

In the example above, the **google_prettify** provider will be used and will be provided with **sunburst** as the theme and **linenums** enabled.

## Edit Styling Rules

All styling rules are maintained in their own theme-specific CSS file.
These files are name-spaced by the specific syntax highlighting provider you've chosen:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_templates</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>syntax</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>google_prettify</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>default.css</em></li>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>desert.css</em></li>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>sons-of-obsidian.css</em></li>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>sunburst.css</em></li>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>twitter-bootstrap.css</em> &larr; (default)</li>
            </ul>  
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

Ruhoh blogs come with all four of Google Prettify's [user-submitted themes](http://google-code-prettify.googlecode.com/svn/trunk/styles/index.html) as well as 
the code-highlighting theme packaged with [Twitter Bootstrap](http://twitter.github.com/bootstrap/base-css.html#code)

Add more themes or edit existing ones, then remember to specify your theme choice in `_config.yml`:

    syntax :
      provider : google_prettify
      google_prettify : 
          theme: sunburst # specify theme name here with .css extension omitted.
          linenums : true

## Custom Providers

The initial version of Ruhoh supports only Google Prettify because it's the easiest
to get running. It is also accessible to the most users due to its client-side runtime.

[Pygments](http://pygments.org/), in contrast is likely much more powerful but requires server-side dependencies 
that are beyond the scope of Ruhoh beta.  More comprehensive code highlighting options will be available over time.


## Disable Highlighting

Most likely you'd disable Prettify if you intend to use your own highlighting system, whether server-side or 
via another Javascript library.

Set `provider: false` to disable syntax highlighting globally. 

    syntax :
      provider : false
      google_prettify : 
          theme: sunburst
          linenums : true

