Rails.application.routes.draw do
  
  get '/current_user', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/rent_item', to: 'rentals#create'
  patch '/rentals', to: 'rentals#update'

  
  resources :rentals
  resources :items
  resources :users
end
