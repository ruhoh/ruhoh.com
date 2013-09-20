

# \_root Collection


The \_root collection uses the "pages" collection modeler and allows you to serve pages from the **root** of your generated website.

Since every collection is necessarily a sub-folder, it can be annoying to realize you cannot serve root pages from the root of your blog. To compensate for this, the `_root` folder will always default to serving all pages at the root URL.

## Example

Given the site structure: 

{{# folder_tree }}
  _root
    about.md
{{/ folder_tree }}

The generated site will contain the file:

{{# folder_tree }}
  about
    index.html
{{/ folder_tree }}

with the generated URL: **/about**

## Custom root folder


The `_root` collection does nothing more than set **permalink** to **/:relative_path/:filename**. Set an arbitrary collection as root by defining this permalink in the config file.

Given the site structure:

{{# folder_tree }}
  config.yml
  pages
    about.md
{{/ folder_tree }}

And a config.yml file with the contents:

    "pages" : 
      "permalink" : "/:relative_path/:filename"


Then the generated site will contain the file:

{{# folder_tree }}
  about
    index.html
{{/ folder_tree }}

with the generated URL: **/about**

