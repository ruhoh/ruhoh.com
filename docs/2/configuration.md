# Configuration

The `config.yml` file holds your blog's global configuration settings.

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-page-white-gear">.</span> <em>config.yml</em> &larr;</li>
</ul>

## base_path

The `base_path` intelligently prepends **all** urls in the system with the given `base_path`.
This allows you to host your blog in a subdirectory of a given website.

    # config.yml
    base_path: "/path/to/my/blog"

**Example:** To host your site on this domain: http://myuniversity.edu/staff/me/~/blog:

    # config.yml
    base_path: "/staff/me/~/blog"

**Note:** The `base_path` is never added in development mode.

## production_url

Set the URL to where your blog will be live on the Internet. This is needed to properly
generate your RSS feed and other features. **This setting has nothing to do with building internal links**. Use `base_path` instead.

    production_url : 'http://yourdomain.com'
