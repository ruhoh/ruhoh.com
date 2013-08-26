# Javascripts

The javascripts resources manages all javascripts in the system.

Javascripts are placed either in the javascripts folder at the base of your website, or preferably within your theme's javascripts folder for modularity:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>base.js</em> &larr; blog-level javascript</li>
    </ul>
  </li>
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em> &larr; (your theme)
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>theme-specific.js</em> &larr; theme-level javascript</li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>default.js</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>app.js</em></li>
        </ul>
      </li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>media</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em></li>
    </ul> 
  </li>
</ul>

**Note that theme-level javascripts will overload blog-level javascripts.

## Loading Javascripts

Use `javascripts.load` mustache block helper to load javascripts:

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    <meta name="author" content="{{ data.author.name }}">
    {{# javascripts.load }}
      base.js
      default.js
      app.js
      theme-specific.js
    {{/ javascripts.load }}
  </head>
  ...
</html>
{{/raw_code}}

Each file should be separated by a newline and be in the order you want them to load.
Note the path is always relative to the javascripts folder(s).

Loading javascripts in this way allows us to better mange URLs as well as intelligently update file names based on any pre/post processing we may be doing as we'll see later.

## Manual Loading

Manually reference javascripts in layouts using mustache: 

{{#raw_code}}
<script src="{{ urls.javascripts }}/some-javascript.js"></script>
{{/raw_code}}

Note manually referencing javascripts is discouraged because they will be unregistered with ruhoh's asset manager.


## URLs

Javascript urls are always name-spaced by `/assets/javascripts/`

## Compiling

Ruhoh natively supports filename fingerprinting based on the javascripts content. However, in order to update the javascript file references you must used the above dynamic-loading strategy.

### Fingerprinting Example:

Javascript original URL: **/assets/javascripts/app.js**
Javascript compiled URL: **/assets/javascripts/app-351c927c9099207bd7c9db36cc193954.js**

The reason for this is to always serve the latest javascript and not have to worry about browser-based file caching. However if the file does not change, the fingerprint will remain the same and the browser will benefit from the cached file. 
