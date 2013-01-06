---
title:
description:

layout: edge-docs
icon : icon-gift
---

# Overview

**NOTE for security reasons, your plugins will not run when publishing to *.ruhoh.com.**

Plugins may be added by placing ruby files into the `plugins` folder in the root of your blog directory:
<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-folder">.</span> <em>plugins</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-code">.</span> <em>pages\_collection\_view_addons.rb</em> &larr;</li>
    </ul>
  </li>
</ul>

You can also place them in folders for better organization:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>plugins</em>
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>converters</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-code">.</span> <em>kramdown.rb</em></li>
        </ul>
      </li>
      
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>compiler-tasks</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-code">.</span> <em>rss.rb</em></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>


There is no plugin framework. To add and extend functionality, you would do it just as you would in normal ruby:

# View Helpers

## Collection Views

Every resource has its own namespace to access its collection view helpers:

{{#raw_code}}
{{#pages.all}}
  {{>pages_list}}
{{/pages.all}}
{{/raw_code}}

To add methods to the pages CollectionView, just use some ruby magic:

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
    
Now you can do:


{{#raw_code}}
<h1>{{pages.greeting}}</h1>
{{#pages.random}}
  <h2>{{title}}</h2>
{{/pages.random}}
{{/raw_code}}

## Model Views


### Pro-tip:

Dive into the existing view methods to see how they are made.
You can leverage these methods and gain some inspiration for implementing your own.

## Block Helpers

A mustache block helper is a method that acts on the encapsulated block of content:

{{#raw_code}}
{{#raw_code}}
  <h1>{{ page.title }}</h1>
  <p>{{ page.date }}</p>
  <p>
    Link: <a href="{{page.url}}">{{page.title}}</a>
  </p>
{{/raw_code}}
{{/raw_code}}

Here we are calling the method `raw_code` which will be passed the block content as its argument:

    def raw_code(sub_context)
      code = sub_context.gsub('{', '&#123;').gsub('}', '&#125;').gsub('<', '&lt;').gsub('>', '&gt;')
      "<pre><code>#{code}</code></pre>"
    end

Block helpers should return a String.

## Contextual Helpers

A mustache contextual helper is a special kind of block helper that acts on a given context (a data-structure), 
usually transforming it into a new data-structure then passing it back to the block context as if that data was was passed in directly.
This extension is specific to ruhoh only and not part of the standard Mustache API.

Contextual helpers look exactly like block helpers, however the sub\_context for a contextual helper _must_ be a valid data-structure from the mustache payload:

    def to_categories(sub_context)
      Array(sub_context).map { |id|
        self.context['db']['posts']['categories'][id] 
      }.compact
    end

Here we expect `sub_context` to be a String or Array of Strings that represent category names.
The method then returns an Array of category objects from the dictionary.

Here's an example usage:

{{#raw_code}}
{{# page.categories?to_categories }}
<ul>
  <li><a href="{{url}}">{{ name }} ({{ count }})</a></li>
</ul>
{{/ page.categories?to_categories }}
{{/raw_code}}

Here we see our original data-stucture `page.categories` (an Array) is being passed to the
contextual helper `?to_categories`. The `to_categories` method transforms the data,
then passes it onto the original block as if it were the original context.

<p><span class="label label-important">IMPORTANT</span></p>

When using a contextual helper method, you must always call it with a question mark: ?helper_method.
This is the only way Mustache knows to pass the original data-structure to your helper method first, before rendering the block.

# Custom Converters

Converters are responsible for processing the markup languages used to write your page content.
Ruhoh provides the **Redcarpet** markdown converter by default:

    class Ruhoh
      module Converter
        module Markdown

          def self.extensions
            ['.md', '.markdown']
          end

          def self.convert(content)
            require 'redcarpet'
            markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML.new(:with_toc_data => true),
              :autolink => true, 
              :fenced_code_blocks => true, 
            )
            markdown.render(content)
          end
        end
      end
    end

source: <https://github.com/ruhoh/ruhoh.rb/blob/master/lib/ruhoh/converters/markdown.rb>

You can re-implement this converter to use your preferred markdown processor:

    class Ruhoh
      module Converter
        module Markdown
          def self.extensions
            ['.md', '.markdown']
          end

          def self.convert(content)
            require 'kramdown'
            Kramdown::Document.new(content).to_html
          end
        end
      end
    end
    
Here we specify the same file extensions but use kramdown for processing.

You can also specify additional converters:

    class Ruhoh
      module Converter
        module Upcase
          def self.extensions
            ['.up', '.upcase']
          end

          def self.convert(content)
            content.upcase
          end
        end
      end
    end

Here we just upcase our entire content string.
Be sure to provide unique module names when adding converters. Specifying the same module will re-implement the module rather add it as an additional option.


# Compiler Methods

Compiler methods add tasks to the compiling process. The compiling process is little more
than a loop that runs all of the available compile tasks.

You can view the compiler here and all of its default tasks:
<https://github.com/ruhoh/ruhoh.rb/blob/master/lib/ruhoh/compiler.rb>

To define a new task, add a sub-module to `Ruhoh::Compiler`:

    class Ruhoh
      module Compiler
        module Posts
          def self.run(ruhoh)
            FileUtils.cd(ruhoh.paths.compiled) {
              ruhoh.db.posts.each_value { |data|
                view = ruhoh.master_view(data['pointer'])

                FileUtils.mkdir_p File.dirname(view.compiled_path)
                File.open(view.compiled_path, 'w:UTF-8') { |p| p.puts view.render_full }

                Ruhoh::Friend.say { green "processed: #{data['id']}" }
              }
            }
          end
        end
      end
    end
    
    
The submodule should define a class-level method named `run`. `run` must take `ruhoh` as its argument.
