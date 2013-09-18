# Media

`media` is a special collection that manages all media in the system.

Content-based media is placed in the media folder at the base of your website. Note all theme specific media should be placed into the theme's media folder:


{{# folder_tree }}
  media
    my-media-file.jpg
  theme-twitter
    javascripts
    stylesheets
    media
      icons.jpg
      cool-pic.jpg
      sunset.jpg
{{/ folder_tree }}

**Note that theme-level media will overload blog-level media, so be sure to define unique names are group media into logical folders.

## Example Usage


Organize your files any way you wish, then use the special `urls.media` template variable to refer the media folder:

{{#raw_code}}
<img src="{{urls.media}}/my-media-file.jpg">
{{/raw_code}}

Reference media in stylesheet files using relative paths `../media`

Using a dynamic url path is helpful when you want to switch to a CDN and or reorganize the way you handle your media.

**NOTE** This is now a non-standard legacy API. Using the media resources should work like all other resources, e.g. `media.url`. Expect this to change in the future.
