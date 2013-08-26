
# Asset Pipeline

The asset pipeline allows you to write assets in languages like CoffeeScript, Sass, SCSS and LESS.
It also handles asset packaging and fingerprinting.

Ruhoh leverages [sprockets](https://github.com/sstephenson/sprockets) to manage the asset pipeline. If you are familiar with sprockets then using it in ruhoh is the same thing.

## Enable

The asset pipeline is NOT enabled by default. This is to keep dependencies to a minimum.

In `config.yml` enable asset pipeline:

    asset_pipeline:
      enable: true
    
**Important**

Be sure to load the sprockets gem and any necessary processing dependencies.
The easiest way is to use bundler and update your Gemfile:

    # Gemfile
    gem 'sprockets', '~> 2.8'
    gem 'sass'

Now run:

    $ bundle update

Reload your web-server for changes to take effect.

## Usage

Consult the [sprockets readme](https://github.com/sstephenson/sprockets#readme) for full documentation on how sprockets works.

## Example

In ruhoh, you'd load your stylesheets as normal:

{{#raw_code}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    <meta name="author" content="{{ data.author.name }}">
    {{# stylesheets.load }}
      application.css
    {{/ stylesheets.load }}
  </head>
  ...
</html>
{{/raw_code}}

Only this time we see we load only one file `application.css`

We can use [sprockets' directive processor](https://github.com/sstephenson/sprockets#the-directive-processor) to map our css dependencies for processing and packaging.

    # application.css
    
    //= require default
    //= require style

These files will dynamically load whenever application.css is called. Note also how there is no need to specify file extensions.

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>media</em></li>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>application.css</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>default.css.scss</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>style.css.scss</em></li>
        </ul>
      </li>
    </ul> 
  </li>
</ul>

We can see above that both `default.css.scss` and `style.css.scss` are using [SASS](http://sass-lang.com/).
Sprockets will automatically pre-process SASS and serve the resultant CSS in preview mode and for compiling.

## Compiling

If the asset pipeline is enabled ruhoh will automatically process and bundle all your assets as you've defined them in your file _directives_.

Ruhoh also supports filename finger-printing. As long as you use `stylesheets.load` and `javascripts.load` to load your assets, ruhoh will be able to update the filenames with the fingerprinted version.