<h1 align="center">Opiekun - Web</h1>
<p align="center">Web application for diet supervisors</p>
<p align="center">
  <img src="https://github.com/wojciechkubiak/opqn-web/blob/master/Opqn.png?raw=true"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20by-wojciechkubiak-blue"/>
  <img src="https://img.shields.io/website?url=https%3A%2F%2Fopqn.netlify.app"/>
  <img src="https://img.shields.io/netlify/9b34eab0-858b-4f92-863f-29b5350b9465"/>
  <img src="https://img.shields.io/badge/react-16.13.1-informational"/>
  <img src="https://img.shields.io/badge/typescript-3.8.3-informational"/>
</p>

## Other parts
[API](https://github.com/wojciechkubiak/opqn-api)

[Mobile](https://github.com/wojciechkubiak/opqn-mobile)

## Technologies used
* React + TypeScript (React Hooks)
* HTML
* SASS

## What this app is about
The main characteristic of the app is simplicity. There are two types of accounts, proteges and supervisors. On the side of the protege, there is one form including weight, glucose and pressure. After submit of data, data is send to the supervisor and protege job is done untill next day. On the side of supervisor, there is list of proteges included in his group and their latest health informations.

## Live
The first thing that shows up to the visitor is the login screen. From this level it is possible to create a user account of the selected type and to log in.
<br />

<p align="center">
 <img src="https://github.com/wojciechkubiak/opqn-web/blob/master/live1.png?raw=true"/>
</p>
<br />
Based on the account type, two types of screen can be shown to the user.

<br />

* Supervisor - it allows the analysis of data of proteges, including their contact info. The supervisor has the ability to add new proteges to his group (those who are not already signed) and to remove them.

<br />

<p align="center">
  <img src="https://github.com/wojciechkubiak/opqn-web/blob/master/live2.png?raw=true"/>
</p>
<br />

* Protege - Allows you to enter data (once a day), later analyzed by a supervisor. The main idea is "enter your data, come back tomorrow".

<br />

<p align="center">
 <img src="https://github.com/wojciechkubiak/opqn-web/blob/master/live3.png?raw=true"/>
</p>

## How can I install this app
At this moment application is hosted on the website [opqn.netlify.app](https://opqn.netlify.app) website, but in case you want to use it locally, all you have to do is to install current LTS version of [NodeJS](https://nodejs.org/en/) and pass into your terminal (inside app directory) two commends:

### `npm install`

Installs all dependencies needed to run Opiekun app. <br />In case of outdated dependencies, try to run `npm audit fix`. <br />I'm trying to fix such things as fast as possible, but sometimes it just takes a while. 
<br />Most of times app is going to work even after error messages calling to use `audit` option <br />(not the ones that say you couldn't install dependencies - in case of such errors, check your internet connection). 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## More about ReactJS

In case of my tips being unclear, check official React site [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## What's next
* Graphs for every user, for weight, pressure and glucose.
* Option to sign out from patron, from protege side.
