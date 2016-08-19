Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'welcome#home'

  post 'sessions', to: 'sessions#create'
  get 'sessions/user', to: 'sessions#user'
  delete 'sessions', to: 'sessions#destroy'

  resources :users, only: [:show]

  resources :lists

  get '/search', to: 'lists#search'
  post '/search', to: 'lists#search'

  resources :tasks

  resources :tags
end
