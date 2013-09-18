
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

{{# folder_tree }}
  my-folder
    config.json
{{/ folder_tree }}

The generated site will NOT contain the folder:

{{# folder_tree }}
  my-folder
{{/ folder_tree }}
