---
title:
description:

layout: docs-0
icon : icon-adjust
---




# Themes

A theme's primary role is to act as a namespace.
A theme is simply a collection of layouts, partials, and assets that those partials and layouts depend on (CSS, images, javascripts).

## Edit Your Theme

To edit your theme, just edit the layouts, partials, css, etc for the currently active theme.
Your active theme will be the theme specified in `_config.yml`.

The theme structure is as detailed below:


{{# folder_tree }}
  _templates
    partials
    themes
      twitter
        css
        images
        layouts
          default.html
          page.html
          post.html
        partials
          posts_colalte
      another-theme
{{/ folder_tree }}


## Install New Theme

To install a new theme just download the folder and place it in the "themes" directory:

{{# folder_tree }}
  _templates
    themes
      [NEW-THEME-NAME]
{{/ folder_tree }}

Then update your `_config.yml` to set the theme to this new theme name

    theme : new-theme-name


## Create New Theme

The Ruhoh command-line client can automatically create scaffolding for building a new theme.

    $ ruhoh theme new-theme-name

Scaffolding for _new-theme-name_ will be available at:

{{# folder_tree }}
  _templates
    themes
      new-theme-name
{{/ folder_tree }}

# Layouts

Layout files are used to provide context around a page's content.

A page may specify a layout to render itself into. Additionally this layout may specify its own layout to render _itself_ into, thereby defining its sub-layout.

This makes it possible for a page to have a sub-layout and a master-layout.
Be aware that layouts will not be nested more than two levels deep.

## Create a layout

The Ruhoh command-line client can automatically create layouts for the active theme.

    $ ruhoh layout splash

The command will create a file at:

{{# folder_tree }}
  _templates
    themes
      [ACTIVE-THEME]
        layouts
          splash.html
{{/ folder_tree }}

Edit your layout as desired, then make sure to specify your new layout within the pages' YAML Front Matter:

    ---
    layout: splash
    categories : ruby
    ---

## Insert page content into layout

Use the special template variable: {{#raw_code}}{{content}}{{/raw_code}} ... to render a page's content within the given layout.

{{#raw_code}}
---
layout: default
---
<body>
  <div id="sidebar"> ... </div>
  <div id="main">
    {{content}}
  </div>
</body>
{{/raw_code}}

