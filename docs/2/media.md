# Media

`media` is a special collection that manages all media in the system.

Content-based media is placed in the media folder at the base of your website. Note all theme specific media should be placed into the theme's media folder:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>media</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em >[...my-media-file...]</em> &larr; blog-level media</li>
    </ul>
  </li>
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>twitter</em> &larr; (your theme)
    <ul>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>javascripts</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em>stylesheets</em></li>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>media</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-picture">.</span> <em>icons.jpg</em> &larr; theme-level media</li>
          <li><span class="ui-silk inline ui-silk-picture">.</span> <em>cool-pic.jpg</em></li>
          <li><span class="ui-silk inline ui-silk-picture">.</span> <em>sunset.jpg</em></li>
        </ul>
      </li>
    </ul> 
  </li>
</ul>

**Note that theme-level media will overload blog-level media, so be sure to define unique names are group media into logical folders.

## Example Usage


Organize your files any way you wish, then use the special `urls.media` template variable to refer the media folder:

{{#raw_code}}
<img src="{{urls.media}}/my-media-file.jpg">
{{/raw_code}}

Reference media in stylesheet files using relative paths `../media`

Using a dynamic url path is helpful when you want to switch to a CDN and or reorganize the way you handle your media.

**NOTE** This is now a non-standard legacy API. Using the media resources should work like all other resources, e.g. `media.url`. Expect this to change in the future.
