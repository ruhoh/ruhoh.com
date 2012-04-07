---
title: 
description:

layout: page
---


## How to Hack on Ruhoh

First read [how ruhoh works](/how-it-works).

## Hacking Templaters

The default templater in ruhoh is Mustache.
Mustache is very important to ruhoh because mustache is widely supported in a variety of languages.
This is vital to keeping ruhoh language independent.

Mustache itself can be heavily extended as needed.
Please refer to the mustache docs to understand how mustache works.

ruhoh uses one global mustache view class. 

You can extend this class with your own custom methods like so:

    blah blah
    
## Hacking Converters

Ruhoh converters are used to convert a page body content from a Markup language to HTML.
The default ruhoh converter is Maraku, which parses Markdown.

To implement your own converter you can do:

    blah blah





    