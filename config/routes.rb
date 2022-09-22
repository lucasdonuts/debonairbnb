Rails.application.routes.draw do
  
  get '/current_user', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  
  resources :rentals
  resources :items
  resources :users
end
