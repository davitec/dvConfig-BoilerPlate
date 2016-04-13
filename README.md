You find a running demo of this BoilerPlate at http://dvconfigdemo.davitec.de/

--------
For more details and ressources, go to  https://www.davitec.de/dvConfig
- documentation
- apikey generator
- support ticket system
- getting started guide

--------

Getting started:
================

1. run boilerplate in a webserver, e.g. local apache vhost => call index.html as http://** not as file://**
2. copy/rename and edit ServerCode/settings.example.json to ServerCode/settings.json (add your own Apikey and Token, you get them on www.davitec.de/dvconfig)
3. browse to http://<your_boilerplate_at_localhost>/index.html
4. edit ServerCode/product/Schreibtisch.xml as you like
5. edit src/ to change dvconfig.js and grunt it (./Gruntfile.js)

More details on first steps:
- http://dvconfigdoc.davitec.de/content/primer/first-steps.html

Trouble Shooting
================

Just downloading and browse to index.html will show no product data:
- check console: if you get a lot of errors like "b is undefined" etc in your browsers console: you need an apache vhost, dont call it as file://<your folder>/dvConfig-BoilerPlate/index.html

If you run as apache vhost and you will still get no product data:
- check network communication of your browser, LoadSettings.php might give a 400 response if settings fail (wrong apikey etc) ..
- you will find error description from api in the HTTP response
- apikey/token pair is bound to IP, so you need to change it, if you use different IPs

ApiKey:
- register at www.davitec.de/dvconfig and create apikey
- edit ServerCode/settings.json (renamed from ServerCode/settings.example.json)

HTTP response of LoadSettings.php should now be 200 OK, and response body contains json with sessionkey (that is used by app/dvconfig.js)

In Case of editing the product xml and errors:
- HTTP GET to initproduct.php will fail, response body contains the xml Parser error

How to use BoilerPlate locally:
-------------------------------

GRUNT
- AngularJS App app/dvconfig.js is grunted from src/*
- edit src and use grunt to concat dvconfig.js (see http://gruntjs.com/)
- see Gruntfile.js
- folder node_modules is grunt stuff as well

ServerCode/*
- here you find some php files, that initialize api and containts product xml (ServerCode/products/Schreibtisch.xml)
- you might integrate servercode to your own system or rewrite completely
- ServerCode is intended for demo, so it is kept as simple as possible (ignoring code quality / coding style issues)
- InitProduct.php and LoadSettings.php are called via HTTP requests from AngularJS (app/dvconfig.js)
- for simplicity, we use CURL requests (might be not done in best style, but works for demo)

src/*
- some Angular JS stuff, that is used by grunt to concat app/dvconfig.js

widgets/*
- HTML widgets, that you can use to display features and attribute via the respective dvcoonfig.js Angular Directive
- have a look to ./css folder as well

js/*, bootstrap/*
- some stuff like bootstrap, jquery etc to have a local copy (not necessary for online version, just for local dev)

