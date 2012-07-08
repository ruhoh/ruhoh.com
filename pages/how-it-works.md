---
layout : page
---

## Introduction

Ruhoh is a static blog generator. Ruhoh's technical goal is to be useful to _all developers_.

To accomplish this goal, we employ 3 core design principles:

1. Ruhoh defines and adheres to the [Universal Blog API](/universal-blog-api) for static blogging.
1. Ruhoh relies on the cross-language [Mustache](http://mustache.github.com) templating system.
1. Ruhoh is built using a modular architecture.

The Universal Blog API allows parsing modules, regardless of language, to reliably parse a ruhoh blog.
Next we'll outline just _how_ that processing works.

## Design

Ruhoh's guiding design principle is **modularization**.   
A modular architecture assumes an inherent level of customization in that modules can easily be extended or replaced to suit varying use-cases.

Additionally, clear, well-purposed modules written in one language allow for a general guideline
when implementing the module in _another_ language.


## Application Flow

The following graphic illustrates the procedure implemented by the core modules to render your blog.

<img src="{{ urls.media }}/flow.png" />
Description:

1. Parsers extract the data from your blog directory for the Database to consume.
2. Next a page is modeled from the database and its corresponding file.
3. The templater and converter _act on_ the page object transforming it to its fully rendered view.
4. The page view can then be rendered in the browser via the Previewer or saved to disk using the Compiler.


## Modules

Ruhoh modules are mostly concerned with extracting or processing data from your blog. 
The table below outlines the core modules and their primary roles.

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
      <td>Parsers extract all data from your blog directory using the Universal Blog API.</td>
    </tr>
    
    <tr>
      <td class="module">Database</td>
      <td>The Database acts as the interface to the data returned from the parsers.  
      Other modules should use the Database for interacting with data.
      <br/>Note the database is nothing more than a class with accessors.
      </td>
    </tr>
    
    <tr>
      <td class="module">Page</td>
      <td>A Page processes and models the attributes expected from a Page object.   
      Since other modules act on Page objects, the Page can be thought of as the most significant
      data model in Ruhoh.</td>
    </tr>
    
    <tr>
      <td class="module">Templater</td>
      <td>Templaters act on a page to expand its view into its fully rendered state.
        The default Ruhoh Templater is <a href="http://mustache.github.com/">Mustache</a>.
      </td>
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
      <td>The compiler iterates through <em>every</em> published page, saving the rendered states to disk,  
      and porting over the current theme and media files.
      
      <br>The essence of static-blogging; you host the compiled version of your blog.
      </td>
    </tr>
    
    <tr>
      <td class="module">Client</td>
      <td>The command-line client exposes basic utility functions for automatically generating post and page files,   
      as well as new blog and theme scaffolding.
      <br>The client is the primary interface for your day-to-day workflow.
      </td>
    </tr>
    
  </tbody>
</table>

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


## Vision

Ruhoh's vision is to evolve the best and biggest technical blogging community in the world.

The design choices reflect this vision. At it's simplest, Ruhoh only does two things:

1. Parses a directory to build a Data API.
2. Uses the Data API to build web pages.

### Ruhoh's technical goals:

- Universal Blog API for static blogging.
- Modular, decoupled architecture.
- Language independence.
- Open and Free.

Accomplishing the technical goals will help accomplish the main vision.
The API can be free of any language dependency allowing users, regardless of language and/or platform,
to join and evolve a common community.

I can sure use your help. =D

Join me on [Ruhoh's GitHub Project Page](https://github.com/ruhoh/ruhoh.rb)
