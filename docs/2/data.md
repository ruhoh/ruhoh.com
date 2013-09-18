# Data


`data` is a special collection for modeling abstract data in your Views for direct usage in your templates. For example you might want to define an ordered navigation list or iterate through a list of contacts.

Data is held in the `data.yml` or `data.json` file:

{{# folder_tree }}
  config.yml
  data.yml
{{/ folder_tree }}

## Example Usage

    # data.yml
    ---
    author :
      name : Jade Dominguez
      email : blah@email.test
      github : username
      twitter : username
      feedburner : feedname


<span class='label'>since 2.4</span>

Data now supports JSON:

{{# folder_tree }}
  data.json
{{/ folder_tree }}

    {
      "author": {
        "twitter": "username", 
        "github": "username", 
        "feedburner": "feedname", 
        "name": "Jade Dominguez", 
        "email": "blah@email.test"
      }
    }


In your templates:

{{#raw_code}}
<ul>
  <li>Author: {{ data.author.name }}</li>
  <li>email: {{data.author.email }}</li>
  <li>github: {{data.author.github }}</li>
</ul>
{{/raw_code}}
