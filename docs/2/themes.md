---
title: <theme>
description:

icon : icon-adjust
---

# Overview

Themes are optional.

A theme acts as a namespace for your Presentation layer. This includes:

- layouts
- partials
- stylesheets
- javascripts
- media (specific to presentation)

It is possible to put all these folders at the root of your website folder, but then you could not easily enable/disable different templates and/or share packaged themes with others =).

## Cascade 

A theme has load priority and will overload blog-level and system level files of the same name:

**Load priority:**

- theme-level (highest)
- blog-level
- system-level (lowest)

## Structure 

{{> trees/themes }}


## Configuration

A theme must be configured in `config.yml` so ruhoh knows which folder is acting as the theme:

    "twitter-bootstrap" :
      use : "theme"

Here I've specified the collection (folder) `twitter-bootstrap` should use the collection "theme".

## Install

To install a new theme just download the folder into your blog's root directory:

{{# folder_tree }}
  theme-new-theme-name
{{/ folder_tree }}

Then update your `config.yml` with the new theme name:

    "theme-new-theme-name" :
      use : "theme"

Restart the preview server for it to take effect.