---
title:
description:

layout: docs
icon : icon-gift
---

# Overview

Plugins may be added by placing ruby files into the `plugins` folder in the root of your blog directory:

**NOTE for security reasons, your plugins will not run when publishing to *.ruhoh.com, but I plan to support many plugins once they are reviewed!**

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-folder">.</span> <em>plugins</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-code">.</span> <em>helpers.rb</em> &larr;</li>
    </ul>
  </li>
</ul>

You can also place them in folders for better organization:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>plugins</em>
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>template-helpers</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-code">.</span> <em>custom.rb</em></li>
        </ul>
      </li>
      
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

# Mustache Helpers

Custom mustache methods may be added directly to `Ruhoh::Templaters::Helpers`.
This module gets included into ruhoh's mustache View, so providing more methods will work as expected:

    class Ruhoh
      module Templaters
        module Helpers
        
          def greeting
            "Hello there! How are you?"
          end
          
          def raw_code(sub_context)
            code = sub_context.gsub('{', '&#123;').gsub('}', '&#125;').gsub('<', '&lt;').gsub('>', '&gt;')
            "<pre><code>#{code}</code></pre>"
          end
          
        end
      end
    end

The mustache tag `greeting` is now available throughout your pages and templates:

{{#raw_code}}
{{greeting}}
{{/raw_code}}

<p><span class="label label-important">IMPORTANT</span></p>

Since methods may be added directly to the module, be careful to respect system level helper method names as well as the names used by other plugins.
As a guideline, please be descriptive with your name but also concise.

All system level helper methods are outlined here:
<https://github.com/ruhoh/ruhoh.rb/tree/master/lib/ruhoh/templaters>  
Study these methods to provide a guideline for hacking your own!


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

## Payload

The mustache **payload** hash is available using `self.context`. 
You can see this in use at the system level implementation of the "tags" helper:

    def tags
      tags = []
      self.context['db']['posts']['tags'].each_value { |tag| tags << tag }
      tags
    end

   
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
        module Pages

          def self.run(target, page)
            FileUtils.cd(target) {
              Ruhoh::DB.all_pages.each_value do |p|
                page.change(p['id'])

                FileUtils.mkdir_p File.dirname(page.compiled_path)
                File.open(page.compiled_path, 'w:UTF-8') { |p| p.puts page.render }

                Ruhoh::Friend.say { green "processed: #{p['id']}" }
              end
            }
          end

        end #Pages
      end #Compiler
    end #Ruhoh
    
    
The submodule should define a class-level method named `run`. `run` must take the arguments: `target, page` 
where target is the filepath to the target output directory, and page is a `Ruhoh::Page.new` object.


Here's a user-submitted compile task created by [David Long](https://github.com/davejlong) to add an RSS feed:


    require 'nokogiri'
    class Ruhoh
      module Compiler
        # This rss compiler is provided by David Long 
        # http://www.davejlong.com/ 
        # https://github.com/davejlong
        # Thanks David!
        module Rss
          # TODO: This renders the page content even though we already need to
          # render the content to save to disk. This will be a problem when posts numbers expand. Merge this in later.
          def self.run(target, page)
            feed = Nokogiri::XML::Builder.new do |xml|
             xml.rss(:version => '2.0') {
               xml.channel {
                 xml.title_ Ruhoh::DB.site['title']
                 xml.link_ Ruhoh::DB.site['config']['production_url']
                 xml.pubDate_ Time.now
                 Ruhoh::DB.posts['chronological'].each do |post_id|
                   post = Ruhoh::DB.posts['dictionary'][post_id]
                   page.change(post_id)
                   xml.item {
                     xml.title_ post['title']
                     xml.link "#{Ruhoh::DB.site['config']['production_url']}#{post['url']}"
                     xml.pubDate_ post['date']
                     xml.description_ (post['description'] ? post['description'] : page.render)
                   }
                 end
               }
             }
            end
            File.open(File.join(target, 'rss.xml'), 'w'){ |p| p.puts feed.to_xml }
          end
        end #Rss
      end #Compiler
    end #Ruhoh
    
This rss generator is part of the system compiler tasks so it will automatically run for you.

