---
layout: page
title: "Api"
---


## Site

The site object is a global data object used primarily as a convenience strategy.

Define any valid YAML data structure in `_site.yml` and this data will be globally accessible to all pages, layouts, and partials via the `site` variable.

Two useful examples would be defining authorship data:

    author :
      name : Pau Gasol
      email : blah@email.test
      github : username
      twitter : username
      feedburner : feedname

Or composing an Array of page ids, to be used for rendering the primary Navigation:

    navigation :
      - quick-start.md
      - how-it-works.md
      - usage.md
      

Lastly, in case you ever need it, the full `_config.yml` hash is injected into the site variable at the key : `config`

This makes available, for example, your current theme:

    site.config.theme
    # returns 'twitter'



