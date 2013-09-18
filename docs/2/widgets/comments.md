# Comments

Comments are implemented via the widgets API. Have a look at the [widgets documentation](/docs/2/widgets) if you haven't already. Ruhoh provides widget snippets for [Disqus](http://disqus.com), [Intense Debate](http://intensedebate.com), [livefyre](http://www.livefyre.com/), and [Facebook Comments](https://developers.facebook.com/docs/reference/plugins/comments/).

## Enable

To enable commenting you will need to have setup an account with one of these providers.
In the `config.yml` you should see configuration parameters as shown below: 

{{# folder_tree }}
  config.yml
{{/ folder_tree }}

    widgets :
      # Settings for comments widget
      # Set 'use' to the comment provider you want to use.
      # Set 'enable' to false to turn commenting off globally.
      comments :
        use : disqus

        # -- config for disqus --
        short_name : jekyllbootstrap # Change This!

        # -- config for livefyre --
        # site_id : 123

        # -- config for intensedebate --
        # account : 123abc

        # -- config for facebook --
        # appid : 123
        # num_posts: 5
        # width: 580
        # colorscheme: light
        

### Choose a Provider

The comment widgets specifies different snippets for the different engines. Set `use` to the provider you intend to use. Make sure to specify your account credentials for the relevant provider.

In the example above, the **disqus** provider will be used and will be provided with **jekyllbootstrap** as the account **short\_name**.


## Disable

### Global Disable

Set `enable: false` to disable comments globally. 

    # config.yml

    widgets :
      comments :
        enable : false


### Per-Page Disable

Disable comments for individual pages by specifying `widgets.comments.enable: false` in the page YAML meta-data:

    ---
    layout: post
    categories : lessons
    tags : [yay]
    widgets :
      comments :
        enable : false
    ---

Internally, the value of "enable" will be cast to a String. So you must specify exactly the value `false` or `"false"` for this to work.


## Custom Providers

To use a custom provider:

1. Create a snippet file with the widget code for the custom provider.
1. Place the snippet file into the widget's namespace so it can be found.
1. Specify the new snippet name in config.yml under `use` e.g. `use: custom_comments`.

{{# folder_tree }}
  widgets
    comments
      custom_comments.html
{{/ folder_tree }}
