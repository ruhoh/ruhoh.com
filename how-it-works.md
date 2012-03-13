---
layout : page
---

## Introduction
Ruhoh defines a simple, standardized interface specification for creating static blogs.

Defining your static blog based on the Ruhoh definition allows your blog
to be processed with any and all Ruhoh-based parsers, compilers, plugins, themes, and publishing tools.

## Design

Ruhoh's guiding design principle is **modularization**.   
Compiling a static blog is popular amongst hackers because we appreciate control and customization.   
A modular architecture assumes an inherent level of customization in that modules can easily be extended or replaced to suit varying use-cases.


## Modules

Modules in Ruhoh are mostly concerned with extracting or processing data from your blog. The table below outlines core Ruhoh modules and their primary roles.

<table class="table-striped table-bordered">
  <thead>
    <tr>
      <th>Module</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td class="module">Parsers</td>
      <td>Parsers extract all data from your blog directory.</td>
    </tr>
    
    <tr>
      <td class="module">Database</td>
      <td>The Database acts as the interface to the data returned from the parsers.  
      Other modules should use the Database for interacting with data.

      </td>
    </tr>
    
    <tr>
      <td class="module">Page</td>
      <td>A Page processes and models the attributes expected from a Page object.   
      Since other modules act on Page objects, the Page can be thought of as the primary
      data model in Ruhoh.</td>
    </tr>
    
    <tr>
      <td class="module">Templater</td>
      <td>Templaters act on a page to expand its view into its fully rendered state.</td>
    </tr>
    
    <tr>
      <td class="module">Converter</td>
      <td>Converters act on a page to parse its content body relative to a Markup language like Markdown.</td>
    </tr>

    <tr>
      <td class="module">Previewer</td>
      <td>The Previewer pragmatically loads a page based on URL and serves its rendered state to a web-server.  
      This acts as the primary development environment.</td>
    </tr>
        
    <tr>
      <td class="module">Compiler</td>
      <td>The compiler iterates through _every_ page, saving the rendered states to disk,  
      and porting over the current theme and media files.</td>
    </tr>
    
    <tr>
      <td class="module">Client</td>
      <td>The command-line client exposes basic utility functions for automatically generating post and page files,   
      as well as new blog and theme scaffolding.</td>
    </tr>
    
  </tbody>
</table>


## Workflow

This graphic illustrates how these modules interface with one another.

<img src="/_media/flow.png" />
Description:

1. Parsers extract the data from your blog directory for the Database to consume.
2. Next a page is modeled from the database and its corresponding file.
3. The templater and converter _act on_ the page object transforming it to its fully rendered view.
4. The page view can then be rendered in the browser via the Previewer or saved to disk using the Compiler.

  
## Data

In Ruhoh everything is data. Most modules we've outlined are concerned only with extracting or processing data.
We can simplify the concept of data into three Global data types:

<table class="table-striped table-bordered">
  <thead>
    <tr>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td class="module">
        Page Data
        <br><br>
        <ul>
          <li>Categories</li>
          <li>Tags</li>
          <li>Permalink</li>
          <li>Date</li>
          <li>Author</li>
          <li>...</li>
        </ul>
      </td>
      <td>
        <p>
          The primary data structure in Ruhoh is the <strong>Page</strong>.
          Ultimately, your blog is just a set of ordered/organized pages. 
        </p>
        
        <p>
        Ruhoh has only one concept of a Page object, which is any file expecting to be processed.
        Strictly speaking, blog Posts in Ruhoh are just special types of pages.
        So any blog post your create, plus any normal pages like "about" or "homepage" are all considered Pages.
        </p>
        <p>
          A Page contains requisite meta-data as outlined to the left, plus the page's main content body.
        </p>
      </td>
    </tr>
    
    <tr>
      <td class="module">
        Template Data
        <br><br>
        <ul>
          <li>Layouts</li>
          <li>Partials</li>
        </ul>
      </td>
      <td>
        <p>Templates act on Pages, expanding their full view to the final rendered output.</p>
        <p>
        All pages may reference a layout of which it intends to render itself into.
        layouts may additionally reference another layout for which to render _itself_ into.
        This allows pages to have one sub-template and one master template.
        </p>
        <p>
          Partials are blocks of arbitrary layout content, contained in files, that can be dynamically included into
          any page or layout.
        </p>
        <p>Partials are especially useful when used in conjuction with a Templating Language.</p>
        
      </td>
    </tr>
    
    <tr>
      <td class="module">Config Data</td>
      <td>
        <p>
        Configuration data is contained \_config.yml and outlines how your blog should be interpreted.
        </p>
        <p>
        This is useful for specifying permalink format, comment engine provider, analytics, etc.
        You will also specify custom compiling and publishing parameters here.
        </p>
      </td>
    </tr>
    
  </tbody>  
</table>

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

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em class="config">_config.yml</em></li>
  <li><span class="ui-silk inline ui-silk-page-white-database">.</span> <em>_site.yml</em></li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_compiled</em></li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>_media</em><br>
    <ul>
      <li><span class="ui-silk inline ui-silk-picture">.</span> <em>my-hockey-stick-graph.jpg</em></li>
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
  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">index.md</em></li>
  <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em class="page">about.md</em></li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em class="page">random-folder</em></li>
</ul>
