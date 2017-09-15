gallery_project
===============

A Symfony project created on September 2, 2017, 11:09 am.

Install
-----------------------------------
- To install run **'composer install'**
***
- Create DB (set DB name to app/config/parameters.yml)
***
- Migrate DB
***
php bin/console doctrine:migrations:migrate
***
- Create FrontApp 
gulp

Config
-----------------------------
GalleryBundle/Resources/config.yml
***
contains gallery directory parameter (default 'gallery/')
***
in GalleryBundle/Resources/FrontApp/src/js/app.js
.constant('pageNumberElement', **SetElementsForPage**)

Requirements
-----------------------------
Installing Imagick


