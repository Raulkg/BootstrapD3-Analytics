# Analytics web application using D3JS and Bootstrap

a chart/graph that visualizes the response of the REST APIs.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Working](https://img.shields.io/badge/Working-yes-brightgreen.svg)]()
[![Working](https://img.shields.io/badge/Implemented-100%25-brightgreen.svg)]()
[![Version](https://img.shields.io/badge/Version-1v.0.6-brightgreen.svg)]()


## Browsers support 

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- |
| last 2 versions| last 2 versions| last 2 versions




### Requirements for Challenge:
1. Design and implement a chart/graph that visualize the response of the aboveAPIs.
2. Show your working charts/graphs in one page with the best look and feel that you can come up with.
3. Create a simple instruction on how to run your work.

### Pre-Requisites for Running the Application:
1. Make sure you have NodeJS (v4.x.x and above) installed globally on your machine. Find the detailed installation instruction from https://nodejs.org/en/
2. Modern Browsers - Chrome ,firefox , Safari (Refer Browser Matrix)



## Installation:

## install Node.js

If you're using OS X or Windows, the best way to install Node.js is to use one of the installers from the Node.js download page. If you're using Linux, you can use the installer, or you can check NodeSource's binary distributions to see whether or not there's a more recent version that works with your system.

To test Run below Command - version should be > v6.9.4

`$ node -v`

## Updating npm

Node comes with npm installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you'll want to make sure it's the latest version.

`$ npm install npm@latest -g`


To test Run below Command - version should be > 3.10.10

`$ node -v`

## Clone the repository :

```
$ git clone https://github.com/Raulkg/BootstrapD3-Analytics.git
$ cd BootstrapD3-Analytics
$ npm install

```

## Start server:

`npm run start`

Now, you can confirm the visualization result of the HTTP request/response exchanged via the specified RESTful API by accessing the following URL with browser.

`http://127.0.0.1:8000/`




#ScreenShots:

When you hover over the node the display will show a D3 Force Graph with outward and Inward connections with arrows
[![Working](https://github.com/Raulkg/BootstrapD3-Analytics/blob/master/Screen%20Shot%202017-02-20%20at%204.48.40%20PM.png)]()

When you hover over the node with the checkbox provided checked will display packet information
[![Working](https://github.com/Raulkg/BootstrapD3-Analytics/blob/master/Screen%20Shot%202017-02-20%20at%204.48.59%20PM.png)]()

A list of Statistics of current REST API Call
[![Working](https://github.com/Raulkg/BootstrapD3-Analytics/blob/master/Screen%20Shot%202017-02-20%20at%204.49.08%20PM.png)]()

A pagination Enabled Bar Graph without sorting
[![Working](https://github.com/Raulkg/BootstrapD3-Analytics/blob/master/Screen%20Shot%202017-02-20%20at%204.49.14%20PM.png)]()

A pagination Enable Bar Graph Sorted for curent view when check box checked
[![Working](https://github.com/Raulkg/BootstrapD3-Analytics/blob/master/Screen%20Shot%202017-02-20%20at%204.49.31%20PM.png)]()


A Realtime Graph with Streaming Path being printed . I am aware of using sockets or Streaming API but wanted to showcase my skills for displaying realtime Graph. This particular graph is limited to only one Object due to limited time .
[![Working](https://github.com/Raulkg/BootstrapD3-Analytics/blob/master/Screen%20Shot%202017-02-20%20at%204.50.09%20PM.png)]()




# Thank you and Suggestions are welcome
:tada::tada::tada:
Thank you github for the Platform :octocat: