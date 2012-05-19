Kingspoke::Application.routes.draw do
  root :controller => "homes", :action => "index"

  resources :decision, :only => [:create], :defaults => { :format => "json" }
end
