# Lists

Lists is an Angular 1.5 web-based application with a Ruby On Rails backend, where users can create and collaborate on task lists. Each list has its own tasks and tasks can be tagged with any of multiple shared tags. Overdue tasks are noted on the list's display page. A search feature allows users to query their tasks. 

I set a Bootstrap theme, Cyborg, to give the app some color and visual organization.

### Models

Perhaps the most interesting is the join table `user_lists`, which allows users to share lists by associating many users with many lists. Aside from `user_id` and `list_id`, a `permission` column enables a differentiation between `creator` and `collaborator` to be used in setting resource access and use policies. Other interesting methods include a `collaborators=` method for the List class, which takes a string of emails as input and sets the list's users array and their permissions; methods that allow to query a user's permission for a list; and the list class `search` method, which queries the user's tasks joined by tags.

I chose to write `policy.rb`, a module in the 'models' folder that implements resource authorization, myself rather than use one of the popular libraries, such as Pundit, to experiment and learn. Including the module in `ApplicationController` allows for controller resource authorization where appropriate.

Like 'collaborators', tags are also set via a custom `tags_attributes=` method for tasks that checks for uniquness and are added to a task through nested checkboxes in the task form. Tags can only be edited or destoyed by admins. The `:admin` role is set via an user's `enum role:` attribute, currently only manually, by another admin, of course!

### Views

Angular view-models are bound to the client-side controller, allowing for real-time updates; combined with calls to the server, rendering new information without refreshing the page. Of interest are the lists show page, which includes a create task form, relying on `ng-repeat` to automatically update the view when a new task is pushed to the task array in the controller; and the nested views managed by `ui-router', which allow for an `abstract` parent as a base url.

### Controllers

Most of the controllers in Lists rely on services to make server calls, as well as data from `resolve` properties in `ui-router`; and other Angular objects, such as `$scope`, passed in as needed. Handling multiple checkboxes seems a little cumbersome where an angular object is obliged to be collected as an array to fit with Active Record conventions (although a custom method could also be written on the backend), and the Rails standard nested attributes form structure also leads to an unintuitive object. In short, some work is done to ease the fit between the two frameworks.

I implemented an Angular `factory`, adapted from an answer on Stack Overflow, to persist user login while the browser is not refreshed, although a safe flag (without sensitive information) in browser local storage still seems needed to avoid repeated login with browser refresh or new tab.

### Challenges

Coming up with the idea of an abstract base url on which to load various model actions (e.g., new, show, etc.) took some thought (of course, as often happens, after I came up with the idea, I found it wasn't at all original). Also, handling the form checkboxes conversion and rendering of new tag creation did not seem straightforward. Overall, since Angular is new to me, I needed significant experimentation and research to begin to understand how to put its various components to work together. I feel working on the project definitely helped solidify at least some understanding.

### Pleasures

I like how magical Angular feels, where the mysterious JavaScript black box renders pages and urls without refresh, eases handling of collections and allows for malleable customization. Coding in JavaScript seems a little more tedious than Ruby, but the 'magic' of the single-page app with real-time variable binds makes up for that somewhat. I enjoyed coming up with the idea of an empty base-url, the safe `localStorage` trick, and arranging the fit between Rails and Angular.

Thanks you for reading! I hope you'll enjoy any time with the applicaton.
