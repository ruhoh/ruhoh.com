# Analytics

Analytics are implemented via the widgets API. Have a look at the [widgets documentation](/docs/2/widgets) if you haven't already. Ruhoh provides analytics codes for [Google](http://google.com/analytics), and [GetClicky](http://getclicky.com).

## Enable

To enable you will need to have setup an account with one of these providers.
In the `config.yml` you should see configuration parameters as shown below: 

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em> &larr;
  </li>
</ul>

    widgets :

      analytics :
        use : google
        # -- config for google --
        tracking_id : 'UA-123-12'

        # -- config for getclicky  --
        # site_id :


### Choose a Provider

The widget specifies different snippets for the different engines. Set `use` to the provider you intend to use. Make sure to specify your account credentials for the relevant provider.

In the example above, the **google** provider will be used and will be provided with **UA-123-12** as the account **tracking\_id**.


## Disable

### Global Disable

Set `enable: false` to disable analytics globally. 

    # config.yml

    widgets :
      analytics :
        enable : false


### Per-Page Disable

Disable analytics for individual pages by specifying `widgets.analytics.enable: false` in the page YAML meta-data:

    ---
    layout: post
    categories : lessons
    tags : [yay]
    widgets :
      analytics :
        enable : false
    ---

Internally, the value of "enable" will be cast to a String. So you must specify exactly the value `false` or `"false"` for this to work.


## Custom Providers

To use a custom provider:

1. Create a snippet file with the widget code for the custom provider.
1. Place the snippet file into the widget's namespace so it can be found.
1. Specify the new snippet name in config.yml under `use` e.g. `use: custom_analytics`.

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>widgets</em> 
    <ul>
      <li>
        <span class="ui-silk inline ui-silk-folder">.</span> <em>analytics</em>
        <ul>
          <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>custom_analytics.html</em> &larr;</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
