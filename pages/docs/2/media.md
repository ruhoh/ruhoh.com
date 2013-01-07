
## Media

## Embed Code

<span class="label label-important">Not Implemented</span>


A templating mechanism for embedding a Gist as well as embedding blocks of code specified in a remote file.
This will work similar to partials but be optimized for code.

## Insert Images

The media folder is used as a convenient place to store your blog's media:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">media</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em class="template">[...my-media-file...]</em> &larr;</li>
    </ul>
  </li>
</ul>

Organize your files any way you wish, then use the special `urls.media` template variable to refer the media folder:

{{#raw_code}}
<img src="{{urls.media}}/my-media-file.jpg">
{{/raw_code}}


Using a dynamic url path is helpful when you want to switch to a CDN and or reorganize the way you handle your media.
