---
title: 2.x Docs
layout: docs-2
icon : icon-star
---


# Introducing Ruhoh 2.0

Ruhoh 2.0 has been completely re-implemented. The API has changed but is manageably close to ruhoh 1.x.
The following is a quick outline of core philosophy changes followed by an upgrade strategy.

## Plumbing

I realize I'm obsessed with programming for programming's sake -- I like to make plumbing.

Ruhoh should be the plumbing to get developers/creators publishing. 
I want to take care of the details in a way that lets creators create.

> "Hey if I have this pipe and this joint, it would be pretty cool if I can make this fitting go here...
and add this pipe to this... yeah, yeah that works!"

**Just use Wordpress!**  
Creators already create trillions of Wordpress plugins, so why not just use Wordpress? I don't know, I just don't feel _motivated_ to write Wordpress plugins. I don't want to deal with it.

Yes, yes, _another_ **trivial** static blog engine. =P

Only it is not trivial _to me_. 

Wordpress has enabled more people than I (probably) ever will. But not everyone likes chocolate ice-cream,
and that is ok.

I am just going to make green-tea ice cream for those that like green-tea ice cream.


## Everything is a Resource

Ruhoh 2.0 introduces a **resources** implementation strategy. A resource is defined as an object whose attributes and behavior are modeled by the system.
A post, a page, and a theme are examples of resources in ruhoh.

Resources are implemented as self-contained plugins that define, parse, and model attributes as well as describe behavior.

Ruhoh 2.0 makes no assumptions about what resources should exist and how they should behave.
In this way ruhoh can be whatever _you_ want it to be -- it is merely plumbing.

Traditionally, a blog has "posts" and these posts behave a certain pre-defined way.
A post, for example, may define attributes:

- authors, 
- publish date
- tags
- categories
- URL permalink


Suppose you want to publish "essays", "snippets", "quotes", and so on.
Rather than being shoe-horned into the "posts" system, 
ruhoh 2.0 allows you to define a new resource that can act like a post, but maintain
it's own specific namespace and behavior.

You can read a more in-depth [](/docs/2/technical)
# Upgrading


## Using the new 2.0.alpha version

It's best to install the new gem via bundler so you can execute it locally relative to a specific project.

Step by step instructions are available here:

https://github.com/ruhoh/blog/tree/2.0.alpha#readme



## command line

**Most all command-line commands have changed.**

When working with resources, you now have to namespace your command:

    # old
    $ ruhoh post
    
    # new
    $ ruhoh posts new
    

--ext no longer exists, in favor of [default ext per resource](/docs/2/pages#toc_31) in config.yml

    
## config.yml

**Most configuration formatting has changed.**

Now all the resource specific configuration is namespaced by the resource name. See [Pages Configuration](/docs/2/pages#toc_30)

### Theme config

old:
  
    theme: "twitter"
    
new:
  
    theme:
      name: "twitter"

### Exclude paths

exclude paths for all resources (posts/pages) now omit the folder:

e.g. 

    # old
    ^posts/untitled 
    
    # new
    ^untitled
    

## Mustache API

Most all mustache methods have changed their API and implementation.

We'll outline some here but it's probably best to download the new 2.0 blog scaffold and compare all the helpers.


### pages

Displaying all pages now must use `pages.all`:

old:

{{#raw_code}}
{{# pages }}
  <h2>{{title}}</h2>
  <p>{{summary}}</p>
{{/ pages }}
{{/raw_code}}

new:

{{#raw_code}}
{{# pages.all }}
  <h2>{{title}}</h2>
  <p>{{summary}}</p>
{{/ pages.all }}
{{/raw_code}}


### posts

Displaying all posts now must use `posts.all`

old:

{{#raw_code}}
{{# posts }}
  <h2>{{title}}</h2>
  <p>{{summary}}</p>
{{/ posts }}
{{/raw_code}}

new:

{{#raw_code}}
{{# posts.all }}
  <h2>{{title}}</h2>
  <p>{{summary}}</p>
{{/ posts.all }}
{{/raw_code}}


### posts_latest

Latest posts are now namespaced into the posts resource: `posts.latest`

old:

{{#raw_code}}
{{# posts_latest }}
<div class="post">
  <h3 class="title"><a href="{{url}}">{{title}}</a> <span class="date">{{ date }}</span></h3>
  {{{ summary }}}
</div>
{{/ posts_latest }}
{{/raw_code}}


new:

{{#raw_code}}
{{# posts.latest }}
<div class="post">
  <h3 class="title"><a href="{{url}}">{{title}}</a> <span class="date">{{ date }}</span></h3>
  {{{ summary }}}
</div>
{{/ posts.latest }}
{{/raw_code}}


### Categories

When getting all categories from posts, use `posts.categories.all`

old:

{{#raw_code}}
{{# categories }}
  {{> categories_list }}
{{/ categories }}
{{/raw_code}}


new:

{{#raw_code}}
{{# posts.categories.all }}
  {{> categories_list }}
{{/ posts.categories.all }}
{{/raw_code}}


### Tags

When getting all categories from posts, use `posts.tags.all`

old:

{{#raw_code}}
{{# tags }}
  {{> tags_list }}
{{/ tags }}
{{/raw_code}}


new:

{{#raw_code}}
{{# posts.tags.all }}
  {{> tags_list }}
{{/ posts.tags.all }}
{{/raw_code}}


### Previous and Next

Previous and next objects no longer use context helpers:

old:

{{#raw_code}}
{{# page?previous }}
  <li class="prev"><a href="{{ url }}" title="{{ title }}">&larr; Previous</a></li>
{{/ page?previous }}

{{# page?next }}
  <li class="next"><a href="{{ url }}" title="{{ title }}">&rarr; Next</a></li>
{{/ page?next }}
{{/raw_code}}


new:

{{#raw_code}}
{{# page.previous }}
  <li class="prev"><a href="{{ url }}" title="{{ title }}">&larr; Previous</a></li>
{{/ page.previous }}

{{# page.next }}
  <li class="next"><a href="{{ url }}" title="{{ title }}">&rarr; Next</a></li>
{{/ page.next }}
{{/raw_code}}


### widgets

All widgets must now be namespaced by `widgets`

old:

{{#raw_code}}
{{{ comments }}}
{{/raw_code}}

new:

{{#raw_code}}
{{{ widgets.comments }}}
{{/raw_code}}


### assets

{{#raw_code}}{{ assets }}{{/raw_code}}

has been changed to:

{{#raw_code}}
{{ stylesheets.all }}
{{ javascripts.all }}
{{/raw_code}}


Which means you can load javascripts at the end of the document if you want.

### urls

The `urls` object has all different attribute names: see [View 'view urls' docs](/docs/2/views#toc_11)

### site renamed to data

The `site` object is now named `data`

old:

{{#raw_code}}
<ul>
  <li>{{site.author.name}}</li>
  <li>{{site.author.email}}</li>
</ul>
{{/raw_code}}

new: 

{{#raw_code}}
<ul>
  <li>{{data.author.name}}</li>
  <li>{{data.author.email}}</li>
</ul>
{{/raw_code}}


[data.yml docs](/docs/2/views#toc_23)



## View Helper Plugins

Previously all view helpers shared the same global mustache namespace.

old:

    class Ruhoh
      module Templaters
        module Helpers
          def greeting
            "Hello there! How are you?"
          end
          def raw_code(sub_context)
            ...
          end
        end
      end
    end

To continue to add to the global namespace, attach to the MasterView:

new: 

    module MasterViewAddons
      def greeting
        "Hello there! How are you?"
      end
      def raw_code(sub_context)
        ...
      end
    end
    Ruhoh::Views::MasterView.send(:include, MasterViewAddons)
    
Adding global methods is now discouraged. It is more likely you want resource-specific functionality.
All resource-based helpers are namespaced and belong to the resource's CollectionView or ModelView.

    module PagesCollectionViewAddons
      def greeting
        "Hello there! How are you?"
      end
      
      def random
        # The 'all' method is implemented by Resources::Pages::CollectionView
        # It returns an array of all pages.
        all.sample
      end
    end
    Ruhoh::Resources::Pages::CollectionView.send(:include, PagesCollectionViewAddons)


See [Plugin Docs](/docs/2/plugins) for more info.


## Compiler Plugins

Compiler plugins now pass `ruhoh` instance as its single argument:

old:

    class Ruhoh
      module Compiler
        module Posts
          def self.run(target, page)
          end
        end
      end
    end


new:

    class Ruhoh
      module Compiler
        module Posts
          def self.run(ruhoh)
          end
        end
      end
    end


## Converter Plugins

Converter plugins are currently the same.


## Pages URL

The default page URL format is now "pretty" which omits any filename extension even if 
the page is not an index.html page. To preserve the old style and include the .html extension, have a look at the [Page Permalink Docs](/docs/2/pages#toc_33)

## post.ruhoh.com

post.ruhoh.com DOES NOT support ruhoh 2.0 yet.




# New Stuff

## Posts Paginator

Yay, finally implementated a paginator. [Paginator docs](/docs/2/posts)

## Categories on Pages

Pages can now have categories just like posts.

## Tags on Pages

Pages can now have tags just like posts.

## Simplified RSS Generator

RSS generator only outputs page.content now. No layouts , stylesheets, javascripts, etc.

## Chained contextual helpers

Contextual helpers can be chained:

{{#raw_code}}
{{{ data?to_hash?to_json }}}
{{/raw_code}}

