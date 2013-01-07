---
title: Edge
layout: docs-2
icon : icon-star
---

# Introduction to Resources

## Namespace
A resource primarily acts as a namespace both at the system level and within the user's blog.

The main idea is that a resource acts as a single, modular integration point into the ruhoh system.
Everything that defines a resource is self-contained within the resource's namespace.

## Cascade

All resources have built in cascading of the three cascade levels:

- **System** (ruhoh gem)
- **Blog** (user blog)
- **Theme** (installed theme)

The resource namespaces work on all three levels and automatically overwrite one another as it moves down the stack.

## Mappings

Every resource has implicit mappings to files, resources, configuration etc, that should be
used in conjunction with the given resource. Mappings come in a few flavors:

- **Resource namespace**  
  By default, the name of the resource (downcased) is used as the resource namespace.
- **Glob expression**  
  Within the namespace, you a free to define a more granular glob expression to find files.
- **Url endpoint**  
  The URL endpoint is the _base-url_ in the case that the resource will serve files at a given URL

### Public Namespace

Once a namespace is registered, files within that namespace become mapped to that resource.
The glob expression will be used to fine resources for the resource namespace:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>posts </em> &larr; "posts" resource namespace
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>about.md</em> &larr; a resource for "posts".</li>
    </ul>
  </li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em></li>
</ul>

    
### Config

A mapping to user configuration is provided using the resources's namespace within config.yml

    #config.yml
    
    posts: #<-- configuration namespace
      permalink: blah
      limit: blah

## Resource Modeling

A singular resource is typically mapped to individual files within your blog, relative to the resource's namespace:

<ul class="folder-tree">
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>pages</em></li>
  <li>
    <span class="ui-silk inline ui-silk-folder">.</span> <em>posts </em> &larr; "posts" resource namespace
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>about.md</em> &larr; a resource for "posts".</li>
    </ul>
  </li>
  <li><span class="ui-silk inline ui-silk-folder">.</span> <em>partials</em></li>
</ul>

## Pointers

Ruhoh identifies each file resource using a **pointer**.

A pointer is a hash specifying the id, realpath, and resource name.
A pointer uniquely identifies a resource across the system.

    # pointer
    {
      "id" => "about.md", 
      "resource" => "posts",
      "realpath" => "/path/to/blog/posts/about.md"
    } 

You can see in most default cases, the realpath can be inferred from the id, resource, and path to the blog.
The pointers are helpful because you can pass around only the id within the context of the resource and it will 
know where to find the singular resource.


# Resources API

## Data

Data still largely works the same as before. A dictionary is generated from all the resources
and saved into the database. The following classes are responsible for providing data to the database.

### Collection

The Collection class is responsible for generating the entire resource collection in order to be stored in the database.
The Collection class has access to its config and file resources to intelligently generate data based on these assets.
Since Collection is just a ruby class, generating data for resources may be arbitrary.


### Model

The Model class helps the collection class model individual resources as they are found and generated.

## Views

View classes expose all mustache methods accessible in your templates, relative to the given resource.


### CollectionView

The mustache view provides all templating logic for the given resources entire collection.

### ModelView

The mustache view provides all templating logic for for a singular instance of a given resource.

## Behavior

### Previewer

The previewer class provides a rack endpoint for the given resource.

### Watcher

The watcher class provides update logic when a given resource changes.

### Compiler

The compiler class runs compiling logic for the given resource collection.

### Client

The client class provides automatic name-spaced console methods for the given resource.



# Database Improvements


## Lazy Loading

All resources are lazy-loaded providing automatic dependency resolution.
There is no longer any need to manually update the database. 

When compiling, the database (should) cache all data so a dependency is only loaded once 
and re-used for subsequent requests. (This is not true yet but we'll get there.)

## Singular Resource Retrieval

A resource can now be fetched individually using its pointer. 
The database automatically resolves all of its dependencies and returns the generated resource.

One major implication is the ability to compile a single resource.
Note however this is not a silver bullet; most pages are going to call data that needs to loop through
the entire pages/posts set anyway.


# Mustache Views

Resources may define their own name-spaced view classes resulting in a much cleaner API.

As seen below the resource defines its own top-level namespace. Arbitrary view methods are called via dot notation:
{{#raw_code}}
{{#posts.tags.all}}
  {{> tags_list }}
{{/posts.tags.all}}
{{/raw_code}}
    
Internally, ruhoh 2.0 simply delegates method calls to the resource's collection view class.


# Compiling

I am still working on getting the compiling API a lot smoother.
Compiling will be pretty straightforward. There will be support for for single-resource compile.

The problem I am facing is how to make the compiler extensible for one-off extra tasks (like it works now).
On one hand a plugin should define everything it needs to work, including how to compile its resources.
On the other hand, having to create a plugin to do a one off compile task is inelegant. 
And of course there probably shouldn't be two integration points for compiling.


# Un-resolved

The following are things I am still working on.

- Sane public plugin extensions
- What to do with widget functionality?
- converter (haven't addressed these)
- nested resources (themes)  
  The theme plugin is essentially a set of nested resources:
    - layouts
    - stylesheets
    - javascripts
- asset pipeline is not well-defined anymore.  
  Need a cohesive implementation
  
  

# Thanks!







