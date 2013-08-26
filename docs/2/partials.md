# Partials

The partials resources manages all partials in the system.

Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included
into any page or layout.

Partials are very useful when used in conjunction with the templating language as they can provide 
standardized layouts for data-structures used throughout your blog.

## Create

partials are placed either in the partials folder at the base of your website, or preferably within your theme's partials folder for modularity:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>posts_collate.html</em> &larr; blog-level partial</li>
    </ul>
  </li>
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em> &larr; (your theme)
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>table.html</em> &larr; theme-level partial</li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>gallery.html</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>posts_list.html</em></li>
          <li>
            <span class="ui-silk inline ui-silk-folder">.</span> <em>nested</em>
            <ul>
              <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>contact-me.html</em></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>media</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em></li>
    </ul> 
  </li>
</ul>

**Note that theme-level partials will overload blog-level partials.


## Usage

Mustache supports partials natively using the "greater than" character:

{{#raw_code}}
  {{> categories_list }}
{{/raw_code}}

Nested partial:

{{#raw_code}}
  {{> nested/contact-me }}
{{/raw_code}}

**Note we omit the filename extension.

## System Level Partials

Ruhoh ships with system-level partials as seen here: https://github.com/ruhoh/ruhoh.rb/tree/master/system/partials

- categories_list.html
- pages_list.html
- posts_collate.html
- posts_list.html
- posts_summary.html
- tags_list.html

Any blog-level or theme-level partial of the same name will override the system-level file.

