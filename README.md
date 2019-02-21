# `dummie`: Create a dummy that does nothing

![][ci-badge]

[ci-badge]: https://travis-ci.com/kevinkassimo/dummie.svg?branch=master

`dummie()` creates a simple object that does literally __nothing__. It silently consumes all the get/set/has/delete/call etc. operations and never fails. It also works for nested properties/methods.

`dummie` requires `Proxy` available to work.

(This package is mostly as a toy to me as I play around with `Proxy` features. Be careful if you want to use it for any mocking purposes, as it was not intended for them, though it might help at times.)

## Example

```js
// Suppose you've downloaded some scripts for browsers but run in node
const dummie = require('dummie');

// Add these.
const document = dummie();
const window = dummie();
const XMLHttpRequest = dummie();

// All of the following operations would do nothing
// But none of them would throw error.
window.onload = () => "blah";
window.addEventListener("oninput", () => {});

const el = document.getElementById("id");
el.innerText = "BOOM";
el.appendChild(document.createElement("p"));

function reqListener () {
  console.log(this.responseText);
}
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
xhr.open("GET", "http://www.example.com");
xhr.send();
```