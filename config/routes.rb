Kingspoke::Application.routes.draw do
  root :to => 'home#index'

  resources :decision, :only => [:create], :defaults => { :format => "json" }
end
