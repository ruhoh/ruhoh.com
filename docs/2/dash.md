

# dash collection

The dash collection is a special collection that really only models one file named "index" (any extention may be used).

The index file in the dash collection renders your **blog dashboard** available at [http://localhost:9292/dash](http://localhost:9292/dash)

The dashboard conveniently lists all your pages including drafts.

Ruhoh comes with a default dashboard in the system folder available here: https://github.com/ruhoh/ruhoh.rb/blob/master/system/dash/index.html

You can re-implement a custom dashboard by overloading the index file on your site or theme level:

{{# folder_tree }}
  dash
    index.html
{{/ folder_tree }}
