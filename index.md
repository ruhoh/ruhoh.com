---
layout : splash
title : Elite Technical Blogging
---

<style type="text/css">
  h1 {text-align:center; padding:24px; font-size:38px;}
</style>

# A Better Static Blog Generator

Hi there, I'm Jade.  
I built <http://jekyllbootstrap.com>, a framework to make blogging with Jekyll easy.

My new project is called **ruhoh**.
Ruhoh builds upon everything I learned through making Jekyll-Bootstrap.  
My goal is to help _all developers_ share their knowledge which means ultimately ruhoh will be language independent.

I still have much work to do but ruhoh is ready for beta-users.
This is my best work yet, please take the time to try it out and tell me what you think.

## Get Started

### Ruby

    $ gem install ruhoh
    $ ruhoh new myblog
    $ cd myblog
    $ rackup -p 9292

Preview your new blog locally at: <http://localhost:9292>

### Usage

[Full Usage Documentation](/usage)

You can also peruse the command-line help:

    $ ruhoh help


## Examples

This website is naturally a ruhoh blog. 

<a href="https://github.com/ruhoh/ruhoh.com" class="btn btn-info">Full Source Code on GitHub</a>

<hr style="border:0">

# Core Improvements

## Universal Blog API

My main vision is to make it easier for _all developers_ to share their knowledge.

Through my experience with Jekyll-Bootstrap, it become apparent that not everyone 
has enough ruby experience to get a healthy development environment installed on their machine - and ruby is not trivial to install!

Ruhoh's [Universal Blog API](/universal-blog-api) specification allows every developer, regardless of preferred language and platform to join the community.


## Modular

Ruhoh uses a modular architecture. You can read more about [how ruhoh works](/how-it-works).
Modularization decouples the main Ruhoh components, allowing you to customize or replace individual components as needed.

Templaters, converters, parsers, compilers, even the command-line tool can be extended or simply swapped out - Ruhoh is made to be customized.

## Language Indifferent

In the year 2000, there will be Ruhoh modules written in tons of languages, simply because there's no reason why there couldn't be!

Developers can take advantage of the Universal Blog API to implement modules in any language in any build environment.

# Help

## Feedback

I am happy to hear anything and everything:

{{> contact_list }}

## Thank You

Building Jekyll Bootstrap is a great and very fulfilling experience because not only do people find it useful,
but many people also take the time to offer feedback and contribute.

**I love Open Source.**

I'm asking for your help again, with ruhoh, to build out a solid next-generation blogging platform we all love _and actually use_.
There are still many features that need to be implemented. There is also much work to be done regarding themes.

There is lot's to do and I hope you will join the community. I'll be here!
