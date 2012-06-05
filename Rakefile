require 'rubygems'
require 'ruhoh'
require 'yaml'

# ruhoh Upgrade Script
# ruhoh gem upgrade from 0.3.0 to 1.0.0-alpha
# ruhohSpec upgrade from  0.2 to 1.0
#
# How to Use:
# Create a file named 'Rakefile' in the root of your blog directory and place the full contents of this gist inside.
# Using the command-line, navigate to your blog directory and execute:
#
#   $ rake upgrade
#
task :upgrade do
  NewSitePath = 'new-site'
  puts "Generating new site into: #{NewSitePath}"
  FileUtils.mkdir_p NewSitePath
  
  # Extract _config.yml
  config_file = "_config.yml"
  config = {}
  puts "Parsing _config.yml"
  if File.exist? config_file
    if Ruhoh::Utils.respond_to?(:parse_yaml_file)
      config = Ruhoh::Utils.parse_yaml_file(config_file)
    else
      config = Ruhoh::Utils.parse_file_as_yaml(config_file)
    end
  end
  
  # config.ru
  # -------------------------------------------------------------
  puts "Copying config.ru"
  FileUtils.cp 'config.ru', File.join(NewSitePath, 'config.ru') if File.exist? 'config.ru'
  
  # site.yml
  # -------------------------------------------------------------
  puts "Copying _site.yml"
  FileUtils.cp '_site.yml', File.join(NewSitePath, 'site.yml') if File.exist? '_site.yml'

  # Main Directories
  # -------------------------------------------------------------
  puts "Copying main directories..."
  ['_media', '_pages', '_plugins', '_posts'].each do |name|
    if FileTest.directory? name
      FileUtils.cp_r name, File.join(NewSitePath, name.gsub('_', ''))
    end
  end
  
  # analytics
  # -------------------------------------------------------------
  puts "Updating analytics to widget"
  analytics = File.join(NewSitePath, 'widgets', 'analytics', 'config.yml')
  if config['analytics']
    config['analytics']['layout'] = config['analytics']['provider']
    config['analytics'].delete('provider')
  end
  FileUtils.mkdir_p File.dirname(analytics)
  File.open(analytics, 'w:UTF-8') do |file|
    file.puts config['analytics'].to_yaml
  end
  config.delete('analytics')

  # comments
  # -------------------------------------------------------------
  puts "Updating comments to widget"
  comments = File.join(NewSitePath, 'widgets', 'comments', 'config.yml')
  if config['comments']
    config['comments']['layout'] = config['comments']['provider']
    config['comments'].delete('provider')
  end
  FileUtils.mkdir_p File.dirname(comments)
  File.open(comments, 'w:UTF-8') do |file|
    file.puts config['comments'].to_yaml
  end
  config.delete('comments')
  
  # google_prettify
  # -------------------------------------------------------------
  puts "Updating syntax to google_prettify widget"
  google_prettify = File.join(NewSitePath, 'widgets', 'google_prettify', 'config.yml')
  FileUtils.mkdir_p File.dirname(google_prettify)
  
  linenums = config['syntax']['google_prettify']['linenums'] rescue nil
  linenums ||= false
  File.open(google_prettify, 'w:UTF-8') do |file|
    linenums = {"linenums" => linenums }.to_yaml
    file.puts linenums
  end
  config.delete('syntax')

  # config.yml
  # Generate this after widgets so widget config objects are removed.
  # -------------------------------------------------------------
  puts "Updating config.yml parameters"
  config['RuhohSpec'] = '1.0'
  config['posts'] = {
    "permalink" => config['permalink'],
    "exclude" => config['exclude']
  }
  config.delete('permalink')
  config.delete('exclude')
  
  File.open(File.join(NewSitePath, "config.yml"), 'w:UTF-8') do |file|
    file.puts config.to_yaml
  end
  
  
  # Themes
  # -------------------------------------------------------------
  puts "Moving themes folder"
  themes = File.join(Dir.pwd, "_templates", "themes")
  FileUtils.cp_r themes, NewSitePath
  
  # Partials
  # -------------------------------------------------------------
  puts "Moving partials folder"
  partials = File.join(Dir.pwd, "_templates", "partials")
  FileUtils.cp_r partials, NewSitePath


  # Adding New Theme
  # -------------------------------------------------------------
  git_url = 'https://github.com/ruhoh/theme-twitter.git'
  new_theme_path = File.join(NewSitePath, 'themes', 'twitter-for-1.0')
  puts "Trying to git clone #{git_url} into #{new_theme_path}"
  puts "  If this fails, you can always try it manually."
  system('git', 'clone', git_url , new_theme_path)
end

