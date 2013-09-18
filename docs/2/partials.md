# Partials

The partials collection manages all partials in the system.

Partials are files which contain arbitrary layout code, usually HTML, that can be dynamically included into any page or layout.

Partials are very useful when used in conjunction with the templating language as they can provide standardized layouts for data-structures used throughout your blog.

## Create

partials are placed either in the partials folder at the base of your website, or preferably within your theme's partials folder for modularity:


{{# folder_tree }}
  partials
    posts_collate.html
  theme-twitter
    partials
      table.html
      gallery.html
      posts_list.html
      nested
        contact-me.html
    media
    stylesheets
{{/ folder_tree }}

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

# System Partials

Ruhoh ships with system-level partials as seen here: https://github.com/ruhoh/ruhoh.rb/tree/master/system/partials

**NOTE:**
Any blog-level or theme-level partial of the same name will override the system-level file.

## categories_list

Lists categories for a single page or pages-collection.

https://github.com/ruhoh/ruhoh.rb/blob/master/system/partials/categories_list.html

### Example

Given a site directory with the collection "essays":

{{# raw_code }}
<ul class="tag_box inline">
{{# essays.categories.all }}
  {{> categories_list }}
{{/ essays.categories.all }}
</ul>
{{/ raw_code }}


## pages_list

Lists pages from a given pages collection. Additionally the helper will automatically mark the list-entry and anchor-link HTML nodes with the class "active" in the case the current displayed (active) page is a member of the list.

https://github.com/ruhoh/ruhoh.rb/blob/master/system/partials/pages_list.html


### Example

Given a site directory with the collection "essays":

{{# raw_code }}
<ul>
{{# essays.all }}
  {{> pages_list }}
{{/ essays.all }}
</ul>
{{/ raw_code }}


## posts_collate

Collates pages from a given pages collection.

### Example

Given a site directory with the collection "essays":

{{# raw_code }}
{{# essays.collated }}
  {{> posts_collate }}
{{/ essays.collated }}
{{/ raw_code }}

Note the name "posts_collate" is an artifact of previous versions where only files contained in the "posts" collection where treated specially.



## posts_list

<span style="color:red">Deprecated</span>. Use **pages_list** instead.


## posts_summary

<span style="color:red">Deprecated</span>. Do not use this partial as it probably doesn't work.


## tags_list

Lists tags for a single page or pages-collection.

https://github.com/ruhoh/ruhoh.rb/blob/master/system/partials/tags_list.html

### Example

Given a site directory with the collection "essays":

{{# raw_code }}
<ul class="tag_box inline">
{{# essays.tags.all }}
  {{> tags_list }}
{{/ essays.tags.all }}
</ul>
{{/ raw_code }}
