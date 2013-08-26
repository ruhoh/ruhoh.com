# Stylesheets

The stylesheets resources manages all stylesheets in the system.

Stylesheets are placed either in the stylesheets folder at the base of your website, or preferably within your theme's stylesheets folder for modularity:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>base.css</em> &larr; blog-level stylesheet</li>
    </ul>
  </li>
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em> &larr; (your theme)
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>media</em></li>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>theme-specific.css</em> &larr; theme-level stylesheet</li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>default.css</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>style.css</em></li>
        </ul>
      </li>
    </ul> 
  </li>
</ul>

**Note that theme-level stylesheets will overload blog-level stylesheets.

## Loading Stylesheets

Use `stylesheets.load` mustache block helper to load stylesheets:

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    <meta name="author" content="{{ data.author.name }}">
    {{# stylesheets.load }}
      base.css
      theme-specific.css
      default.css
      style.css
    {{/ stylesheets.load }}
  </head>
  ...
</html>
{{/raw_code}}

Each file should be separated by a newline and be in the order you want them to load.
Note the path is always relative to the stylesheets folder(s).

Loading stylesheets in this way allows us to better mange URLs as well as intelligently update file names based on any pre/post processing we may be doing as we'll see later.

## Manual Loading

Manually reference stylesheets in layouts using mustache: 

{{#raw_code}}
<link href="{{ urls.stylesheets }}/some-stylesheet.css" rel="stylesheet" type="text/css" media="all">
{{/raw_code}}

Note manually referencing stylesheets is discouraged because they will be unregistered with ruhoh's asset manager.


## URLs

Stylesheet urls are always name-spaced by `/assets/stylesheets/`

## Compiling

Ruhoh natively supports filename fingerprinting based on the stylesheets content. However, in order to update the stylesheet file references you must used the above dynamic-loading strategy.

### Fingerprinting Example:

Stylesheet original URL: **/assets/stylesheets/style.css**
Stylesheet compiled URL: **/assets/stylesheets/style-351c927c9099207bd7c9db36cc193954.css**

The reason for this is to always serve the latest stylesheet and not have to worry about browser-based file caching. However if the file does not change, the fingerprint will remain the same and the browser will benefit from the cached file. 
