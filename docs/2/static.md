

# static Collection

<span class='label'>since 2.3</span>

The "static" collection allows you to port a folder 1:1 from your website structure to the generated output.

## Usage 

```yaml
# config.yml
'my-folder':
  'use': 'static'
```


## Example

Given the above configuration and sample site structure: 

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>my-folder</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>config.json</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>test.md</em></li>
    </ul>
  </li>
</ul>


The generated site will contain the files:

<ul class="folder-tree">
  <li class="endpoint">
    <span class="ui-silk inline ui-silk-folder">.</span> <em>my-folder</em>
    <ul>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>config.json</em></li>
      <li><span class="ui-silk inline ui-silk-page-white-text">.</span> <em>test.md</em></li>
    </ul>
  </li>
</ul>
