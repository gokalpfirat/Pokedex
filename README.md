# Pokedex
Pokedex created with **only React**, without any dependencies & libraries. Written with Class & Functional components, _not with hooks_

API by [PokéAPI](http://pokeapi.co/) 

## Features
* Search Pokémons using partial name
* Great user experience with Ghost Loaders & optimized Cumulative Layout Shift(CLS)
* Add/Remove Pokémons to your favourites list
* Check details(ex. weight), moves, stats in modal
* Mobile friendly responsive design

## Techniques
* Infinite Scroll using native Web API [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
* Modal system with help of [React Portals](https://reactjs.org/docs/portals.html)
* Code Splitting with help of [React Lazy/Suspense](https://reactjs.org/docs/code-splitting.html), allow us to load components dynamically when needed.
* [Context API](https://reactjs.org/docs/context.html) used to cache loaded data, in order to prevent multiple requests for same Pokémon. Also replacement for Redux, to have global state and manage it.
* Catch any component level errors with wrapper [Error Boundary](https://reactjs.org/docs/error-boundaries.html) component
* Performance optimization for unnecessary rerenders by using [Pure Component](https://reactjs.org/docs/react-api.html#reactpurecomponent). Which makes shallow comparison for props & state and rerenders if the result is changed.
* Lazy Load Images with native `loading="lazy"` attribute
