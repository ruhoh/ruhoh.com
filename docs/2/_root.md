

# \_root Collection


The \_root collection uses the "pages" collection modeler and allows you to serve pages from the **root** of your generated website.

Since every collection is necessarily a sub-folder, it can be annoying to realize you cannot serve root pages from the root of your blog. To compensate for this, the `_root` folder will always default to serving all pages at the root URL.

**NOTE:**
`_root` just automatically sets `permalink: "/:relative_path/:filename"` which you can do manually on any collection you want.


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