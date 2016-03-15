# AngularJS Carousel

An Amazing AngularJS 1 Carousel that works with Angular Material and has no jQuery dependency.

Demo : https://embed.plnkr.co/ovBExhpO40yzWPJ47QFE/

## Install :

### npm
`npm install angular-jk-carousel`

## Usage :

 - Add `jk-carousel.js` to your index file:
```html
<script src="angular.js"></script>
<script src="jk-carousel.js"></script>
```

 - Add `jk-carousel.css` to your index file:
```html
<link href="jk-carousel.css" rel="stylesheet" type="text/css" />
```

 - Add a dependency to the `jkAngularCarousel` module in your application.
```js
angular.module('MyApp', ['jkAngularCarousel']);
```

 - Add a `jk-carousel` tag to your html, set the data array and the item template url
```html
<jk-carousel data="ctrl.arrayData" item-template-url="'item-template.html'" >
</jk-carousel>
```

 - The data array can be pretty much any collection of any kind of objects that you like
```js
vm.arrayData = [
  { src: 'image1.png' },
  { src: 'image2.png' },
  { src: 'image3.png' },
  { src: 'image4.png' }
];
```
 - A very simple example of an item template looks like this:
```html
<div>
  <img ng-src="{{slideItem.src}}" style="height: 400px" >
</div>
```
 - It is possible to set the component to auto slide, if the auto slide time is not set, we use the default of 5 seconds:
 ```html
 <jk-carousel data="ctrl.arrayData" item-template-url="'item-template.html'" auto-slide="true" auto-slide-time="1000" >
 </jk-carousel>
 ```


## TODO :
 - Add more transition types
 - Make the component responsive

## License
This module is released under the permissive [MIT license](http://revolunet.mit-license.org). Contributions or suggestions are always welcome :D
