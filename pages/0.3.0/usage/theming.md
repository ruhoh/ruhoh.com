---
title:
description:

layout: 0.3.0-docs
icon : icon-adjust
---




# Themes

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

## Install New Theme

To install a new theme just download the folder and place it in the "themes" directory:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_templates</em><br>
    <ul class="template">
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>themes</em><br>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>[...NEW-THEME-NAME...]</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

Then update your `_config.yml` to set the theme to this new theme name

    theme : new-theme-name


## Create New Theme

The Ruhoh command-line client can automatically create scaffolding for building a new theme.

    $ ruhoh theme new-theme-name

Scaffolding for _new-theme-name_ will be available at:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_templates</em><br>
    <ul class="template">
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>themes</em><br>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>new-theme-name</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>


# Layouts

Layout files are used to provide context around a page's content.

A page may specify a layout to render itself into. Additionally this layout may specify its own layout to render _itself_ into, thereby defining its sub-layout.

This makes it possible for a page to have a sub-layout and a master-layout.
Be aware that layouts will not be nested more than two levels deep.

## Create a layout

The Ruhoh command-line client can automatically create layouts for the active theme.

    $ ruhoh layout splash

The command will create a file at:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_templates</em><br>
    <ul class="template">
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>themes</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-folder">.</span> <em>[ACTIVE-THEME]</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-folder">.</span> <em>layouts</em>
                <ul>
                  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>splash.html</em> &larr;</li>
                </ul>
              </li>
            </ul>  
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

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

