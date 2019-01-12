# newsroom
Simple news app in Ionic

This application is build on ionic 3 and the very cool https://newsapi.org/ for android.  Because Ionic is a cross platform tool, I expect it would work for ios too. Not only that, why limit it there. It serves on webpage pretty well too.

Note: Please get your own API KEY from https://newsapi.org - click on the "get api key" button.

Prerequisites:
npm
ionic
android studio

Build instructions:
1. download/clone
2. ionic repair
3. ionic cordova platform add android
4. customize /src/providers/api-interface/api-interface.ts and paste you apiKey.
5. a) ionic serve
   b) and fix the missing link (is this fixed?)
      npm install ionic-cache @ionic/storage --save
   c) ionic serve
   d) get a feel for how it works
6. ionic build 
7. ionic cordova run android --prod

