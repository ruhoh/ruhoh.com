# Google Prettify

Google Prettify is implemented via the widgets API. Have a look at the [widgets documentation](/docs/2/widgets) if you haven't already.

## Enable

Syntax highlighting is enabled by default using [Google Prettify](http://google-code-prettify.googlecode.com/svn/trunk/README.html). Content specified in `<pre></pre>` blocks will be automatically highlighted. Prettify tries to automatically detect the language and highlight the syntax appropriately.

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em> &larr;
  </li>
</ul>

    widgets :
      google_prettify :
        use : default
        linenums : true


### Choose a Provider

The widget specifies different snippets for the different engines. Set `use` to the provider you intend to use. Make sure to specify your account credentials for the relevant provider.

In the example above, the **default** provider will be used and will be provided with **true** as for the setting **linenums**.

## Disable

### Global Disable

Set `enable: false` to disable analytics globally. 

    # config.yml

    widgets :
      google_prettify :
        enable : false


### Per-Page Disable

Disable analytics for individual pages by specifying `widgets.google_prettify.enable: false` in the page YAML meta-data:

    ---
    layout: post
    categories : lessons
    tags : [yay]
    widgets :
      google_prettify :
        enable : false
    ---

Internally, the value of "enable" will be cast to a String. So you must specify exactly the value `false` or `"false"` for this to work.


## Presentation

Ruhoh's default "twitter" theme comes with all four of Google Prettify's [user-submitted themes](http://google-code-prettify.googlecode.com/svn/trunk/styles/index.html) as well as  the code-highlighting theme packaged with [Twitter Bootstrap](http://twitter.github.com/bootstrap/base-css.html#code)

The stylesheet is loaded as any other stylesheet would be:

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{ page.title }} | ruhoh universal static blog generator</title>
  {{# stylesheets.load }}
    bootstrap.min.css
    font-awesome.min.css
    style.css
    google_prettify/sunburst-custom.css
  {{/ stylesheets.load }}

  ...
{{/ raw_code}}

You can edit an existing stylesheet or create your own, just remember to update the stylesheet link.
