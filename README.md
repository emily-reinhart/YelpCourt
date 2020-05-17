# YelpCamp
# Style the campgrounds page (bootstrap)
* Make better heder/title
* Make campgrounds display in grid

# Style the navbar and form (bootstrap)
* Add navbar to all templates
* Style new campground form

# Add mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside our routes

# Show page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop() - remove all db entries
* Add a show route/template

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment Model
* Make our errors go away
* Display comments on campground show page

# Comment New/Create
* Discuss the nested routes
* Add the comment new and create routes
* Add the new comment form

NESTED Routes
=================================================
INDEX   /campgrounds                    GET
NEW     /campgrounds/new                GET
CREATE  /campgrounds                    POST
SHOW    /campgrounds/:id                GET

NEW     /campgrounds/:id/comments/new   GET
CREATE  /campgrounds/:id/comments       POST

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheets

# Add User Model
* Install all packages needed for auth
* Define User model

# Auth pt. 2 - Register
* Configure passport
* Add register routes
* Add register template

# Auth pt. 3 - Login
* Add login routes
* Add login template

# Auth pt. 4 - Logout
* Add logout route
* Prevent user from adding a comment if not logged in
* Add links to navbar
* Show/hide auth links correctly

# Refactor the Routes
* Use Express router to reorganize all routes

# Users & Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users & Campgrounds
* Prevents an unauthenticated user from creating a campground
* Save username & id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add edit route for campgrounds
* Add link to edit page
* Add update route
* Fix $set problem

# Deleting Campgrounds
* Add destroy route
* Add delete button

# Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete button

# Editing Comments
* Add edit route for comments
* Add edit button
* Add update route

# Deleting Comments
* Add destroy route
* Add delete button

# Authorization PT. 2 Commments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/show edit and delete buttons
* Refactor Middleware

# Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootsrap alerts to header



RESTful Routes

name    url         verb    description
===========================================================
INDEX   /dogs       GET     Display a list of all dogs
NEW     /dogs/new   GET     Displays for to make new dog
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog

# RESTful Routing
# Introduction
* Define REST and explain WHY it matters
* List all 7 RESTful routes
* Show example of RESTful routing in practice

REST - a mapping between HTTP routes and CRUD  

READ/INDEX  GET     /blogs             List all
NEW         GET     /blogs/new         Show new form
CREATE      POST    /blogs             Create new, redirect
SHOW        GET     /blogs/:id         Show info about one
EDIT        GET     /blogs/:id/edit    Show edit form
UPDATE      PUT     /blogs/:id         Update one, redirect
DESTROY     DELETE  /blogs/:id         Delete one, redirect