

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

{{# folder_tree }}
  my-folder
    config.json
    test.md
{{/ folder_tree }}

The generated site will contain the files:

{{# folder_tree }}
  my-folder
    config.json
    test.md
{{/ folder_tree }}
