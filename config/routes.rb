Kingspoke::Application.routes.draw do
  root :controller => "homes", :action => "index"

  resources :decisions, :only => [:create], :defaults => { :format => "json" }
  resources :twilios, :only => [:create], :defaults => { :format => "json" }
end
