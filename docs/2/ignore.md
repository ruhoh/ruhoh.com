
# ignore Collection

<span class='label'>since 2.3</span>

The "ignore" collection allows you to completely ignore a folder in ruhoh.

This is useful if you need configuration-type or helper directories for third-party plugins and services.

## Usage 

```yaml
# config.yml
'my-folder':
  'use': 'ignore'
```

## Example

Given the above configuration and sample site structure: 

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>my-folder</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>config.json</em></li>
    </ul>
  </li>
</ul>


The generated site will NOT contain the folder:

<ul class="folder-tree">
  <li class="endpoint"><span class="ui-silk inline ui-silk-folder">.</span> <em>my-folder</em></li>
</ul>
