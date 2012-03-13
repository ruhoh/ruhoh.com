require 'rack'
require 'ruhoh'

Ruhoh.setup

use Rack::Lint
use Rack::ShowExceptions
use Rack::Static, {:urls => ['/_media', "/#{Ruhoh.folders.templates}"]}
run Ruhoh::Preview.new