# JIRA-QUERY-NODEJS

This repository contains sample code for building REST API using Express JS to query JIRA data.
If you want to setup a new project use below commands to setup up the project.

Use keystore to store the encryption key. Here its hardcoded for the demo app.

## Express JS components and features used

1. App.js - Routes, generic error handling, views - templates or static page definition.
2. Router
3. Controller - Middleware functions. next(error) and next() is used for propogating error or result
4. Service - Should not use midleware. For IO -Async code e.g rest calls etc use promises.
5. Config - module to read configurations files as per env
6. Model - Uses mongoose apis to retrieve data

<br/>

## PROJECT NODE BACKEND SETUP
-------------------

mkdir expressjs-jira-mongodb-sampleapp

cd jira-query-nodejs

npm init -y

Create folders - routes, controllers, services, helpers, config and files

npm i -D nodemon

npm i express

npm i js-jira

npm i config

<br/>

## PROJECT JADE UI SETUP
-------------------
npm i pug

mkdir views

touch layout.pug index.pug

mkdir public

touch public/style.css

npm i -D browser-sync
npm install -g browser-sync

browser-sync init 

update bs-config.js

npm run ui

<br/>

## JIRA endpoint
-------------------
https://jira-server-domain/rest/api/2/serverInfo

## Launching the project

npm run dev

Go to http://localhost:8080/ to run the app

<br/>

## MongoDB setup

    mongod  --auth --dbpath "<path>"     // server

    mongo                               // client
    show dbs
    use mydb
    db
    db.createCollection("collection1")
   
    cd C:\Program Files\MongoDB\Server\4.4\bin
    mongoimport --type csv -d mydb -c collection1 --headerline --drop data.csv

    db.collection1.find( { NAME: "HELLO WORLD" } )
    db.collection1.find({});                    // all rows
    
    use admin
    db.createUser({user: "user1", pwd:"user2", roles: [{role : "readWrite", db : "baadb"} , {role:"read", db: "baadb"}]});
    db.getUsers();
    
    db.shutdownServer()