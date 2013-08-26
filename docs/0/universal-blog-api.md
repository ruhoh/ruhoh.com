---
title: Universal Blog API
description:

layout: splash
---

## The Big Deal

Ruhoh is _a big deal_ because it attempts to define a Universal Blog API.

Do you like [JSON](http://www.json.org/)?

Everybody likes JSON because it's universal. You get concise data transporting across all languages!

Isn't that such a Good&#8482; thing?

In Ruhoh, we define an Interface Specification - as long as your blog adheres to the specification, 
it can be consumed by any Ruhoh compatible parser.

In the year **2000** there will be parsers in every language and every hacker, young and old, Mac/Windows/Linux 
will come together in a blaze of glory! 

**United** - **Free** - **Open**


## Interface Specification

Ruhoh parses your blog for data based on a standardized _interface specification_. 

First, your blog is assumed to be wholly contained in one directory. This directory acts as the primary interface. 
Secondly, files contained in this directory have three vectors of specificity:

<dl class="dl-horizontal">
  <dt>File Position</dt>
  <dd>
    Files in specific folders necessarily define them as a certain data type.
    For example files in the "layouts" directory define the file as a layout and will error if not properly formatted as such.
  </dd>
  <dt>File Name</dt>
  <dd>
    Secondly, a file's name may define it's role. 
    For example the main configuration file must be in a specific position (the root) <em>and</em> it 
    must be named exactly _config.yml. 
  </dd>
  <dt>File Contents</dt>
  <dd>
    Lastly, a file's content <em>must</em> match it's implicit data-type as defined by its position and name. 
    This means files in the posts folder must contain content formatted <em>as a post</em>,
    and files in the layouts folder must have a valid layout as its content.
  </dd>
</dl>

## Directory Structure

<ul class="folder-key">
  <li><strong>Key:</strong></li>
  <li class="config">Config Data</li>
  <li class="post">Posts Data</li>
  <li class="template">Template Data</li>
  <li class="page">Page Data</li>
</ul>

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em class="config">_config.yml</em></li>
  <li><span class="ui-silk inline ui-silk-page-white-database">.</span> <em>_site.yml</em></li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_compiled</em></li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_drafts</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>20012-10-10-my-draft.md</em></li>
    </ul>
  </li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_media</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em>my-hockey-stick-graph.jpg</em></li>
    </ul>
  </li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em class="page">_pages</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">index.md</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">about.md</em></li>
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="page">random-folder</em></li>
    </ul>
  </li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="post">_posts</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="post">20011-10-25-open-source-is-good.md</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="post">20011-04-26-hello-world.md</em></li>
    </ul>
  </li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template-light">_templates</em><br>
    <ul class="template">
      <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="template">partials</em><br>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">pages_list</em></li>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="template">pages_collate</em></li>
        </ul>
      </li>
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

<table class="table-striped table-bordered">
  <thead>
    <tr>
      <th>File/Folder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>_config.yml</td>
      <td>
        The config file is written in YAML and contains site-wide configuration options such as active theme, comments-provider, analytics providers, etc.
      </td>
    </tr>
    
    <tr>
      <td>_site.yml</td>
      <td>
        The site YAML file is used to specify site-wide _data_ that can be used throughout your pages and templates.
        A good example is defining a navigation array that the templater can use to create your primary navigation bar.
        
      </td>
    </tr>
    
    <tr>
      <td>_compiled</td>
      <td>
        The compiled folder is the default location the Compiler will output pages into.
        In other words, when you run the Compiler, your fully rendered blog will output to this folder.
      </td>
    </tr>
    
    <tr>
      <td>_drafts</td>
      <td>
        All files contained in the drafts folder will be processed as drafts.
      </td>
    </tr>
    
    <tr>
      <td>_media</td>
      <td>
        The media folder should hold static media assets such as images, videos, pdfs, downloads, etc.
        Note theme-specific assets should NOT exist in the media folder, but rather in the themes folder.
      </td>
    </tr>
    
    <tr>
      <td>_pages</td>
      <td>
        All files contained in the pages folder will be processed as pages.
      </td>
    </tr>

    <tr>
      <td>_posts</td>
      <td>
        All files contained in the posts folder will be processed as posts.
      </td>
    </tr>
    
    <tr>
      <td>_templates</td>
      <td>
        The templates folder holds partials, layouts, and theme-specific assets such as CSS, images, javascript, etc.
        Templates consists of partials, layouts, and assets, but you'll note they are packaged together as "themes".
        Themes in this context serve primarily as a **namespace**.
      </td>
    </tr>

  </tbody>
</table>
