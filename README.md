# Shopify
Shopify theme guide to create customize theme.

## Create Theme from scratch

### Create Folder
Copy and paste below code in command line to create folders and files
```
mkdir assets, config, layout, locales, sections, snippets, templates
```

Create base files
```
cd assets
```
```
touch base.css
```

Create config files
```
cd config
```
```
touch settings_data.json settings_schema.json
```
Create layout files
```
cd layout
```
```
touch password.liquid theme.liquid
```

Create locales files
```
cd locales
```
```
touch en.default.json en.default.schema.json
```

Create templates
```
cd templates
```
```
touch 404.json article.json blog.json cart.json collection.json gift_card.liquid index.json list-collection.json page.about.json page.contact.json page.json password.json product.json search.json
```
```
cd customers
```
```
touch account.json activate_account.json addresses.json login.json order.json register.json reset_password.json
```

As a next step, we need to create main section file for each template
```
touch main-account.liquid main-activate_account.liquid main-addresses.liquid main-login.liquid main-order.liquid main-order.liquid main-register.liquid main-register.liquid main-reset_password.liquid main-404.liquid main-article.liquid main-blog.liquid main-cart.liquid main-collection.liquid mian-list-collections.liquid main-about.liquid main-contact.liquid main-page.liquid header.liquid footer.liquid
```

## List of Pages of Shopify Website
1. Home
2. Single Product
3. Cart
4. Collection
5. Collection List
6. Customers
    - Account (Show Order History, Addresses)
    - Address (Show list of addresses)
    - Login
    - Register
    - Reset Password
    - Activate Account
7. Pages
    - Contact us
    - About us
8. Policies
9. Search
10. 404

## Understanding of global.js file of Dawn Theme
The global.js file has following functions and classes.
| S. No | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | getFocusableElements | Function | This function help to identify the focusable elements in the given element. In Dawn theme, Default focusable elements are `summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe`. This will be used in `trapFocus` function |
| 2 | trapFocus | Function | |
| 3 | focusVisiblePolyfill | Function | |
| 4 | pauseAllMedia | Function | |
| 5 | removeTrapFocus | Function | |
| 6 | onKeyUpEscape | Function | |
| 7 | QuantityInput | Class | |
| 8 | debounce | Function | |
| 9 | throttle | Function | |
| 10 | fetchConfig | Function | |
| 11 | Shopify.bind | Function | |
| 12 | Shopify.setSelectorByValue | Function | |
| 13 | Shopify.addListener | Function | |
| 14 | Shopify.postLink | Function | |
| 15 | Shopify.CountryProvinceSelector | Function | |
| 16 | Shopify.CountryProvinceSelector.prototype | Object | |
| 17 | MenuDrawer | Class | |
| 18 | HeaderDrawer | Class | |
| 19 | ModalDialog | Class | |
| 20 | ModalOpener | Class | |
| 21 | DeferredMedia | Class | |
| 22 | SliderComponent | Class | |
| 23 | SlideshowComponent | Class | |
| 24 | VariantSelects | Class | |
| 25 | ProductRecommendations | Class | |


# Code and Explanation
## 1. getFocusableElements Function

The `getFocusableElements` function returns an array of focusable elements within a given container.

### Parameters

- `container`: The DOM element representing the container within which to search for focusable elements.

### Return Value

An array containing the focusable elements found in the container.

### Example Usage

```javascript
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

// Example usage:
const containerElement = document.getElementById("my-container");
const focusableElements = getFocusableElements(containerElement);
console.log(focusableElements);
```


## 2.  onKeyUpEscape Function

The `onKeyUpEscape` function handles the "Escape" key press event and performs the following actions:

1. Checks if the pressed key code is "ESCAPE" (case-insensitive).
2. Finds the closest ancestor `<details>` element that is currently open.
3. If an open `<details>` element is found:
   - Removes the "open" attribute from the element.
   - Sets the `aria-expanded` attribute of the associated `<summary>` element to `false`.
   - Focuses on the `<summary>` element.

### Parameters

- `event`: The keyup event object containing information about the key press.

### Example Usage

```javascript
document.addEventListener('keyup', onKeyUpEscape);

// Example usage:
function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;

  const openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}
```

## 3. removeTrapFocus Function

The `removeTrapFocus` function is responsible for removing event listeners related to trapping focus within a specific context. It performs the following actions:

1. Removes the `focusin`, `focusout`, and `keydown` event listeners associated with trapping focus.
2. Optionally focuses on a specified element (`elementToFocus`) after removing the event listeners.

### Parameters

- `elementToFocus` (optional): The DOM element to focus on after removing the event listeners.

### Example Usage

```javascript
function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

// Example usage:
const myButton = document.getElementById('my-button');
removeTrapFocus(myButton);
```

## 4.Accordion with Accessibility

### Accordion Fucntion
```javascript
document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

  if (summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', (event) => {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });

  if (summary.closest('header-drawer, menu-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});
```
The provided code snippet manipulates the behavior of HTML `<details>` elements and their associated `<summary>` elements. It enhances accessibility by ensuring proper roles and attributes are set.

1. **Selecting Elements:**
   - `document.querySelectorAll('[id^="Details-"] summary')` selects all `<summary>` elements whose parent `<details>` elements have an `id` attribute starting with "Details-".

2. **Setting Attributes:**
   - `summary.setAttribute('role', 'button')`: Sets the `role` attribute of each `<summary>` to "button".
   - `summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'))`: Sets the `aria-expanded` attribute of each `<summary>` to reflect whether its parent `<details>` is open or closed.
   - `summary.setAttribute('aria-controls', summary.nextElementSibling.id)`: If the next sibling of the `<summary>` has an `id`, sets the `aria-controls` attribute to that `id`.

3. **Event Handling:**
   - `summary.addEventListener('click', ...)`: Adds a click event listener to each `<summary>`. When clicked, it toggles the `aria-expanded` attribute based on whether the parent `<details>` is open or closed.
   - `summary.parentElement.addEventListener('keyup', onKeyUpEscape)`: Listens for keyup events on the parent element of the `<summary>`. The `onKeyUpEscape` function (not shown here) likely handles keyboard interactions (e.g., pressing the Escape key).

4. **Conditional Check:**
   - `if (summary.closest('header-drawer, menu-drawer')) return;`: If the `<summary>` is within a `<header-drawer>` or `<menu-drawer>` (custom elements), the code returns early without further processing.

### Example Usage
```html
<details id="Details-1">
  <summary>Click me to toggle</summary>
  <p>This is the content that will be hidden or shown.</p>
</details>

<details id="Details-2">
    <summary>Another section</summary>
    <p>More content here.</p>
</details>
```

## 5. Custom Function for Focus Trapping
## Focus Trapping Code
```javascript
const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (event.target !== container && event.target !== last && event.target !== first) return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function () {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();

  if (
    elementToFocus.tagName === 'INPUT' &&
    ['search', 'text', 'email', 'url'].includes(elementToFocus.type) &&
    elementToFocus.value
  ) {
    elementToFocus.setSelectionRange(0, elementToFocus.value.length);
  }
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(':focus-visible');
} catch (e) {
  focusVisiblePolyfill();
}

```

The `trapFocus` function is designed to manage focus within a specified container. It ensures that focus remains within a specific context, such as a modal or a custom UI component. Here's how it works:

1. **Parameters**:
   - `container`: The DOM element representing the container where focus should be trapped.
   - `elementToFocus` (optional): The DOM element to focus on initially (default is the container itself).

2. **Focus Management**:
   - The function identifies all focusable elements within the container.
   - It determines the first and last focusable elements.
   - Event listeners are set up to handle focusin, focusout, and keydown events.

3. **Focus Trapping Behavior**:
   - When the user presses the "Tab" key:
     - If the focus is on the last focusable element and the user tabs forward, the focus wraps back to the first element.
     - If the focus is on the first focusable element and the user tabs backward (using Shift + Tab), the focus wraps to the last element.

4. **Initial Focus**:
   - The `elementToFocus` (if provided) receives initial focus.
   - If it's an input element of type "search," "text," "email," or "url" with a non-empty value, the entire text is selected.

5. **Compatibility**:
   - The function checks if the browser supports the `:focus-visible` pseudo-class. If not, it uses a polyfill (`focusVisiblePolyfill`) to ensure consistent focus behavior.

### Example Usage

```javascript
// Example usage:
const myContainer = document.getElementById('my-container');
trapFocus(myContainer);
```


## 6. Custom Function for Focus Visibility Polyfill

The `focusVisiblePolyfill` function is designed to enhance focus visibility behavior in web applications. It addresses the lack of native support for the `:focus-visible` pseudo-class in certain browsers. Here's how it works:

1. **Purpose**:
   - The function ensures that focus styles are applied consistently based on user interactions (keyboard navigation vs. mouse clicks).

2. **Behavior**:
   - When a user interacts with an element using keyboard navigation (e.g., pressing the "Tab" key), the function adds a custom class (e.g., `.focused`) to the focused element.
   - If the user clicked on an element using the mouse, the custom class is not applied.

3. **Event Listeners**:
   - The function listens for the following events:
     - `keydown`: Detects keyboard navigation (sets `mouseClick` to `false`).
     - `mousedown`: Detects mouse clicks (sets `mouseClick` to `true`).
     - `focus`: Handles focus events (applies/removes the custom class).

4. **Usage**:
   - Include this function in your application to improve focus visibility consistency across different input methods.

## Example Usage

```javascript
// Example usage:
focusVisiblePolyfill();
```

## 7. Function to Pause All Media

```javascript
function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach((video) => video.pause());
  document.querySelectorAll('product-model').forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}
```

The `pauseAllMedia` function is designed to pause various types of media elements within a web page. Here's how it works:

1. **YouTube and Vimeo Videos**:
   - The function targets YouTube and Vimeo embedded videos (iframes) with specific classes (`.js-youtube` and `.js-vimeo`).
   - It sends postMessage commands to pause the videos:
     - For YouTube: `video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');`
     - For Vimeo: `video.contentWindow.postMessage('{"method":"pause"}', '*');`

2. **HTML5 `<video>` Elements**:
   - The function selects all `<video>` elements on the page and calls the `.pause()` method to stop playback.

3. **3D Models (Product Models)**:
   - The function targets custom `<product-model>` elements (assuming they have a `modelViewerUI` property).
   - It calls the `.pause()` method on the `modelViewerUI` to pause any 3D model animations.

## Example Usage

```javascript
// Example usage:
pauseAllMedia();
```

### 8. Class of Quantity Input

```javascript
class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true });
    this.input.addEventListener('change', this.onInputChange.bind(this));
    this.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  quantityUpdateUnsubscriber = undefined;

  connectedCallback() {
    this.validateQtyRules();
    this.quantityUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.quantityUpdate, this.validateQtyRules.bind(this));
  }

  disconnectedCallback() {
    if (this.quantityUpdateUnsubscriber) {
      this.quantityUpdateUnsubscriber();
    }
  }

  onInputChange(event) {
    this.validateQtyRules();
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    if (event.target.name === 'plus') {
      if (parseInt(this.input.dataset.min) > parseInt(this.input.step) && this.input.value == 0) {
        this.input.value = this.input.dataset.min;
      } else {
        this.input.stepUp();
      }
    } else {
      this.input.stepDown();
    }

    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);

    if (this.input.dataset.min === previousValue && event.target.name === 'minus') {
      this.input.value = parseInt(this.input.min);
    }
  }

  validateQtyRules() {
    const value = parseInt(this.input.value);
    if (this.input.min) {
      const buttonMinus = this.querySelector(".quantity__button[name='minus']");
      buttonMinus.classList.toggle('disabled', parseInt(value) <= parseInt(this.input.min));
    }
    if (this.input.max) {
      const max = parseInt(this.input.max);
      const buttonPlus = this.querySelector(".quantity__button[name='plus']");
      buttonPlus.classList.toggle('disabled', value >= max);
    }
  }
}

customElements.define('quantity-input', QuantityInput);
```

1. **Constructor**:
   - Initializes the custom element.
   - Finds the input element within the custom element.
   - Sets up an event listener for the input's `change` event.
   - Adds event listeners to all buttons within the custom element.

2. **Connected Callback**:
   - Called when the custom element is added to the DOM.
   - Validates quantity rules (not shown in your snippet).
   - Subscribes to a custom event (`PUB_SUB_EVENTS.quantityUpdate`) and triggers the `validateQtyRules` method.

3. **Disconnected Callback**:
   - Called when the custom element is removed from the DOM.
   - Unsubscribes from the custom event if previously subscribed.

4. **Event Handlers**:
   - `onInputChange`: Validates quantity rules when the input value changes.
   - `onButtonClick`: Handles button clicks (increment/decrement) and dispatches a `change` event if the value changes.

5. **`validateQtyRules` Method**:
   - Validates quantity rules based on min and max values.
   - Updates button states (e.g., disabling the minus button if the value is at the minimum).

  ### Example of Usage
  ```html
  <quantity-input>
    <input type="number" min="0" max="10" value="5">
    <button class="quantity__button" name="minus">-</button>
    <button class="quantity__button" name="plus">+</button>
</quantity-input>
```

## 9. Debounce Function
```javascript
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
```
It is a common technique used to limit the frequency of function calls. Let's break down what this function does:

1. **Function Signature**:
   - `debounce(fn, wait)` takes two parameters:
     - `fn`: The function to be debounced.
     - `wait`: The time (in milliseconds) to wait before invoking the debounced function.

2. **Debouncing Logic**:
   - When the debounced function is called, it sets a timeout (`t`) using `setTimeout`.
   - If the debounced function is called again within the specified `wait` time, the previous timeout is cleared.
   - After the `wait` time elapses, the original function (`fn`) is invoked with the provided arguments.

3. **Usage Example**:
   - You can use this function to prevent rapid firing of events (e.g., handling user input, resizing, scrolling) and improve performance.
   - Here's how you might use it:
     ```javascript
     const debouncedFunction = debounce(myFunction, 300); // Debounce with a 300ms delay

     // Example usage:
     window.addEventListener('resize', debouncedFunction);
     ```
## 10. Throttle Function
```javascript
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}
```

It is a technique used to limit how often a function can be called within a given period of time. Throttling is useful for improving performance and responsiveness, especially when dealing with event listeners that trigger heavy or expensive operations.

Let's break down what this `throttle` function does:

1. **Function Signature**:
   - The `throttle` function takes two parameters:
     - `fn`: The function to be throttled.
     - `delay`: The time (in milliseconds) to wait between consecutive invocations of the throttled function.

2. **Throttling Logic**:
   - When the throttled function is called, it checks the time elapsed since the last invocation (`lastCall`).
   - If the elapsed time is less than the specified `delay`, the function returns early (i.e., no action is taken).
   - Otherwise, the function updates `lastCall` to the current timestamp and invokes the original function (`fn`) with the provided arguments.

3. **Usage Example**:
   - You can use this `throttle` function to prevent rapid and frequent calls to a specific function. For instance:
     ```javascript
     // Example usage:
     const throttledScrollHandler = throttle(handleScroll, 300); // Throttle scroll events

     window.addEventListener('scroll', throttledScrollHandler);
     ```

   In the example above:
   - `handleScroll` is the function you want to throttle.
   - The `300` milliseconds delay ensures that the function is called at most once every 300 milliseconds during scroll events.

## 11. Fetch Config Function
```javascript
function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: `application/${type}` },
  };
}
```

The `fetchConfig` function returns an object with configuration options for making HTTP requests using the Fetch API. Let's break down what this function does:

1. **Function Signature**:
   - `fetchConfig(type = 'json')` takes an optional parameter `type`, which specifies the desired response type (defaulting to `'json'`).

2. **Returned Object**:
   - The returned object includes the following properties:
     - `method`: Specifies the HTTP method (in this case, `'POST'`).
     - `headers`: An object containing request headers:
       - `'Content-Type'`: Indicates that the request body will be in JSON format.
       - `'Accept'`: Specifies the expected response type (e.g., `'application/json'`).

3. **Usage Example**:
   - You can use this configuration when making a `fetch` request:
     ```javascript
     const url = 'https://api.example.com/data';
     const config = fetchConfig(); // Defaults to JSON response

     fetch(url, config)
       .then((response) => response.json())
       .then((data) => {
         // Handle the data returned from the API
         console.log(data);
       })
       .catch((error) => {
         console.error('Error fetching data:', error);
       });
     ```
# Shopify Functions
## 1. Bind Function
```javascript
if (typeof window.Shopify == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};
```
This code is related to the Shopify JavaScript library. Let's break it down:

1. **Initialization**:
   - The snippet checks if the global object `window.Shopify` is undefined.
   - If it is undefined, it assigns an empty object (`{}`) to `window.Shopify`.

2. **`Shopify.bind` Function**:
   - This function takes two arguments:
     - `fn`: The function to bind.
     - `scope`: The context (i.e., `this`) in which the function will be executed.
   - It returns a new function that wraps the original function (`fn`).
   - When the returned function is called, it invokes `fn` with the specified `scope` and any provided arguments.

3. **Usage Example**:
   - You might use this function to ensure that a specific function always executes within a particular context (e.g., a specific object instance).


## 2. Set Selector by Value Function
```javascript
Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};
```

The `Shopify.setSelectorByValue` function allows us to set the selected option of an HTML `<select>` element based on a specified value. Let's break down what this function does:

1. **Function Signature**:
   - `Shopify.setSelectorByValue(selector, value)` takes two parameters:
     - `selector`: The `<select>` element (dropdown) you want to manipulate.
     - `value`: The value you want to match against the options within the dropdown.

2. **Logic**:
   - The function iterates through each option in the dropdown.
   - It compares the provided `value` with both the option's `value` attribute and its inner HTML content.
   - If a match is found, it sets the `selectedIndex` property of the dropdown to the index of the matched option.
   - Finally, it returns the index of the selected option (or `-1` if no match is found).

3. **Usage Example**:
   - Suppose you have an HTML dropdown like this:
     ```html
     <select id="myDropdown">
       <option value="apple">Apple</option>
       <option value="banana">Banana</option>
       <option value="cherry">Cherry</option>
     </select>
     ```
   - You can use the function as follows:
     ```javascript
     const myDropdown = document.getElementById('myDropdown');
     Shopify.setSelectorByValue(myDropdown, 'banana'); // Selects the "Banana" option
     ```
## 3. Add Listener Function
```javascript
Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent('on' + eventName, callback);
};
```

The `Shopify.addListener` function is a cross-browser utility for attaching event listeners to DOM elements. Let's break down what this function does:

1. **Function Signature**:
   - `Shopify.addListener(target, eventName, callback)` takes three parameters:
     - `target`: The DOM element to which the event listener will be attached.
     - `eventName`: The name of the event (e.g., `'click'`, `'change'`, `'keydown'`).
     - `callback`: The function to be executed when the event occurs.

2. **Cross-Browser Compatibility**:
   - The function checks whether the `addEventListener` method is available on the `target`.
   - If it is available (i.e., the browser supports modern event handling), it uses `addEventListener`.
   - Otherwise, it falls back to using `attachEvent` (for older versions of Internet Explorer).

3. **Usage Example**:
   - Suppose you want to attach a click event listener to a button element:
     ```javascript
     const myButton = document.getElementById('myButton'); // Replace with your actual button ID
     Shopify.addListener(myButton, 'click', function () {
       console.log('Button clicked!');
       // Your custom logic here
     });
     ```
## 4. Post Link Function
```javascript
Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);

  for (var key in params) {
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
```
The `Shopify.postLink` function allows us to create and submit a form dynamically, which can be useful for performing a POST request. Let's break down what this function does:

1. **Function Signature**:
   - `Shopify.postLink(path, options)` takes two parameters:
     - `path`: The URL or path where the form data will be submitted.
     - `options`: An optional object containing additional configuration (such as method and parameters).

2. **Form Creation and Configuration**:
   - The function creates an HTML `<form>` element.
   - Sets the form's method (defaulting to `'post'`) and action (the specified `path`).
   - Iterates through the `params` object (if provided) and creates hidden input fields for each key-value pair.
   - Appends these hidden fields to the form.

3. **Submission and Cleanup**:
   - The form is appended to the document body.
   - The form is submitted programmatically.
   - Finally, the form is removed from the document body.

4. **Usage Example**:
   - Suppose you want to submit data to an API endpoint:
     ```javascript
     const apiUrl = 'https://api.example.com/submit';
     const data = { key1: 'value1', key2: 'value2' };

     Shopify.postLink(apiUrl, { method: 'post', parameters: data });
     ```

## 5. Country Province Selector
```javascript
Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));

  this.initCountry();
  this.initProvince();
};
```
The `Shopify.CountryProvinceSelector` function is part of Shopify's built-in functionality for handling country and province selection. Let's break down what this function does:

1. **Initialization**:
   - The function initializes a country and province selector.
   - It takes three parameters:
     - `country_domid`: The ID of the country dropdown element.
     - `province_domid`: The ID of the province dropdown element.
     - `options`: An optional object containing additional configuration (such as hiding elements).

2. **DOM Element References**:
   - The function retrieves references to the country and province dropdown elements based on their IDs.
   - It also checks for an optional `hideElement` property in the `options` object.

3. **Event Handling**:
   - An event listener is attached to the country dropdown (`this.countryEl`).
   - When the country selection changes, the `countryHandler` function (bound to the current context) is called.

4. **Initialization Methods**:
   - The function calls two initialization methods:
     - `initCountry()`: Initializes the country dropdown.
     - `initProvince()`: Initializes the province dropdown.

5. **Usage Example**:
   - You can use this function to create a dynamic country and province selector in your Shopify theme.
   - Ensure that you have appropriate HTML elements with the specified IDs (e.g., `AddressCountryNew`, `AddressProvinceNew`).

## 6. Country Province Selector Prototype
```javascript
Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function () {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function (e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = '';
    }
  },

  clearOptions: function (selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function (selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  },
};
```
The code snippet defines the `Shopify.CountryProvinceSelector` prototype, which is used for handling country and province selection in Shopify themes. Let's break down what each method does:

1. **`initCountry`**:
   - Initializes the country dropdown.
   - Retrieves the default value from the `data-default` attribute of the country element (`this.countryEl`).
   - Sets the selected option in the country dropdown based on the default value.
   - Calls the `countryHandler` method.

2. **`initProvince`**:
   - Initializes the province dropdown.
   - Retrieves the default value from the `data-default` attribute of the province element (`this.provinceEl`).
   - If a value is provided and the province dropdown has options, sets the selected option in the province dropdown.

3. **`countryHandler`**:
   - Handles changes in the country dropdown selection.
   - Retrieves the selected country's provinces (stored as a JSON string in the `data-provinces` attribute of the selected option).
   - Clears existing options in the province dropdown (`this.provinceEl`).
   - If provinces exist, adds new options to the province dropdown based on the retrieved data.
   - Adjusts the display of the province container based on whether provinces are available.

4. **`clearOptions`**:
   - Removes all child nodes (options) from a given selector (dropdown).

5. **`setOptions`**:
   - Adds options to a given selector (dropdown) based on an array of values.

This code is typically used in Shopify themes to create dynamic country and province selectors for address forms.

## 7. Menu Drawer
```javascript
class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach((summary) =>
      summary.addEventListener('click', this.onSummaryClick.bind(this))
    );
    this.querySelectorAll(
      'button:not(.localization-selector):not(.country-selector__close-button):not(.country-filter__reset-button)'
    ).forEach((button) => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  onKeyUp(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle
      ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary'))
      : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const parentMenuElement = detailsElement.closest('.has-submenu');
    const isOpen = detailsElement.hasAttribute('open');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function addTrapFocus() {
      trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
      summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
    }

    if (detailsElement === this.mainDetailsToggle) {
      if (isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);

      if (window.matchMedia('(max-width: 990px)')) {
        document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
      }
    } else {
      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
        summaryElement.setAttribute('aria-expanded', true);
        parentMenuElement && parentMenuElement.classList.add('submenu-open');
        !reducedMotion || reducedMotion.matches
          ? addTrapFocus()
          : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
      }, 100);
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach((details) => {
      details.removeAttribute('open');
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle.querySelectorAll('.submenu-open').forEach((submenu) => {
      submenu.classList.remove('submenu-open');
    });
    document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);

    if (event instanceof KeyboardEvent) elementToFocus?.setAttribute('aria-expanded', false);
  }

  onFocusOut() {
    setTimeout(() => {
      if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement))
        this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    const parentMenuElement = detailsElement.closest('.submenu-open');
    parentMenuElement && parentMenuElement.classList.remove('submenu-open');
    detailsElement.classList.remove('menu-opening');
    detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
    removeTrapFocus(detailsElement.querySelector('summary'));
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
        }
      }
    };

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('menu-drawer', MenuDrawer);
```
I'd be glad to explain the code for the `MenuDrawer` component in markdown:

**Class Definition (`MenuDrawer extends HTMLElement`):**

- This line defines a custom web component named `MenuDrawer` that inherits functionalities from the built-in `HTMLElement` class.

**Constructor (`constructor()`):**

- The constructor is executed when a new instance of `MenuDrawer` is created.
- It calls the parent class constructor (`super()`) to inherit basic functionalities.
- `this.mainDetailsToggle = this.querySelector('details');`: This line finds the first element with the `details` tag within the `MenuDrawer` component and stores it in the `mainDetailsToggle` property.
- `this.addEventListener('keyup', this.onKeyUp.bind(this));`: Attaches a `keyup` event listener to the component itself. The listener calls the `onKeyUp` method when a key is released, passing the event object as an argument. The `bind(this)` ensures `this` refers to the `MenuDrawer` instance within the method.
- `this.addEventListener('focusout', this.onFocusOut.bind(this));`: Similar to the previous line, but listens for the `focusout` event (when focus leaves the component) and calls the `onFocusOut` method.
- `this.bindEvents();`: Calls the `bindEvents` method to set up event listeners for specific elements within the component.

**`bindEvents()` Method:**

- `querySelectorAll('summary').forEach((summary) => ...);`: Finds all `summary` elements (used for disclosure triangles in `details` elements) within the component and loops through them.
  - Inside the loop, it adds a `click` event listener to each `summary` element. When clicked, it calls the `onSummaryClick` method, again ensuring `this` refers to the `MenuDrawer` instance using `bind(this)`.
- `querySelectorAll(...)`: Similar to the previous line, but finds all buttons except for specific classes (`localization-selector`, `country-selector__close-button`, and `country-filter__reset-button`). These exceptions might be for preventing unintended behavior on certain buttons within the drawer. For each button found, it adds a `click` event listener that calls the `onCloseButtonClick` method.

**`onKeyUp()` Method:**

- This method handles the `keyup` event.
- `if (event.code.toUpperCase() !== 'ESCAPE') return;`: Checks if the pressed key is not the Escape key (`ESC`). If not, the method exits.
- `const openDetailsElement = event.target.closest('details[open]');`: Finds the closest ancestor `details` element that has the `open` attribute set (meaning it's currently open).
- `if (!openDetailsElement) return;`: If no open `details` element is found, the method exits.
- Conditional logic based on the `openDetailsElement`:
  - If `openDetailsElement` is the same as `this.mainDetailsToggle` (the main menu drawer), it calls `closeMenuDrawer` to close the entire drawer.
  - Otherwise, it calls `closeSubmenu` to close a submenu within the drawer.

**`onSummaryClick()` Method:**

- This method handles clicks on `summary` elements.
- It retrieves the clicked `summary` element (`summaryElement`) and its parent `details` element (`detailsElement`).
- It also checks for the closest parent element with the class `has-submenu` (`parentMenuElement`) and whether the `detailsElement` has the `open` attribute set (`isOpen`).
- `const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');`: Checks media query for reduced motion preference.
- `addTrapFocus()`: This function (defined later) is used to trap focus within the open menu for accessibility.
- Conditional logic based on `detailsElement`:
  - If `detailsElement` is the `mainDetailsToggle`:
    - If `isOpen` is true (menu is open), it prevents default behavior (likely to stop browser's default toggle behavior).
    - It calls `closeMenuDrawer` or `openMenuDrawer` based on the current open state.
    - If screen width is less than 990px, it sets a CSS variable to manage viewport height.
  - Otherwise (for submenus):
    - It sets a timeout to allow animations to complete before modifying styles.
    - It adds classes to indicate the opening state of the menu (`menu-opening` to `detailsElement`, `aria-expanded=true` to `summaryElement`, and `submenu-open` to `parentMenuElement` if applicable).
    - It checks for reduced motion preference:
      - If not reduced motion (`!reducedMotion || reducedMotion.matches`):
        - It calls `addTrapFocus` immediately to trap focus within the submenu.
      - Otherwise (reduced motion):
        - It adds a `transitionend` event listener to the `summaryElement`'s next sibling (likely the content of the submenu).
        - The `addTrapFocus` function is called within the event listener after the transition ends, ensuring focus is trapped only after the animation.

**`openMenuDrawer(summaryElement)` Method:**

- This method handles opening the main menu drawer.
- `setTimeout(() => {...}, 100);`: Sets a timeout to allow animations to complete before modifying styles.
- `this.mainDetailsToggle.classList.add('menu-opening');`: Adds a class to indicate the opening animation state.
- `summaryElement.setAttribute('aria-expanded', true);`: Sets the `aria-expanded` attribute on the `summary` element to true for accessibility.
- `trapFocus(this.mainDetailsToggle, summaryElement);`: Traps focus within the main menu drawer.
- `document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);`: Adds a class to the body element to potentially prevent scrolling while the menu is open. The class name is based on a data attribute (`dataset.breakpoint`) on the `MenuDrawer` component, allowing for customization based on screen size thresholds.

**`closeMenuDrawer(event, elementToFocus = false)` Method:**

- This method handles closing the main menu drawer.
- `if (event === undefined) return;`: Checks if an event object was provided. If not, the method exits (likely used internally).
- It removes classes and attributes indicating the open state from various elements within the drawer.
- `document.body.classList.remove(...);`: Removes the class added to the body element to allow scrolling again.
- `removeTrapFocus(elementToFocus);`: Removes focus trapping from the previously open element (if provided).
- `this.closeAnimation(this.mainDetailsToggle);`: Starts an animation for closing the drawer.

**`onFocusOut()` Method:**

- This method handles the `focusout` event, which occurs when focus leaves the `MenuDrawer` component.
- `setTimeout(() => {...}, 0);`: Sets a timeout to allow other event handlers to finish before checking focus.
- It checks if the main menu drawer is open and if focus is outside the drawer. If so, it calls `closeMenuDrawer` to close the drawer.

**`onCloseButtonClick(event)` Method:**

- This method handles clicks on buttons within the drawer (excluding specific classes).
- `const detailsElement = event.currentTarget.closest('details');`: Finds the closest ancestor `details` element of the clicked button.
- `this.closeSubmenu(detailsElement);`: Calls the `closeSubmenu` method to close the submenu associated with the clicked button.

**`closeSubmenu(detailsElement)` Method:**

- This method handles closing a submenu within the drawer.
- It removes classes and attributes indicating the open state from the submenu elements.
- `removeTrapFocus(detailsElement.querySelector('summary'));`: Removes focus trapping from the `summary` element of the closed submenu.
- `this.closeAnimation(detailsElement);`: Starts an animation for closing the submenu.

**`closeAnimation(detailsElement)` Method:**

- This method handles the animation for closing a `details` element (either the main menu or a submenu).
- It uses `window.requestAnimationFrame` to create a smooth animation.
- It keeps track of the animation start time.
- It checks if the elapsed time is less than 400 milliseconds (adjustable for animation duration). If so, it continues the animation loop.
- If the animation is complete, it removes the `open` attribute from the `detailsElement` and checks for another open `details` element to potentially trap focus within that one.

**Overall Functionality:**

The `MenuDrawer` component provides a mechanism for creating an accessible, animated, and responsive navigation drawer in a web application. It manages the opening and closing of the drawer, submenus, and handles focus trapping to ensure a smooth user experience. The specific behavior can be customized through CSS classes and data attributes on the component itself.

## 8. Header Drawer Class
```javascript
class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.querySelector('.section-header');
    this.borderOffset =
      this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty(
      '--header-bottom-position',
      `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`
    );
    this.header.classList.add('menu-open');

    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });

    summaryElement.setAttribute('aria-expanded', true);
    window.addEventListener('resize', this.onResize);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus) {
    if (!elementToFocus) return;
    super.closeMenuDrawer(event, elementToFocus);
    this.header.classList.remove('menu-open');
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.header &&
      document.documentElement.style.setProperty(
        '--header-bottom-position',
        `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`
      );
    document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
  };
}

customElements.define('header-drawer', HeaderDrawer);
```
## Inheritance and Specialization: HeaderDrawer Component

The `HeaderDrawer` class inherits from the `MenuDrawer` class, providing a more specialized component for handling a header drawer. Here's a breakdown of the code:

**Class Definition (`class HeaderDrawer extends MenuDrawer`):**

- This line defines a new custom web component named `HeaderDrawer` that inherits functionalities from the `MenuDrawer` class. This means `HeaderDrawer` has all the functionalities of `MenuDrawer` by default.

**`constructor()`:**

- Inherits the constructor from `MenuDrawer` using `super()`.

**`openMenuDrawer(summaryElement)` (Overridden Method):**

- This method overrides the `openMenuDrawer` method from `MenuDrawer`. It's called when the header drawer needs to be opened.
- `this.header = this.header || document.querySelector('.section-header');`:
  - This line retrieves the element with the class `.section-header`. It caches the result in `this.header` for efficiency (avoids redundant lookups).
- `this.borderOffset = ...`:
  - This line calculates a `borderOffset` value based on whether the closest ancestor element with the class `header-wrapper` has the class `header-wrapper--border-bottom`. If it does, the offset is set to 1 (presumably to account for the border), otherwise it's 0. This offset is likely used for positioning calculations later.
- `document.documentElement.style.setProperty(...)`:
  - This line sets a CSS custom property `--header-bottom-position` on the `documentElement` element. The value is calculated using the bottom position of the `header` element (considering the `borderOffset`) in pixels. This property likely controls the positioning of the drawer content relative to the header.
- `this.header.classList.add('menu-open');`:
  - Adds the class `menu-open` to the `header` element, likely for styling the header during the open state.
- `setTimeout(...)`: Similar to `MenuDrawer`, sets a timeout to allow animations to complete before modifying styles.
  - Inside the timeout, it adds the class `menu-opening` to the `mainDetailsToggle` element, likely for animating the opening of the main drawer content.
- `summaryElement.setAttribute('aria-expanded', true);`: Sets the `aria-expanded` attribute on the `summaryElement` to true for accessibility.
- `window.addEventListener('resize', this.onResize);`: Attaches a `resize` event listener to the window. When the window resizes, the `onResize` method is called.
- `trapFocus(this.mainDetailsToggle, summaryElement);`: Traps focus within the main drawer content (inherited from `MenuDrawer`).
- `document.body.classList.add(...);`: Similar to `MenuDrawer`, adds a class to the body element to potentially prevent scrolling while the menu is open.

**`closeMenuDrawer(event, elementToFocus)` (Overridden Method):**

- This method overrides the `closeMenuDrawer` method from `MenuDrawer`. It's called when the header drawer needs to be closed.
- `if (!elementToFocus) return;`: Checks if an element to focus on is provided. If not, the method exits (likely used internally).
- `super.closeMenuDrawer(event, elementToFocus);`: Calls the parent class (`MenuDrawer`) implementation to handle the core closing functionality (removing classes, attributes, etc.).
- `this.header.classList.remove('menu-open');`: Removes the `menu-open` class from the `header` element to reset its styling.
- `window.removeEventListener('resize', this.onResize);`: Removes the `resize` event listener attached in `openMenuDrawer`.

**`onResize` Method:**

- This method is called when the window resizes.
- It checks if the `header` element exists.
  - If it does, it recalculates the `--header-bottom-position` property (similar to `openMenuDrawer`) to ensure proper positioning on resize.
- Additionally, it sets the `--viewport-height` custom property on the `documentElement` to the current window inner height. This might be used for responsive layout adjustments.

**Overall Functionality:**

The `HeaderDrawer` component extends the `MenuDrawer` component by adding functionalities specific to a header drawer. It manages the positioning of the drawer content relative to the header, handles styling changes during open/close states, and updates the layout on window resize.

## 9. ModalDialog Class

```javascript
class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener('click', this.hide.bind(this, false));
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);
```

This code defines a custom web component named `ModalDialog` that represents a modal dialog element. Here's a breakdown of its functionalities:

**Class Definition (`class ModalDialog extends HTMLElement`):**

- This line creates a class named `ModalDialog` that inherits functionalities from the built-in `HTMLElement` class.

**Constructor (`constructor()`):**

- The constructor is executed when a new instance of `ModalDialog` is created.
- `super()`: Calls the parent class constructor to inherit basic functionalities.
- Event Listeners:
  - It sets up event listeners to handle various ways to close the modal dialog:
    - Click on an element with an ID starting with "ModalClose-" (e.g., "ModalClose-Button"). The `hide` method is called with the argument `false` (likely indicating user initiated close). The `bind(this)` ensures `this` refers to the `ModalDialog` instance within the method.
    - Keypress: Listens for the Escape (ESC) key. If pressed, the `hide` method is called to close the dialog.
    - Click on the modal background (media modals only):
      - Checks if the clicked element is a mouse click (not touch) and not a descendant of elements with classes "deferred-media" or "product-model" (likely exceptions to prevent unintended closing). If conditions are met, the `hide` method is called.
    - Click on the modal itself (for non-media modals):
      - Checks if the clicked element is the modal element itself. If so, the `hide` method is called.

**`connectedCallback()`:**

- This lifecycle method is called when the element is inserted into the DOM.
- It checks if the `moved` property is already set (avoiding redundant processing).
- If `moved` is not set, it sets it to `true` to prevent future calls and appends the modal element to the `document.body`.

**`show(opener)` Method:**

- This method is likely called to display the modal dialog.
- `this.openedBy = opener;`: Stores the element that triggered the modal opening (optional for tracking).
- `const popup = this.querySelector('.template-popup');`: Finds the element with the class `template-popup` within the modal (presumably the content container).
- `document.body.classList.add('overflow-hidden');`: Adds a class to the body element to potentially prevent scrolling while the modal is open.
- `this.setAttribute('open', '');`: Sets the `open` attribute on the modal element itself (likely for styling or accessibility).
- `if (popup) popup.loadContent();`: If the `popup` element exists, it might call a method (not shown here) to load the content into the modal.
- `trapFocus(this, this.querySelector('[role="dialog"]'));`: Traps focus within the modal element, ensuring keyboard navigation is restricted to the modal content. The element with the `role="dialog"` attribute is likely the main content area of the modal.
- `window.pauseAllMedia();`: Might be a custom function to pause any media players on the page.

**`hide()` Method:**

- This method is likely called to close the modal dialog.
- `document.body.classList.remove('overflow-hidden');`: Removes the class added to the body element to allow scrolling again.
- `document.body.dispatchEvent(new CustomEvent('modalClosed'));`: Dispatches a custom event named "modalClosed" on the body element, potentially notifying other parts of the application about the modal closing.
- `this.removeAttribute('open');`: Removes the `open` attribute set on the modal element.
- `removeTrapFocus(this.openedBy);`: Removes focus trapping from the element that triggered the modal opening (if any).
- `window.pauseAllMedia();`: Might be called again to resume any paused media players.

**Overall Functionality:**

The `ModalDialog` component provides a reusable way to create modal dialogs with features like close button handling, escape key support, click on background closing (for specific modal types), focus trapping for accessibility, and potential content loading and media pausing. It can be customized by adding content within the `.template-popup` element and potentially using the `opener` property for tracking purposes.

## 10. Model Opener
```javascript
class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);
```

This code defines a custom web component named `ModalOpener` that acts as a button or link to trigger the opening of a specific modal dialog. Here's a breakdown of its functionality:

**Class Definition (`class ModalOpener extends HTMLElement`):**

- This line creates a class named `ModalOpener` that inherits functionalities from the built-in `HTMLElement` class.

**Constructor (`constructor()`):**

- The constructor is executed when a new instance of `ModalOpener` is created.
- `super()`: Calls the parent class constructor to inherit basic functionalities.
- `const button = this.querySelector('button');`: Finds the first child element that is a button within the `ModalOpener` element.
- `if (!button) return;`: If no button is found, the constructor exits as the `ModalOpener` requires a button for functionality.
- Event Listener:
  - Attaches a `click` event listener to the found button.
  - Inside the click handler:
    - `const modal = document.querySelector(this.getAttribute('data-modal'));`: Retrieves the data attribute named `data-modal` on the `ModalOpener` element. This attribute should contain the CSS selector for the target modal dialog element. It then uses `document.querySelector` to find the modal element in the DOM.
    - `if (modal) modal.show(button);`: Checks if a modal element is found. If so, it calls the `show` method on the modal element, passing the clicked button as an argument (likely for tracking the opener).

**Overall Functionality:**

The `ModalOpener` component provides a way to associate a button or link with a specific modal dialog. When clicked, it finds the target modal based on a data attribute and calls the `show` method on the modal, potentially passing itself as an argument for tracking purposes. This creates a clean separation between the modal opening logic and the actual modal dialog component, promoting reusability and maintainability.

## 11. DeferredMedia
```javascript
class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
      if (focus) deferredElement.focus();
      if (deferredElement.nodeName == 'VIDEO' && deferredElement.getAttribute('autoplay')) {
        // force autoplay for safari
        deferredElement.play();
      }
    }
  }
}

customElements.define('deferred-media', DeferredMedia);
```
This code defines a custom web component named `DeferredMedia` used to manage the lazy loading of media content. Here's a breakdown of its functionality:

**Class Definition (`class DeferredMedia extends HTMLElement`):**

- This line creates a class named `DeferredMedia` that inherits functionalities from the built-in `HTMLElement` class.

**Constructor (`constructor()`):**

- The constructor is executed when a new instance of `DeferredMedia` is created.
- `super()`: Calls the parent class constructor to inherit basic functionalities.
- `const poster = this.querySelector('[id^="Deferred-Poster-"]');`: Finds the first child element whose ID starts with "Deferred-Poster-". This is likely the poster image displayed before the media is loaded.
- `if (!poster) return;`: If no poster element is found, the constructor exits as the `DeferredMedia` component requires a poster for functionality.
- Event Listener:
  - Attaches a `click` event listener to the found poster element.
  - Inside the click handler (`loadContent` method):
    - `window.pauseAllMedia();`: Might be a custom function to pause any media players on the page before loading new media.

**`loadContent(focus = true)` Method:**

- This method is likely called to load the actual media content when the user interacts with the poster (or potentially triggered programmatically).
  - `focus` is an optional argument (defaults to `true`) indicating whether to focus on the loaded media after loading.
- `if (!this.getAttribute('loaded')) { ... }`: Checks if the `loaded` attribute is not set on the `DeferredMedia` element. This attribute is likely used to prevent redundant loading.
  - Inside the conditional block:
    - `const content = document.createElement('div');`: Creates a temporary container element.
    - `content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));`: Finds the first child element within a `<template>` element inside the `DeferredMedia` component. It clones this element (likely the actual media content) and appends it to the temporary container.
    - `this.setAttribute('loaded', true);`: Sets the `loaded` attribute to indicate the media has been loaded.
    - `const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));`: Extracts the video, model-viewer, or iframe element from the cloned content and appends it to the `DeferredMedia` element itself. This effectively replaces the poster with the actual media.
    - `if (focus) deferredElement.focus();`: If `focus` is true, it focuses on the loaded media element for keyboard accessibility.
    - Conditional logic for video autoplay (Safari specific):
      - Checks if the loaded element is a video and has the `autoplay` attribute set.
      - If so, it might be a workaround to force autoplay in Safari by calling `play` on the video element.

**Overall Functionality:**

The `DeferredMedia` component provides a way to defer the loading of media content until the user interacts with the poster image. This can improve initial page load speed and potentially reduce data usage. The component manages the loading process, including pausing other media players, creating the media element from a template, appending it to the DOM, and optionally focusing on the loaded media for accessibility.

## 12. Slider Component Class
```javascript
class SliderComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[id^="Slider-"]');
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.enableSliderLooping = false;
    this.currentPageElement = this.querySelector('.slider-counter--current');
    this.pageTotalElement = this.querySelector('.slider-counter--total');
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');

    if (!this.slider || !this.nextButton) return;

    this.initPages();
    const resizeObserver = new ResizeObserver((entries) => this.initPages());
    resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', this.update.bind(this));
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
  }

  initPages() {
    this.sliderItemsToShow = Array.from(this.sliderItems).filter((element) => element.clientWidth > 0);
    if (this.sliderItemsToShow.length < 2) return;
    this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
    this.slidesPerPage = Math.floor(
      (this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset
    );
    this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
    this.update();
  }

  resetPages() {
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.initPages();
  }

  update() {
    // Temporarily prevents unneeded updates resulting from variant changes
    // This should be refactored as part of https://github.com/Shopify/dawn/issues/2057
    if (!this.slider || !this.nextButton) return;

    const previousPage = this.currentPage;
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

    if (this.currentPageElement && this.pageTotalElement) {
      this.currentPageElement.textContent = this.currentPage;
      this.pageTotalElement.textContent = this.totalPages;
    }

    if (this.currentPage != previousPage) {
      this.dispatchEvent(
        new CustomEvent('slideChanged', {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1],
          },
        })
      );
    }

    if (this.enableSliderLooping) return;

    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
      this.prevButton.setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
      this.nextButton.setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }

  isSlideVisible(element, offset = 0) {
    const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
    return element.offsetLeft + element.clientWidth <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
  }

  onButtonClick(event) {
    event.preventDefault();
    const step = event.currentTarget.dataset.step || 1;
    this.slideScrollPosition =
      event.currentTarget.name === 'next'
        ? this.slider.scrollLeft + step * this.sliderItemOffset
        : this.slider.scrollLeft - step * this.sliderItemOffset;
    this.setSlidePosition(this.slideScrollPosition);
  }

  setSlidePosition(position) {
    this.slider.scrollTo({
      left: position,
    });
  }
}

customElements.define('slider-component', SliderComponent);
```

This code defines a custom web component named `SliderComponent` for creating a paginated slider. Here's a detailed explanation of its functionalities:

**Class Definition (`class SliderComponent extends HTMLElement`):**

- Inherits from `HTMLElement` to create a reusable custom element.

**Constructor (`constructor()`):**

- `super()`: Calls the parent class constructor.
- Fetches references to various DOM elements:
  - `this.slider`: The main slider element (assumed to have an ID starting with "Slider-").
  - `this.sliderItems`: All child elements with IDs starting with "Slide-" (representing individual slides).
  - Booleans for loop behavior and element references for page counters.
  - `this.prevButton` and `this.nextButton`: References to the previous and next buttons.
- Checks if `slider` and `nextButton` exist. If not, the component exits as these are essential elements.
- `initPages()`: Calls this method to initialize page calculations on component creation.
- Creates a `ResizeObserver` to automatically recalculate page information when the slider resizes.
- Attaches event listeners:
  - `scroll` event on `slider`: Triggers `update` method on scroll for dynamic updates.
  - `click` events on `prevButton` and `nextButton`: Triggers `onButtonClick` method for button interactions.

**`initPages()` Method:**

- Filters `sliderItems` to only include visible slides (having a width greater than 0).
- Calculates properties for page logic:
  - `sliderItemsToShow`: The actual visible slides after filtering.
  - `sliderItemOffset`: The width offset between consecutive slides.
  - `slidesPerPage`: The number of slides that fit horizontally within the slider viewport.
  - `totalPages`: The total number of pages considering visible slides and `slidesPerPage`.
- Calls `update` to trigger initial page updates.

**`resetPages()` Method:**

- Refetches `sliderItems` in case the content changes dynamically.
- Re-initializes pages by calling `initPages`.

**`update()` Method:**

- Prevents unnecessary updates due to temporary layout changes (commented section related to an issue).
- Stores the previous page number for comparison.
- Calculates the current page based on the scroll position and `sliderItemOffset`.
- Updates the page counter elements (if available) with current and total pages.
- Dispatches a custom event "slideChanged" with details about the current page and element:
  - Only dispatched if the page actually changed.
- Disables/enables prev/next buttons based on whether the first or last slide is fully visible (excluding looping):
  - Uses the `isSlideVisible` helper method to check slide visibility.

**`isSlideVisible(element, offset = 0)` Method:**

- Calculates the rightmost visible edge of the slider viewport considering the current scroll position and an optional offset.
- Checks if the provided element's position falls within the visible area of the slider.

**`onButtonClick(event)` Method:**

- Prevents default button behavior.
- Extracts the step value from the button's `data-step` attribute (defaults to 1).
- Calculates the target scroll position based on the button clicked ("next" or "previous") and the step value multiplied by `sliderItemOffset`.
- Calls `setSlidePosition` to update the slider scroll position.

**`setSlidePosition(position)` Method:**

- Smoothly scrolls the slider to the given horizontal position using the `scrollTo` method.

**Overall Functionality:**

The `SliderComponent` provides a reusable solution for creating paginated sliders. It calculates the number of visible slides based on viewport size, updates page counters and enables/disables navigation buttons dynamically. It also dispatches custom events to notify other parts of the application about slide changes. The component offers basic looping behavior (commented out) that can potentially be enabled in the future. 

## 13. SlideshowComponent
```javascript
class SlideshowComponent extends SliderComponent {
  constructor() {
    super();
    this.sliderControlWrapper = this.querySelector('.slider-buttons');
    this.enableSliderLooping = true;

    if (!this.sliderControlWrapper) return;

    this.sliderFirstItemNode = this.slider.querySelector('.slideshow__slide');
    if (this.sliderItemsToShow.length > 0) this.currentPage = 1;

    this.announcementBarSlider = this.querySelector('.announcement-bar-slider');
    // Value below should match --duration-announcement-bar CSS value
    this.announcerBarAnimationDelay = this.announcementBarSlider ? 250 : 0;

    this.sliderControlLinksArray = Array.from(this.sliderControlWrapper.querySelectorAll('.slider-counter__link'));
    this.sliderControlLinksArray.forEach((link) => link.addEventListener('click', this.linkToSlide.bind(this)));
    this.slider.addEventListener('scroll', this.setSlideVisibility.bind(this));
    this.setSlideVisibility();

    if (this.announcementBarSlider) {
      this.announcementBarArrowButtonWasClicked = false;

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion.addEventListener('change', () => {
        if (this.slider.getAttribute('data-autoplay') === 'true') this.setAutoPlay();
      });

      [this.prevButton, this.nextButton].forEach((button) => {
        button.addEventListener(
          'click',
          () => {
            this.announcementBarArrowButtonWasClicked = true;
          },
          { once: true }
        );
      });
    }

    if (this.slider.getAttribute('data-autoplay') === 'true') this.setAutoPlay();
  }

  setAutoPlay() {
    this.autoplaySpeed = this.slider.dataset.speed * 1000;
    this.addEventListener('mouseover', this.focusInHandling.bind(this));
    this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
    this.addEventListener('focusin', this.focusInHandling.bind(this));
    this.addEventListener('focusout', this.focusOutHandling.bind(this));

    if (this.querySelector('.slideshow__autoplay')) {
      this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
      this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
      this.autoplayButtonIsSetToPlay = true;
      this.play();
    } else {
      this.reducedMotion.matches || this.announcementBarArrowButtonWasClicked ? this.pause() : this.play();
    }
  }

  onButtonClick(event) {
    super.onButtonClick(event);
    this.wasClicked = true;

    const isFirstSlide = this.currentPage === 1;
    const isLastSlide = this.currentPage === this.sliderItemsToShow.length;

    if (!isFirstSlide && !isLastSlide) {
      this.applyAnimationToAnnouncementBar(event.currentTarget.name);
      return;
    }

    if (isFirstSlide && event.currentTarget.name === 'previous') {
      this.slideScrollPosition =
        this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
    } else if (isLastSlide && event.currentTarget.name === 'next') {
      this.slideScrollPosition = 0;
    }

    this.setSlidePosition(this.slideScrollPosition);

    this.applyAnimationToAnnouncementBar(event.currentTarget.name);
  }

  setSlidePosition(position) {
    if (this.setPositionTimeout) clearTimeout(this.setPositionTimeout);
    this.setPositionTimeout = setTimeout(() => {
      this.slider.scrollTo({
        left: position,
      });
    }, this.announcerBarAnimationDelay);
  }

  update() {
    super.update();
    this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
    this.prevButton.removeAttribute('disabled');

    if (!this.sliderControlButtons.length) return;

    this.sliderControlButtons.forEach((link) => {
      link.classList.remove('slider-counter__link--active');
      link.removeAttribute('aria-current');
    });
    this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
    this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
  }

  autoPlayToggle() {
    this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
    this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
    this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
  }

  focusOutHandling(event) {
    if (this.sliderAutoplayButton) {
      const focusedOnAutoplayButton =
        event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
      this.play();
    } else if (!this.reducedMotion.matches && !this.announcementBarArrowButtonWasClicked) {
      this.play();
    }
  }

  focusInHandling(event) {
    if (this.sliderAutoplayButton) {
      const focusedOnAutoplayButton =
        event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
        this.play();
      } else if (this.autoplayButtonIsSetToPlay) {
        this.pause();
      }
    } else if (this.announcementBarSlider.contains(event.target)) {
      this.pause();
    }
  }

  play() {
    this.slider.setAttribute('aria-live', 'off');
    clearInterval(this.autoplay);
    this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
  }

  pause() {
    this.slider.setAttribute('aria-live', 'polite');
    clearInterval(this.autoplay);
  }

  togglePlayButtonState(pauseAutoplay) {
    if (pauseAutoplay) {
      this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
    } else {
      this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
    }
  }

  autoRotateSlides() {
    const slideScrollPosition =
      this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.sliderItemOffset;

    this.setSlidePosition(slideScrollPosition);
    this.applyAnimationToAnnouncementBar();
  }

  setSlideVisibility(event) {
    this.sliderItemsToShow.forEach((item, index) => {
      const linkElements = item.querySelectorAll('a');
      if (index === this.currentPage - 1) {
        if (linkElements.length)
          linkElements.forEach((button) => {
            button.removeAttribute('tabindex');
          });
        item.setAttribute('aria-hidden', 'false');
        item.removeAttribute('tabindex');
      } else {
        if (linkElements.length)
          linkElements.forEach((button) => {
            button.setAttribute('tabindex', '-1');
          });
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
      }
    });
    this.wasClicked = false;
  }

  applyAnimationToAnnouncementBar(button = 'next') {
    if (!this.announcementBarSlider) return;

    const itemsCount = this.sliderItems.length;
    const increment = button === 'next' ? 1 : -1;

    const currentIndex = this.currentPage - 1;
    let nextIndex = (currentIndex + increment) % itemsCount;
    nextIndex = nextIndex === -1 ? itemsCount - 1 : nextIndex;

    const nextSlide = this.sliderItems[nextIndex];
    const currentSlide = this.sliderItems[currentIndex];

    const animationClassIn = 'announcement-bar-slider--fade-in';
    const animationClassOut = 'announcement-bar-slider--fade-out';

    const isFirstSlide = currentIndex === 0;
    const isLastSlide = currentIndex === itemsCount - 1;

    const shouldMoveNext = (button === 'next' && !isLastSlide) || (button === 'previous' && isFirstSlide);
    const direction = shouldMoveNext ? 'next' : 'previous';

    currentSlide.classList.add(`${animationClassOut}-${direction}`);
    nextSlide.classList.add(`${animationClassIn}-${direction}`);

    setTimeout(() => {
      currentSlide.classList.remove(`${animationClassOut}-${direction}`);
      nextSlide.classList.remove(`${animationClassIn}-${direction}`);
    }, this.announcerBarAnimationDelay * 2);
  }

  linkToSlide(event) {
    event.preventDefault();
    const slideScrollPosition =
      this.slider.scrollLeft +
      this.sliderFirstItemNode.clientWidth *
        (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
    this.slider.scrollTo({
      left: slideScrollPosition,
    });
  }
}

customElements.define('slideshow-component', SlideshowComponent);
```
This code extends the `SliderComponent` to create a more feature-rich slideshow component named `SlideshowComponent`. Here's a breakdown of the additional functionalities:

**Class Definition (`class SlideshowComponent extends SliderComponent`):**

- Inherits functionalities from the base `SliderComponent`.

**Constructor (`constructor()`):**

- Fetches additional references to DOM elements:
  - `sliderControlWrapper`: The container for slider control buttons.
  - `sliderFirstItemNode`: The first child element with the class "slideshow__slide" (presumably the first slide).
  - Checks if `sliderControlWrapper` exists. If not, the component exits.
- Sets `enableSliderLooping` to `true` for continuous looping.
- Initializes `announcementBarSlider` and calculates animation delay based on its presence.
- Fetches references to page control links within the slider control wrapper and attaches click event listeners (`linkToSlide`).
- Attaches a scroll event listener to the slider (`setSlideVisibility`). Calls `setSlideVisibility` initially.
- Handles autoplay behavior for announcement bar animations based on `data-autoplay` attribute and reduced motion preference:
  - Sets up event listeners and potentially starts/pauses autoplay based on conditions.

**`setAutoPlay()` Method:**

- Retrieves autoplay speed from the `data-speed` attribute (in seconds) and converts it to milliseconds.
- Attaches event listeners (`focusInHandling`, `focusOutHandling`) to manage autoplay based on focus and hover.
- If an autoplay button exists:
  - Sets up a click event listener (`autoPlayToggle`) and initial state variables. Starts/pauses autoplay based on the initial state.
- Otherwise, considers reduced motion preference and previous button clicks to decide whether to start/pause.

**`onButtonClick(event)` Method:**

- Calls the parent class method (`super`) to handle basic button click behavior.
- Sets a flag (`wasClicked`) to indicate user interaction.
- Checks if the clicked button navigates to the first or last slide.
- If navigating to the first/last slide from other positions, calculates the appropriate scroll position considering all slides.
- Calls `setSlidePosition` to update the slider scroll position.
- Applies animation to the announcement bar based on the clicked button direction.

**`setSlidePosition(position)` Method:**

- Uses a timeout to ensure announcement bar animation finishes before updating the slider position (avoids overlapping animations).

**`update()` Method:**

- Calls the parent class method (`super`) for basic updates.
- Fetches references to page control buttons and removes any previous active state/accessibility attributes.
- Sets the active state and accessibility attributes on the button corresponding to the current page.

**`autoPlayToggle()` Method:**

- Toggles the state of the autoplay button (play/pause) and calls the appropriate methods (`pause`, `play`).

**`focusOutHandling(event)` Method:**

- Handles focus leaving the component or autoplay button.
- If autoplay is enabled and the user didn't focus on the autoplay button, resumes autoplay.

**`focusInHandling(event)` Method:**

- Handles focus entering the component or autoplay button.
- If autoplay is enabled and the user focuses on the autoplay button, pauses/resumes autoplay based on the current state.
- Pauses autoplay if the user focuses within the announcement bar slider.

**`play()` Method:**

- Sets the slider to not announce changes (for better user experience during autoplay).
- Clears any existing autoplay interval and starts a new one with the calculated autoplay speed.

**`pause()` Method:**

- Sets the slider to announce changes again.
- Clears the autoplay interval.

**`togglePlayButtonState(pauseAutoplay)` Method:**

- Visually updates the autoplay button based on the pause state and sets appropriate accessibility labels.

**`autoRotateSlides()` Method:**

- Calculates the next scroll position based on the current page and looping behavior.
- Calls `setSlidePosition` to update the slider position.
- Applies animation to the announcement bar (without a button direction specified).

**`setSlideVisibility(event)` Method:**

- Loops through all visible slides.
- For the current slide:
  - Removes tabindex and aria-hidden attributes from any links within the slide.
  - Sets aria-hidden to "false" for the slide itself.
- For other slides:
  - Sets tabindex to "-1" for any links within the slide.
  - Sets aria-hidden to "true" for the slide itself.
- Resets the `wasClicked` flag.
Absolutely, continuing the explanation of the `SlideshowComponent` class:

**`applyAnimationToAnnouncementBar(button = 'next')` Method:**

- Handles animation logic for the announcement bar slider (if it exists).
- Takes an optional argument `button` indicating the direction ("next" or "previous"). Defaults to "next".
- Calculates the total number of slides (`itemsCount`).
- Determines the increment based on the `button` direction (positive for next, negative for previous).
- Calculates the current slide index (`currentIndex`) and the next slide index considering looping behavior.
- Fetches references to the current and next slides.
- Defines animation class names for fade-in and fade-out effects based on direction.
- Checks for first and last slide positions based on the `currentIndex`.
- Calculates the actual movement direction ("next" or "previous") based on `button` and current position.
- Applies the appropriate fade-out animation class to the current slide and the fade-in animation class to the next slide.
- Uses a timeout to remove the animation classes after a delay (twice the animation delay) to ensure smooth transitions.

**`linkToSlide(event)` Method:**

- Prevents default link behavior.
- Calculates the target scroll position to land on the clicked page control link.
- Uses the position of the first slide element and the index of the clicked link to calculate the offset.
- Calls `scrollTo` on the slider to update the position.

Overall, the `SlideshowComponent` extends the `SliderComponent` to provide functionalities like autoplay with user interaction controls, announcement bar animations with smooth transitions, and improved accessibility through focus handling and appropriate ARIA attributes. It offers a more interactive and user-friendly experience for presenting a slideshow of content.

## 14. Variant Selector

``` javascript
class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange(event) {
    this.updateOptions();
    this.updateMasterId();
    this.updateSelectedSwatchValue(event);
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
    this.updateVariantStatuses();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select, fieldset'), (element) => {
      if (element.tagName === 'SELECT') {
        return element.value;
      }
      if (element.tagName === 'FIELDSET') {
        return Array.from(element.querySelectorAll('input')).find((radio) => radio.checked)?.value;
      }
    });
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);
    });
  }

  updateSelectedSwatchValue({ target }) {
    const { name, value, tagName } = target;

    if (tagName === 'SELECT' && target.selectedOptions.length) {
      const swatchValue = target.selectedOptions[0].dataset.optionSwatchValue;
      const selectedDropdownSwatchValue = this.querySelector(`[data-selected-dropdown-swatch="${name}"] > .swatch`);
      if (!selectedDropdownSwatchValue) return;
      if (swatchValue) {
        selectedDropdownSwatchValue.style.setProperty('--swatch--background', swatchValue);
        selectedDropdownSwatchValue.classList.remove('swatch--unavailable');
      } else {
        selectedDropdownSwatchValue.style.setProperty('--swatch--background', 'unset');
        selectedDropdownSwatchValue.classList.add('swatch--unavailable');
      }

      selectedDropdownSwatchValue.style.setProperty(
        '--swatch-focal-point',
        target.selectedOptions[0].dataset.optionSwatchFocalPoint || 'unset'
      );
    } else if (tagName === 'INPUT' && target.type === 'radio') {
      const selectedSwatchValue = this.querySelector(`[data-selected-swatch-value="${name}"]`);
      if (selectedSwatchValue) selectedSwatchValue.innerHTML = value;
    }
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(
      `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
    );
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updateVariantStatuses() {
    const selectedOptionOneVariants = this.variantData.filter(
      (variant) => this.querySelector(':checked').value === variant.option1
    );
    const inputWrappers = [...this.querySelectorAll('.product-form__input')];
    inputWrappers.forEach((option, index) => {
      if (index === 0) return;
      const optionInputs = [...option.querySelectorAll('input[type="radio"], option')];
      const previousOptionSelected = inputWrappers[index - 1].querySelector(':checked').value;
      const availableOptionInputsValue = selectedOptionOneVariants
        .filter((variant) => variant.available && variant[`option${index}`] === previousOptionSelected)
        .map((variantOption) => variantOption[`option${index + 1}`]);
      this.setInputAvailability(optionInputs, availableOptionInputsValue);
    });
  }

  setInputAvailability(elementList, availableValuesList) {
    elementList.forEach((element) => {
      const value = element.getAttribute('value');
      const availableElement = availableValuesList.includes(value);

      if (element.tagName === 'INPUT') {
        element.classList.toggle('disabled', !availableElement);
      } else if (element.tagName === 'OPTION') {
        element.innerText = availableElement
          ? value
          : window.variantStrings.unavailable_with_option.replace('[value]', value);
      }
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }

  updateMedia(html) {
    const mediaGallerySource = document.querySelector(`[id^="MediaGallery-${this.dataset.section}"] ul`);
    const mediaGalleryDestination = html.querySelector(`[id^="MediaGallery-${this.dataset.section}"] ul`);

    const refreshSourceData = () => {
      const mediaGallerySourceItems = Array.from(mediaGallerySource.querySelectorAll('li[data-media-id]'));
      const sourceSet = new Set(mediaGallerySourceItems.map((item) => item.dataset.mediaId));
      const sourceMap = new Map(mediaGallerySourceItems.map((item, index) => [item.dataset.mediaId, { item, index }]));
      return [mediaGallerySourceItems, sourceSet, sourceMap];
    };

    if (mediaGallerySource && mediaGalleryDestination) {
      let [mediaGallerySourceItems, sourceSet, sourceMap] = refreshSourceData();
      const mediaGalleryDestinationItems = Array.from(mediaGalleryDestination.querySelectorAll('li[data-media-id]'));
      const destinationSet = new Set(mediaGalleryDestinationItems.map(({ dataset }) => dataset.mediaId));
      let shouldRefresh = false;

      // add items from new data not present in DOM
      for (let i = mediaGalleryDestinationItems.length - 1; i >= 0; i--) {
        if (!sourceSet.has(mediaGalleryDestinationItems[i].dataset.mediaId)) {
          mediaGallerySource.prepend(mediaGalleryDestinationItems[i]);
          shouldRefresh = true;
        }
      }

      // remove items from DOM not present in new data
      for (let i = 0; i < mediaGallerySourceItems.length; i++) {
        if (!destinationSet.has(mediaGallerySourceItems[i].dataset.mediaId)) {
          mediaGallerySourceItems[i].remove();
          shouldRefresh = true;
        }
      }

      // refresh
      if (shouldRefresh) [mediaGallerySourceItems, sourceSet, sourceMap] = refreshSourceData();

      // if media galleries don't match, sort to match new data order
      mediaGalleryDestinationItems.forEach((destinationItem, destinationIndex) => {
        const sourceData = sourceMap.get(destinationItem.dataset.mediaId);

        if (sourceData && sourceData.index !== destinationIndex) {
          mediaGallerySource.insertBefore(
            sourceData.item,
            mediaGallerySource.querySelector(`li:nth-of-type(${destinationIndex + 1})`)
          );

          // refresh source now that it has been modified
          [mediaGallerySourceItems, sourceSet, sourceMap] = refreshSourceData();
        }
      });
    }

    if (this.currentVariant.featured_media) {
      document
        .querySelector(`[id^="MediaGallery-${this.dataset.section}"]`)
        ?.setActiveMedia?.(`${this.dataset.section}-${this.currentVariant.featured_media.id}`);
    }

    // update media modal
    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
    const newModalContent = html.querySelector(`product-modal`);
    if (modalContent && newModalContent) modalContent.innerHTML = newModalContent.innerHTML;
  }

  renderProductInfo() {
    const requestedVariantId = this.currentVariant.id;
    const sectionId = this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section;

    fetch(
      `${this.dataset.url}?variant=${requestedVariantId}&section_id=${
        this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section
      }`
    )
      .then((response) => response.text())
      .then((responseText) => {
        // prevent unnecessary ui changes from abandoned selections
        if (this.currentVariant.id !== requestedVariantId) return;

        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const destination = document.getElementById(`price-${this.dataset.section}`);
        const source = html.getElementById(
          `price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`
        );
        const skuSource = html.getElementById(
          `Sku-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`
        );
        const skuDestination = document.getElementById(`Sku-${this.dataset.section}`);
        const inventorySource = html.getElementById(
          `Inventory-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`
        );
        const inventoryDestination = document.getElementById(`Inventory-${this.dataset.section}`);

        const volumePricingSource = html.getElementById(
          `Volume-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`
        );

        this.updateMedia(html);

        const pricePerItemDestination = document.getElementById(`Price-Per-Item-${this.dataset.section}`);
        const pricePerItemSource = html.getElementById(
          `Price-Per-Item-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`
        );

        const volumePricingDestination = document.getElementById(`Volume-${this.dataset.section}`);
        const qtyRules = document.getElementById(`Quantity-Rules-${this.dataset.section}`);
        const volumeNote = document.getElementById(`Volume-Note-${this.dataset.section}`);

        if (volumeNote) volumeNote.classList.remove('hidden');
        if (volumePricingDestination) volumePricingDestination.classList.remove('hidden');
        if (qtyRules) qtyRules.classList.remove('hidden');

        if (source && destination) destination.innerHTML = source.innerHTML;
        if (inventorySource && inventoryDestination) inventoryDestination.innerHTML = inventorySource.innerHTML;
        if (skuSource && skuDestination) {
          skuDestination.innerHTML = skuSource.innerHTML;
          skuDestination.classList.toggle('hidden', skuSource.classList.contains('hidden'));
        }

        if (volumePricingSource && volumePricingDestination) {
          volumePricingDestination.innerHTML = volumePricingSource.innerHTML;
        }

        if (pricePerItemSource && pricePerItemDestination) {
          pricePerItemDestination.innerHTML = pricePerItemSource.innerHTML;
          pricePerItemDestination.classList.toggle('hidden', pricePerItemSource.classList.contains('hidden'));
        }

        const price = document.getElementById(`price-${this.dataset.section}`);

        if (price) price.classList.remove('hidden');

        if (inventoryDestination) inventoryDestination.classList.toggle('hidden', inventorySource.innerText === '');

        const addButtonUpdated = html.getElementById(`ProductSubmitButton-${sectionId}`);
        this.toggleAddButton(
          addButtonUpdated ? addButtonUpdated.hasAttribute('disabled') : true,
          window.variantStrings.soldOut
        );

        publish(PUB_SUB_EVENTS.variantChange, {
          data: {
            sectionId,
            html,
            variant: this.currentVariant,
          },
        });
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    const inventory = document.getElementById(`Inventory-${this.dataset.section}`);
    const sku = document.getElementById(`Sku-${this.dataset.section}`);
    const pricePerItem = document.getElementById(`Price-Per-Item-${this.dataset.section}`);
    const volumeNote = document.getElementById(`Volume-Note-${this.dataset.section}`);
    const volumeTable = document.getElementById(`Volume-${this.dataset.section}`);
    const qtyRules = document.getElementById(`Quantity-Rules-${this.dataset.section}`);

    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('hidden');
    if (inventory) inventory.classList.add('hidden');
    if (sku) sku.classList.add('hidden');
    if (pricePerItem) pricePerItem.classList.add('hidden');
    if (volumeNote) volumeNote.classList.add('hidden');
    if (volumeTable) volumeTable.classList.add('hidden');
    if (qtyRules) qtyRules.classList.add('hidden');
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);
```

This code defines a custom web element named `variant-selects`. It appears to be used for managing product variants on an e-commerce website. Here's a breakdown of its functionalities:

**Class Definition (`class VariantSelects extends HTMLElement`):**

- Inherits functionalities from the base `HTMLElement` class.

**Constructor (`constructor()`):**

- Attaches a change event listener to itself (`this`) and calls the `onVariantChange` method when a change occurs within the element (presumably due to user interaction with variant selection options).

**`onVariantChange(event)` Method:**

- This is the core method that handles changes in variant selection. It performs various actions based on the selected variant:

    - **Update Options:** Calls the `updateOptions` method to gather the currently selected options from select elements and radio buttons.
    - **Update Master ID:** Calls the `updateMasterId` method to identify the selected variant based on the option selections.
    - **Update Selected Swatch Value:** Calls the `updateSelectedSwatchValue` method to update the visual appearance of swatch elements based on the selected options.
    - **Toggle Add Button:** Calls the `toggleAddButton` method to control the disabled state and text of the "Add to Cart" button based on variant availability.
    - **Update Pickup Availability:** Calls the `updatePickupAvailability` method to update information about pickup options for the selected variant (if applicable).
    - **Remove Error Message:** Removes any existing error messages.
    - **Update Variant Statuses:** Calls the `updateVariantStatuses` method to update the availability of other variant options based on the currently selected options.
  - If no variant is selected:
      - Enables the "Add to Cart" button (but displays "Sold Out" text).
      - Calls the `setUnavailable` method to hide price, inventory, SKU, and other variant-specific information.
  - If a variant is selected:
      - Updates the URL with the selected variant ID (if configured).
      - Updates the variant ID in hidden form fields.
      - Renders product information (price, inventory, SKU, etc.) based on the selected variant.
      - Updates the share URL with the selected variant ID.

**Helper Methods:**

- `updateOptions`: Gathers selected values from select elements and radio buttons within the component.
- `updateMasterId`: Identifies the variant that matches all the selected option values.
- `updateSelectedSwatchValue`: Updates the visual appearance of swatch elements (e.g., color or image) based on the selected option.
- `updateURL`: Updates the URL to include the selected variant ID (if configured).
- `updateShareUrl`: Updates the share button URL to include the selected variant ID.
- `updateVariantInput`: Updates hidden form fields with the selected variant ID.
- `updateVariantStatuses`: Analyzes available options based on previous selections and disables unavailable options for the current selection.
- `setInputAvailability`: Sets the disabled state or text content of option elements based on their availability for the current selection.
- `updatePickupAvailability`: Fetches and displays pickup availability information for the selected variant (if applicable).
- `removeErrorMessage`: Removes any existing error messages.
- `updateMedia`: Updates the product media gallery based on the selected variant. This involves:
    - Comparing media IDs between the current DOM and the new variant data.
    - Adding/removing media items to ensure they match the new variant.
    - Resorting media items if the order changes in the new variant data.
    - Setting the featured media for the variant (if applicable).
    - Updating the product media modal content.
- `renderProductInfo`: Fetches product information (price, inventory, SKU, etc.) specific to the selected variant and updates the corresponding elements in the DOM.
- `toggleAddButton`: Enables/disables the "Add to Cart" button and sets its text content based on variant availability or a custom message.
- `setUnavailable`: Hides price, inventory, SKU, and other variant-specific information when no variant is selected.
- `getVariantData`: Parses JSON data containing variant information stored within the element and caches it for future use.

**Overall:**

The `VariantSelects` custom element manages the selection of product variants and updates the product information accordingly. It provides functionalities like updating the URL, managing the "Add to Cart" button state, handling variant availability, and updating product media based on the user's selections. This improves the user experience by dynamically displaying relevant information and enabling actions based on the chosen variant.

## 15. Product Recomendations
```javascript
class ProductRecommendations extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.unobserve(this);

      fetch(this.dataset.url)
        .then((response) => response.text())
        .then((text) => {
          const html = document.createElement('div');
          html.innerHTML = text;
          const recommendations = html.querySelector('product-recommendations');

          if (recommendations && recommendations.innerHTML.trim().length) {
            this.innerHTML = recommendations.innerHTML;
          }

          if (!this.querySelector('slideshow-component') && this.classList.contains('complementary-products')) {
            this.remove();
          }

          if (html.querySelector('.grid__item')) {
            this.classList.add('product-recommendations--loaded');
          }
        })
        .catch((e) => {
          console.error(e);
        });
    };

    new IntersectionObserver(handleIntersection.bind(this), { rootMargin: '0px 0px 400px 0px' }).observe(this);
  }
}

customElements.define('product-recommendations', ProductRecommendations);
```

## ProductRecommendations Custom Element Explained

This code defines a custom web element named `product-recommendations`. It appears to be used for lazy-loading product recommendations on an e-commerce website. Here's a breakdown of its functionalities:

**Class Definition (`class ProductRecommendations extends HTMLElement`):**

- Inherits functionalities from the base `HTMLElement` class.

**Constructor (`constructor()`):**

- No specific actions defined here.

**`connectedCallback()` Method:**

- This method is called automatically when the element is inserted into the DOM. It sets up an Intersection Observer to manage the lazy loading behavior:

  - **`handleIntersection` Function:** This function is called whenever the element's visibility changes relative to its container (specified by the `rootMargin` option).
      - If the element is not intersecting (visible) with the container, the function exits.
      - It unobserves the element itself to prevent redundant calls.
      - Fetches product recommendation data from the URL specified in the element's `data-url` attribute.
      - Parses the fetched response as text and creates a temporary HTML element to hold the parsed content.
      - Extracts the content of the `product-recommendations` element within the parsed HTML.
      - **Conditional Updates:**
          - If recommendations are found and not empty:
              - Updates the content of the current element with the extracted recommendations.
          - If the element has the class `complementary-products` and doesn't contain a `slideshow-component` element:
              - Removes the entire element (presumably because complementary products are not desired without a slideshow component).
          - If the parsed HTML contains a `.grid__item` class (indicating product items):
              - Adds a class `product-recommendations--loaded` to the current element to potentially style the loaded recommendations.
      - Catches any errors during the fetch process and logs them to the console.
  - **`IntersectionObserver`:** Creates a new Intersection Observer instance with the `handleIntersection` function as the callback. It specifies a `rootMargin` of "0px 0px 400px 0px" which means the element will be considered intersecting only when it enters the bottom viewport by 400px. This enables lazy loading as the user scrolls down the page.

**Overall:**

The `ProductRecommendations` custom element uses Intersection Observer to efficiently load product recommendations. It fetches data from a specified URL only when the element becomes visible within a certain distance from the bottom of the viewport. This improves website performance by avoiding unnecessary data loading until it's likely to be seen by the user. Additionally, it handles scenarios where complementary products might not be desired or when the data retrieval fails.

## 16. Account Icon
```javascript
class AccountIcon extends HTMLElement {
  constructor() {
    super();

    this.icon = this.querySelector('.icon');
  }

  connectedCallback() {
    document.addEventListener('storefront:signincompleted', this.handleStorefrontSignInCompleted.bind(this));
  }

  handleStorefrontSignInCompleted(event) {
    if (event?.detail?.avatar) {
      this.icon?.replaceWith(event.detail.avatar.cloneNode());
    }
  }
}

customElements.define('account-icon', AccountIcon);
```
This code defines a custom web element named `account-icon`. It appears to be used for dynamically updating an account icon based on the user's sign-in status on an e-commerce website. Here's a breakdown of its functionalities:

**Class Definition (`class AccountIcon extends HTMLElement`):**

- Inherits functionalities from the base `HTMLElement` class.

**Constructor (`constructor()`):**

- Calls the parent class constructor (`super()`) to inherit basic functionalities.
- Fetches the element with the class `icon` within the custom element and stores it in the `this.icon` property (assuming this element represents the account icon).

**`connectedCallback()` Method:**

- This method is called automatically when the element is inserted into the DOM.
- Attaches an event listener for the `storefront:signincompleted` custom event. This event likely originates from a centralized mechanism that manages user sign-in and broadcasts this event when a user successfully signs in.

**`handleStorefrontSignInCompleted(event)` Method:**

- This function is called when the `storefront:signincompleted` event is triggered.
- Checks if the event has a `detail` property containing an `avatar` property (presumably representing the user's avatar information).
  - If `avatar` exists:
      - Uses `event.detail.avatar.cloneNode()` to create a copy of the avatar element.
      - Replaces the existing content of the `this.icon` element (presumably the account icon) with the cloned avatar element. This dynamically updates the account icon with the user's avatar upon successful sign-in.

**Overall:**

The `AccountIcon` custom element listens for a `storefront:signincompleted` event and updates the account icon with the user's avatar if available. This provides a more personalized user experience by displaying the user's avatar after signing in.

## 17. FacetFiltersForm Class

```javascript
class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 800);

    const facetForm = this.querySelector('form');
    facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));

    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
  }

  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainerDesktop = document.getElementById('ProductCountDesktop');
    const loadingSpinners = document.querySelectorAll(
      '.facets-container .loading__spinner, facet-filters-form .loading__spinner'
    );
    loadingSpinners.forEach((spinner) => spinner.classList.remove('hidden'));
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer) {
      countContainer.classList.add('loading');
    }
    if (countContainerDesktop) {
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = (element) => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl)
        ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
        : FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, { html, url }];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
      });
  }

  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
    if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductGridContainer').innerHTML;

    document
      .getElementById('ProductGridContainer')
      .querySelectorAll('.scroll-trigger')
      .forEach((element) => {
        element.classList.add('scroll-trigger--cancel');
      });
  }

  static renderProductCount(html) {
    const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
    const container = document.getElementById('ProductCount');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
    const loadingSpinners = document.querySelectorAll(
      '.facets-container .loading__spinner, facet-filters-form .loading__spinner'
    );
    loadingSpinners.forEach((spinner) => spinner.classList.add('hidden'));
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
    const facetDetailsElementsFromFetch = parsedHTML.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );
    const facetDetailsElementsFromDom = document.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );

    // Remove facets that are no longer returned from the server
    Array.from(facetDetailsElementsFromDom).forEach((currentElement) => {
      if (!Array.from(facetDetailsElementsFromFetch).some(({ id }) => currentElement.id === id)) {
        currentElement.remove();
      }
    });

    const matchesId = (element) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.id === jsFilter.id : false;
    };

    const facetsToRender = Array.from(facetDetailsElementsFromFetch).filter((element) => !matchesId(element));
    const countsToRender = Array.from(facetDetailsElementsFromFetch).find(matchesId);

    facetsToRender.forEach((elementToRender, index) => {
      const currentElement = document.getElementById(elementToRender.id);
      // Element already rendered in the DOM so just update the innerHTML
      if (currentElement) {
        document.getElementById(elementToRender.id).innerHTML = elementToRender.innerHTML;
      } else {
        if (index > 0) {
          const { className: previousElementClassName, id: previousElementId } = facetsToRender[index - 1];
          // Same facet type (eg horizontal/vertical or drawer/mobile)
          if (elementToRender.className === previousElementClassName) {
            document.getElementById(previousElementId).after(elementToRender);
            return;
          }
        }

        if (elementToRender.parentElement) {
          document.querySelector(`#${elementToRender.parentElement.id} .js-filter`).before(elementToRender);
        }
      }
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) {
      const closestJSFilterID = event.target.closest('.js-filter').id;

      if (closestJSFilterID) {
        FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
        FacetFiltersForm.renderMobileCounts(countsToRender, document.getElementById(closestJSFilterID));

        const newFacetDetailsElement = document.getElementById(closestJSFilterID);
        const newElementSelector = newFacetDetailsElement.classList.contains('mobile-facets__details')
          ? `.mobile-facets__close-button`
          : `.facets__summary`;
        const newElementToActivate = newFacetDetailsElement.querySelector(newElementSelector);

        const isTextInput = event.target.getAttribute('type') === 'text';

        if (newElementToActivate && !isTextInput) newElementToActivate.focus();
      }
    }
  }

  static renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    });

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
  }

  static renderCounts(source, target) {
    const targetSummary = target.querySelector('.facets__summary');
    const sourceSummary = source.querySelector('.facets__summary');

    if (sourceSummary && targetSummary) {
      targetSummary.outerHTML = sourceSummary.outerHTML;
    }

    const targetHeaderElement = target.querySelector('.facets__header');
    const sourceHeaderElement = source.querySelector('.facets__header');

    if (sourceHeaderElement && targetHeaderElement) {
      targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML;
    }

    const targetWrapElement = target.querySelector('.facets-wrap');
    const sourceWrapElement = source.querySelector('.facets-wrap');

    if (sourceWrapElement && targetWrapElement) {
      const isShowingMore = Boolean(target.querySelector('show-more-button .label-show-more.hidden'));
      if (isShowingMore) {
        sourceWrapElement
          .querySelectorAll('.facets__item.hidden')
          .forEach((hiddenItem) => hiddenItem.classList.replace('hidden', 'show-more-item'));
      }

      targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
    }
  }

  static renderMobileCounts(source, target) {
    const targetFacetsList = target.querySelector('.mobile-facets__list');
    const sourceFacetsList = source.querySelector('.mobile-facets__list');

    if (sourceFacetsList && targetFacetsList) {
      targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
    }
  }

  static updateURLHash(searchParams) {
    history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      },
    ];
  }

  createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  }

  onSubmitForm(searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll('facet-filters-form form');
    if (event.srcElement.className == 'mobile-facets__checkbox') {
      const searchParams = this.createSearchParams(event.target.closest('form'));
      this.onSubmitForm(searchParams, event);
    } else {
      const forms = [];
      const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach((form) => {
        if (!isMobile) {
          if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
            forms.push(this.createSearchParams(form));
          }
        } else if (form.id === 'FacetFiltersFormMobile') {
          forms.push(this.createSearchParams(form));
        }
      });
      this.onSubmitForm(forms.join('&'), event);
    }
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url =
      event.currentTarget.href.indexOf('?') == -1
        ? ''
        : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    FacetFiltersForm.renderPage(url);
  }
}
```
This code defines a custom web element named `FacetFiltersForm`. It appears to be a complex component that manages product filtering and refinement functionalities on an e-commerce website. Here's a breakdown of its functionalities:

**Overall Functionality:**

- Handles user interactions with filter options (checkboxes, text inputs, etc.) in the facet navigation section.
- Updates the product grid, product counts, and active filters based on the selected filters.
- Manages URL updates to reflect the current filter selections.

**Key Methods:**

- **`constructor`:**
    - Sets up initial event listeners for form submissions and facet navigation clicks.
    - Binds necessary functions to the component instance.
- **`static setListeners`:**
    - Attaches a listener for the `popstate` event to handle browser history changes and potentially re-render the product grid with updated filters based on the URL.
- **`static toggleActiveFacets`:**
    - Enables or disables visual elements for displaying currently active filters.
- **`static renderPage`:**
    - The core function that triggers the update of the product grid and other elements based on the provided search parameters (filter selections).
        - Fetches product data from the server based on the search parameters.
        - Parses the fetched HTML response to extract relevant sections.
        - Calls various rendering functions to update:
            - Product grid container with new products.
            - Product count information.
            - Filter details (potentially including new options based on the current selection).
            - Active facet information.
            - Additional elements (mobile menus, sorting options, etc.).
        - Updates the URL hash with the new search parameters.
- **`static renderSectionFromFetch`:**
    - Fetches product data for a specific section (category) based on the URL and search parameters.
    - Renders the product grid container, product count, and filters from the fetched HTML response.
- **`static renderSectionFromCache`:**
    - If product data for a section is already available in the component's cache, uses that data to render the product grid container, product count, and filters.
- **`static renderProductGridContainer`:**
    - Updates the product grid container with the fetched product data, replacing the existing content.
- **`static renderProductCount`:**
    - Updates the product count elements with the fetched product count information.
- **`static renderFilters`:**
    - Updates the filter details section based on the fetched HTML response.
        - Removes outdated filter options no longer available based on the current selection.
        - Identifies newly added filter options and inserts them in the appropriate position within the existing filter structure.
        - Updates the content of existing filter options based on the fetched data.
    - Re-renders the active facet information.
    - Updates additional elements potentially included in the filter section.
- **`static renderActiveFacets`:**
    - Updates the section displaying currently active filters with the content from the fetched HTML response.
- **`static renderAdditionalElements`:**
    - Updates mobile-specific elements like the "open filters" button, filter counts, and sorting options based on the fetched HTML response.
    - Re-binds event listeners to the mobile menu drawer.
- **`static renderCounts`:**
    - Updates the summary information and header elements within a specific filter element based on the content from another filter element (presumably used for syncing mobile and desktop filter summaries).
- **`static renderMobileCounts`:**
    - Updates the mobile facet list with the content from the fetched HTML response.
- **`static updateURLHash`:**
    - Updates the URL hash with the current search parameters, effectively creating a bookmarkable state for the filtered product selection.
- **`static getSections`:**
    - Defines the sections (categories) to be considered for filtering, likely based on data attributes in the HTML structure.
- **`createSearchParams`:**
    - Converts a form element and its selections into a URL search parameter string.
- **`onSubmitForm`:**
    - Triggers the rendering process based on the provided search parameters or a form submission event.
- **`onSubmitHandler`:**
    - Handles form submissions within the facet navigation section.
        - Prevents default form submission behavior.
        - Distinguishes between mobile and desktop filter forms.
        - Calls `createSearchParams` to convert form data into search parameters.
        - Calls `onSubmitForm` to trigger product grid and filter updates based on the search parameters.
- **`onActiveFilterClick`:**
    - Handles clicks on the "Active Filters" section.
        - Prevents default link behavior.
        - Extracts search parameters from the clicked link.
        - Calls `renderPage`
        - Triggers product grid and filter updates based on the extracted search parameters using `renderPage`.

**Additional Notes:**

- The component utilizes a caching mechanism (`FacetFiltersForm.filterData`) to store previously fetched product data for sections. This helps improve performance by avoiding redundant server requests for sections that haven't changed.
- Debouncing is used on form input events (`debounce((event) => {...}, 800)`) to prevent excessive rendering triggered by rapid user input. This likely optimizes performance by waiting for a short pause after the user stops typing before re-filtering the products.
- The code interacts with various selectors targeting HTML elements with specific classes or IDs. This suggests a dependency on a particular design system or CSS framework for styling the filter navigation and product grid.

Overall, the `FacetFiltersForm` custom element provides a comprehensive solution for managing dynamic product filtering and updates on an e-commerce website. It offers a user-friendly experience by allowing for interactive filter selections, real-time product grid updates, and URL synchronization to reflect the current filter state.

## 18. Price Range Class
```javascript
class PriceRange extends HTMLElement {
  constructor() {
    super();
    this.querySelectorAll('input').forEach((element) => {
      element.addEventListener('change', this.onRangeChange.bind(this));
      element.addEventListener('keydown', this.onKeyDown.bind(this));
    });
    this.setMinAndMaxValues();
  }

  onRangeChange(event) {
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValues();
  }

  onKeyDown(event) {
    if (event.metaKey) return;

    const pattern = /[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/;
    if (!event.key.match(pattern)) event.preventDefault();
  }

  setMinAndMaxValues() {
    const inputs = this.querySelectorAll('input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    if (maxInput.value) minInput.setAttribute('data-max', maxInput.value);
    if (minInput.value) maxInput.setAttribute('data-min', minInput.value);
    if (minInput.value === '') maxInput.setAttribute('data-min', 0);
    if (maxInput.value === '') minInput.setAttribute('data-max', maxInput.getAttribute('data-max'));
  }

  adjustToValidValues(input) {
    const value = Number(input.value);
    const min = Number(input.getAttribute('data-min'));
    const max = Number(input.getAttribute('data-max'));

    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }
}

customElements.define('price-range', PriceRange);
```
## PriceRange Custom Element Explained

This code defines a custom web element named `price-range`. It appears to be used for creating a dynamic price range selection component on a website, likely for product filtering. Here's a breakdown of its functionalities:

**Functionality:**

- Provides two input fields for users to specify the minimum and maximum price range.
- Validates user input to ensure entered values are within a valid range.
- Enforces a two-way interaction between the input fields, where entering a value in one field automatically adjusts the allowed range for the other field.

**Key Methods:**

- **`constructor`:**
    - Initializes the component by:
        - Selecting all input elements within the custom element.
        - Attaching event listeners for `change` and `keydown` events to each input element. These listeners are bound to the component instance (`this`) to ensure proper context within the event handler functions.
        - Calling `setMinAndMaxValues` to set initial data attributes for allowed range on each input field.
- **`onRangeChange` (Event Handler):**
    - Triggered when the value of an input field changes (through user interaction or programmatic updates).
        - Calls `adjustToValidValues` to ensure the entered value is within the allowed range for that specific input field.
        - Calls `setMinAndMaxValues` to update the data attributes for allowed range on both input fields based on the current values.
- **`onKeyDown` (Event Handler):**
    - Triggered when a key is pressed within an input field.
        - Prevents default behavior for meta key presses (e.g., Cmd+C for copy).
        - Defines a regular expression pattern to allow only valid characters for price input:
            - Numbers (0-9)
            - Decimal point (.)
            - Comma (,) for potential locale-specific formatting
            - Apostrophe (') for potential locale-specific formatting
            - Space ( )
            - Navigation keys (Tab, Backspace, Enter, Arrow keys)
            - Delete key
            - Escape key
        - If the pressed key doesn't match the allowed pattern, the event is prevented, effectively disallowing invalid input.
- **`setMinAndMaxValues`:**
    - Sets data attributes on the input fields to define the allowed range for each.
        - Retrieves all input elements within the custom element.
        - Identifies the minimum and maximum input fields based on their order.
        - Sets the `data-max` attribute on the minimum input field to the value of the maximum input field, if it exists. This creates a dynamic upper bound for the minimum price.
        - Vice versa, sets the `data-min` attribute on the maximum input field to the value of the minimum input field, if it exists. This creates a dynamic lower bound for the maximum price.
        - Ensures that even if an input field is empty, there's still a valid default range:
            - If the minimum input is empty, sets its `data-max` to 0.
            - If the maximum input is empty, sets its `data-min` to the existing value of its `data-max` attribute (if any), effectively keeping the previously set upper bound.
- **`adjustToValidValues`:**
    - Ensures the entered value in an input field is within the allowed range.
        - Gets the numeric value from the input field.
        - Retrieves the minimum and maximum allowed values from the data attributes of the input field.
        - If the entered value is less than the minimum, sets the input field's value to the minimum allowed value.
        - If the entered value is greater than the maximum, sets the input field's value to the maximum allowed value.

**Overall:**

The `PriceRange` custom element provides a user-friendly and interactive way for users to select a price range for filtering products or other similar use cases. It enforces data validation to ensure users enter valid numeric values and dynamically adjusts the allowed range for each input field based on the other, creating a cohesive and intuitive price selection experience.

## 19. FacetRemove Class
```javascript
class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
    });
  }

  closeFilter(event) {
    event.preventDefault();
    const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
  }
}

customElements.define('facet-remove', FacetRemove);
```
This code defines a custom web element named `facet-remove`. It represents a clickable element, likely displayed within the active filters section, that allows users to remove a specific filter selection.

**Functionality:**

- Provides a visually styled element (likely an icon or text link) for users to interact with.
- Triggers the removal of the corresponding filter when clicked or activated via keyboard (space key).

**Key Methods:**

- **`constructor`:**
    - Initializes the component by:
        - Selecting the anchor (`a`) element within the custom element, assuming this element represents the clickable portion.
        - Sets the `role` attribute of the anchor element to "button" for better accessibility, indicating it's an interactive element used for triggering actions.
        - Attaches event listeners to the anchor element:
            - `click`: Calls the `closeFilter` function when the element is clicked. This event handler is bound to the component instance (`this`) to ensure proper context within the function.
            - `keyup`: Handles keyboard interaction. Prevents default behavior to avoid potential link navigation and calls `closeFilter` if the user presses the space key while focused on the element.
- **`closeFilter` (Event Handler):**
    - Triggered when the user clicks the element or presses the space key while focused on it.
        - Prevents default click behavior (which might be set on the parent anchor element).
        - Finds the closest ancestor element with the class `facet-filters-form`. This allows the `FacetRemove` element to function within different filter section layouts. If not found within the closest ancestor, it falls back to finding any `facet-filters-form` element on the page.
        - Calls the `onActiveFilterClick` method of the found `facet-filters-form` element, effectively delegating the filter removal logic to the parent component. This likely triggers the form to submit an updated search request without the removed filter.

**Overall:**

The `FacetRemove` custom element provides a user-friendly way to remove individual filters from the active filter section. It leverages event delegation to trigger the appropriate logic within the parent `FacetFiltersForm` component, promoting code reusability and maintainability.

## 20. constant.js
```javascript
const ON_CHANGE_DEBOUNCE_TIMER = 300;

const PUB_SUB_EVENTS = {
  cartUpdate: 'cart-update',
  quantityUpdate: 'quantity-update',
  variantChange: 'variant-change',
  cartError: 'cart-error',
};
```

## 21. Customer Address Class
```javascript
const selectors = {
  customerAddresses: '[data-customer-addresses]',
  addressCountrySelect: '[data-address-country-select]',
  addressContainer: '[data-address]',
  toggleAddressButton: 'button[aria-expanded]',
  cancelAddressButton: 'button[type="reset"]',
  deleteAddressButton: 'button[data-confirm-message]',
};

const attributes = {
  expanded: 'aria-expanded',
  confirmMessage: 'data-confirm-message',
};

class CustomerAddresses {
  constructor() {
    this.elements = this._getElements();
    if (Object.keys(this.elements).length === 0) return;
    this._setupCountries();
    this._setupEventListeners();
  }

  _getElements() {
    const container = document.querySelector(selectors.customerAddresses);
    return container
      ? {
          container,
          addressContainer: container.querySelector(selectors.addressContainer),
          toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
          cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
          deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
          countrySelects: container.querySelectorAll(selectors.addressCountrySelect),
        }
      : {};
  }

  _setupCountries() {
    if (Shopify && Shopify.CountryProvinceSelector) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
        hideElement: 'AddressProvinceContainerNew',
      });
      this.elements.countrySelects.forEach((select) => {
        const formId = select.dataset.formId;
        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
          hideElement: `AddressProvinceContainer_${formId}`,
        });
      });
    }
  }

  _setupEventListeners() {
    this.elements.toggleButtons.forEach((element) => {
      element.addEventListener('click', this._handleAddEditButtonClick);
    });
    this.elements.cancelButtons.forEach((element) => {
      element.addEventListener('click', this._handleCancelButtonClick);
    });
    this.elements.deleteButtons.forEach((element) => {
      element.addEventListener('click', this._handleDeleteButtonClick);
    });
  }

  _toggleExpanded(target) {
    target.setAttribute(attributes.expanded, (target.getAttribute(attributes.expanded) === 'false').toString());
  }

  _handleAddEditButtonClick = ({ currentTarget }) => {
    this._toggleExpanded(currentTarget);
  };

  _handleCancelButtonClick = ({ currentTarget }) => {
    this._toggleExpanded(currentTarget.closest(selectors.addressContainer).querySelector(`[${attributes.expanded}]`));
  };

  _handleDeleteButtonClick = ({ currentTarget }) => {
    // eslint-disable-next-line no-alert
    if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
      Shopify.postLink(currentTarget.dataset.target, {
        parameters: { _method: 'delete' },
      });
    }
  };
}
```
This code defines a JavaScript class named `CustomerAddresses`. It appears to manage the functionality of a customer address section on a Shopify storefront. Here's a breakdown of its functionalities:

**Functionality:**

- Manages the opening/closing of address edit forms for adding or editing customer addresses.
- Handles user interactions with buttons for adding, canceling, and deleting addresses.
- Integrates with Shopify's built-in `CountryProvinceSelector` for dynamic country and province selection within address forms.

**Key Properties:**

- **`selectors` (Object):** Defines CSS selectors used to target specific elements within the customer address section.
- **`attributes` (Object):** Defines attributes used on elements within the customer address section.
- **`elements` (Object):** Stores references to various UI elements retrieved from the DOM using the defined selectors.

**Key Methods:**

- **`constructor`:**
    - Initializes the component by:
        - Calling `_getElements` to retrieve references to relevant DOM elements.
        - Checking if any elements were found. If not, the component exits without further processing.
        - Calling `_setupCountries` to initiate the country and province selection functionality.
        - Calling `_setupEventListeners` to attach event listeners to various UI elements.
- **`_getElements`:**
    - Retrieves references to various UI elements within the customer address section using the defined selectors.
        - Returns an object containing references to the container element, address container elements, toggle buttons for expanding/collapsing address forms, cancel buttons within address forms, delete buttons for addresses, and country selection elements within address forms.
- **`_setupCountries` (Conditional):**
    - Checks if the `Shopify` object and its `CountryProvinceSelector` function exist (indicating we're on a Shopify storefront).
        - If available, it initializes multiple instances of Shopify's country and province selector for:
            - A potentially global address form (using IDs `AddressCountryNew` and `AddressProvinceNew`).
            - Individual address forms within the section, identified by their form ID (using dynamic IDs based on the `data-formId` attribute).
- **`_setupEventListeners`:**
    - Attaches event listeners to relevant UI elements:
        - Toggle buttons for expanding/collapsing address forms: Calls `_handleAddEditButtonClick` on click.
        - Cancel buttons within address forms: Calls `_handleCancelButtonClick` on click.
        - Delete buttons for addresses: Calls `_handleDeleteButtonClick` on click.
- **`_toggleExpanded`:**
    - Toggles the `aria-expanded` attribute on a target element to control its expanded/collapsed state based on its current value.
- **`_handleAddEditButtonClick`:**
    - Handles clicks on toggle buttons for expanding/collapsing address forms.
        - Calls `_toggleExpanded` on the clicked button to show or hide the corresponding address edit form.
- **`_handleCancelButtonClick`:**
    - Handles clicks on cancel buttons within address forms.
        - Finds the closest ancestor element with the `data-address` attribute (representing the address container).
        - Within that container, finds the element with the `aria-expanded` attribute (presumably the toggle button for that address form).
        - Calls `_toggleExpanded` on the found toggle button to collapse the address edit form.
- **`_handleDeleteButtonClick`:**
    - Handles clicks on delete buttons for addresses.
        - Confirms the deletion with a browser confirmation dialog using the `data-confirm-message` attribute of the button.
        - If confirmed, uses Shopify's `postLink` function to send a POST request with the `_method: 'delete'` parameter to the URL specified in the `data-target` attribute of the button. This likely triggers deletion of the associated customer address on the server-side.

**Overall:**

The `CustomerAddresses` class provides a well-structured solution for managing customer addresses on a Shopify storefront. It utilizes Shopify's built-in functionalities for country and province selection and offers a user-friendly experience for adding, editing, and deleting customer addresses.

## 22. DetailsDisclosure Class
```javascript
class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);
```
This code defines a custom web element named `details-disclosure`. It appears to be a wrapper component that enhances the behavior of the native `<details>` and `<summary>` HTML elements for creating disclosure widgets. Here's a breakdown of its functionalities:

**Functionality:**

- Provides a more robust solution for handling focus and open/closed state management of the disclosure widget.
- Optionally integrates with CSS animations for a smoother visual transition when opening or closing the disclosure content.

**Key Methods:**

- **`constructor`:**
    - Initializes the component by:
        - Calling `super()` to inherit functionalities from the `HTMLElement` class.
        - Selecting the main `<details>` element within the custom element.
        - Selecting the content section of the disclosure (the element following the `<summary>` element) within the main details element.
        - Attaching event listeners:
            - `focusout`: Calls `onFocusOut` when the element loses focus. This is bound to the component instance (`this`) to ensure proper context within the function.
            - `toggle`: Calls `onToggle` whenever the open/closed state of the disclosure changes (triggered by user interaction or programmatic manipulation).
- **`onFocusOut` (Event Handler):**
    - Ensures the disclosure closes automatically if the user focuses outside the entire component (including the summary and content) after a slight delay.
        - Uses `setTimeout` to schedule a function call after a short delay (likely to avoid accidental closing due to brief focus changes).
        - Within the delayed function, checks if the currently focused element (using `document.activeElement`) is not a descendant of the current component using `this.contains`. If not, it calls the `close` method to collapse the disclosure.
- **`onToggle` (Event Handler):**
    - Reacts to the open/closed state changes of the disclosure.
        - Lazily initializes the `animations` property on first toggle by fetching all animation objects associated with the disclosure content element using `getAnimations`.
        - Checks the `open` attribute on the main details element:
            - If open (attribute exists), it iterates through the retrieved animations and plays each one, presumably triggering the visual opening animation for the disclosure content.
            - If closed (attribute absent), it iterates through the animations and cancels any ongoing or queued animations, ensuring a smooth closing transition.
- **`close`:**
    - Programmatically closes the disclosure.
        - Removes the `open` attribute from the main details element, effectively collapsing it.
        - Sets the `aria-expanded` attribute of the `<summary>` element to `false`, updating the accessibility state for screen readers.  

**Overall:**

The `DetailsDisclosure` custom element enhances the usability and accessibility of the native `<details>` element. It provides automatic closing behavior based on focus management and integrates with CSS animations for a more polished user experience.

## 23. HeaderMenu Class
```javascript
class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}
customElements.define('header-menu', HeaderMenu);
```
This code builds upon the previously defined `DetailsDisclosure` custom element to create a `HeaderMenu` component specifically designed for a header section with a dropdown menu.

**Functionality:**

- Inherits all functionalities from `DetailsDisclosure` for managing the open/closed state and focus behavior of the menu.
- Synchronizes the open/closed state of the menu with a custom CSS variable (`--header-bottom-position-desktop`) that likely controls the positioning of the header section on the desktop view.

**Key Methods:**

- **`constructor`:**
    - Extends the `DetailsDisclosure` class, inheriting its functionalities.
    - Selects the element with the class `header-wrapper` from the DOM, assuming this represents the header section.
- **`onToggle` (Override):**
    - Overrides the `onToggle` method from `DetailsDisclosure`.
        - Checks if the `header` element was successfully retrieved earlier. If not, it exits the function.
        - Sets a custom property (`preventHide`) on the `header` element. This likely serves as a flag to prevent the header from being hidden under certain conditions. The value is set to the `open` property of the `mainDetailsToggle` element, effectively mirroring the open/closed state of the menu.
        - Checks if a specific CSS variable (`--header-bottom-position-desktop`) has already been set. This likely indicates a previous calculation has already been done and avoids redundant calculations on every toggle.
        - If the variable isn't set, it retrieves the bottom position of the header element using `getBoundingClientRect` and sets the `--header-bottom-position-desktop` CSS variable on the `document.documentElement` element. This stores the vertical position of the header's bottom edge, likely used for desktop-specific layout adjustments based on the menu's open/closed state.

**Overall:**

The `HeaderMenu` custom element provides a cohesive interaction between the header menu (likely a dropdown menu) and the overall header section layout. It leverages the `DetailsDisclosure` component for core menu functionality and dynamically updates a CSS variable to control the header's positioning based on whether the menu is open or closed. This ensures proper layout adjustments for the header section on the desktop view.

## DetailsModel Class
```javascript
class DetailsModal extends HTMLElement {
  constructor() {
    super();
    this.detailsContainer = this.querySelector('details');
    this.summaryToggle = this.querySelector('summary');

    this.detailsContainer.addEventListener('keyup', (event) => event.code.toUpperCase() === 'ESCAPE' && this.close());
    this.summaryToggle.addEventListener('click', this.onSummaryClick.bind(this));
    this.querySelector('button[type="button"]').addEventListener('click', this.close.bind(this));

    this.summaryToggle.setAttribute('role', 'button');
  }

  isOpen() {
    return this.detailsContainer.hasAttribute('open');
  }

  onSummaryClick(event) {
    event.preventDefault();
    event.target.closest('details').hasAttribute('open') ? this.close() : this.open(event);
  }

  onBodyClick(event) {
    if (!this.contains(event.target) || event.target.classList.contains('modal-overlay')) this.close(false);
  }

  open(event) {
    this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this);
    event.target.closest('details').setAttribute('open', true);
    document.body.addEventListener('click', this.onBodyClickEvent);
    document.body.classList.add('overflow-hidden');

    trapFocus(
      this.detailsContainer.querySelector('[tabindex="-1"]'),
      this.detailsContainer.querySelector('input:not([type="hidden"])')
    );
  }

  close(focusToggle = true) {
    removeTrapFocus(focusToggle ? this.summaryToggle : null);
    this.detailsContainer.removeAttribute('open');
    document.body.removeEventListener('click', this.onBodyClickEvent);
    document.body.classList.remove('overflow-hidden');
  }
}

customElements.define('details-modal', DetailsModal);
```
This code defines a custom web element named `DetailsModal`. It appears to create a modal dialog based on the native `<details>` and `<summary>` elements, enhancing its functionality with accessibility features and interaction controls.

**Functionality:**

- Provides a modal dialog that opens and closes based on user interactions.
- Handles keyboard accessibility (Escape key for closing) and screen reader compatibility.
- Prevents background interaction while the modal is open (optional close on outside click).
- Traps focus within the modal content to ensure keyboard navigation stays within the dialog.

**Key Methods:**

- **`constructor`:**
    - Initializes the component by:
        - Calling `super()` to inherit functionalities from the `HTMLElement` class.
        - Selecting the main `<details>` element within the custom element.
        - Selecting the `<summary>` element within the custom element.
        - Attaching event listeners:
            - `keyup` on the `<details>` element: Listens for the Escape key press (identified by code) and calls `close` to close the modal.
            - `click` on the `<summary>` element: Calls `onSummaryClick` (bound to the component instance) to handle summary toggle clicks.
            - `click` on the first button element with type "button": Calls `close` (bound to the component instance) to provide a close button functionality.
        - Sets the `role` attribute of the `<summary>` element to "button" for better accessibility, indicating it's an interactive element used for triggering actions.
- **`isOpen`:**
    - Simple getter function that checks if the `open` attribute is present on the main `<details>` element, indicating if the modal is currently open.
- **`onSummaryClick` (Event Handler):**
    - Handles clicks on the `<summary>` element (likely used to open/close the modal).
        - Prevents default click behavior.
        - Checks if the closest ancestor `<details>` element already has the `open` attribute (indicating the modal is open).
            - If open, calls `close` to close the modal.
            - If closed, calls `open` with the click event object as an argument (potentially for further processing within `open`).
- **`onBodyClick` (Event Handler):**
    - Handles clicks on the document body element (potentially used to close the modal by clicking outside).
        - Checks if the clicked element is either a descendant of the current component or has the class `modal-overlay` (likely used for a visual overlay element). If either condition is met, the click is considered within the modal area and is ignored.
        - Otherwise, calls `close` with an optional argument `false` (potentially used internally to indicate the close was triggered by an outside click).
- **`open` (Event Handler):**
    - Opens the modal dialog.
        - Lazily initializes the `onBodyClickEvent` property on first open by binding `onBodyClick` to the component instance.
        - Sets the `open` attribute on the closest ancestor `<details>` element, effectively opening the modal.
        - Attaches an event listener for clicks on the document body using the previously bound `onBodyClickEvent` function. This allows for closing the modal when clicking outside its content area.
        - Adds the class `overflow-hidden` to the document body, likely to prevent scrolling while the modal is open.
        - Calls `trapFocus` (assumed to be an external function) to trap focus within the modal content. This ensures keyboard navigation stays within the dialog for a better user experience. The function likely receives two elements:
            - The first element to receive focus when the modal opens (potentially a hidden element with a tabindex of -1).
            - The first focusable element within the modal content (likely the first input field).
- **`close` (Optional Focus Argument):**
    - Closes the modal dialog.
        - Calls `removeTrapFocus` (assumed to be an external function) to remove any previously set focus trapping within the modal.
        - Optionally accepts a boolean argument `focusToggle` (defaults to `true`).
            - If `true`, sets focus back to the `<summary>` element after closing the modal.
            - If `false` (potentially passed from `onBodyClick` when closing by outside click), focus is not explicitly set.
        - Removes the `open` attribute from the main `<details>` element, effectively closing the modal.
        - Removes the event listener for clicks on the document body.
        - Removes the `overflow-hidden` class from the document body.

**Overall:**

The `DetailsModal` custom element provides a robust and accessible implementation for creating modal dialogs using the `<details>` and `<summary>` elements. It offers

## Localization Form
```javascript
if (!customElements.get('localization-form')) {
  customElements.define(
    'localization-form',
    class LocalizationForm extends HTMLElement {
      constructor() {
        super();
        this.mql = window.matchMedia('(min-width: 750px)');
        this.header = document.querySelector('.header-wrapper');
        this.elements = {
          input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
          button: this.querySelector('button.localization-form__select'),
          panel: this.querySelector('.disclosure__list-wrapper'),
          search: this.querySelector('input[name="country_filter"]'),
          closeButton: this.querySelector('.country-selector__close-button'),
          resetButton: this.querySelector('.country-filter__reset-button'),
          searchIcon: this.querySelector('.country-filter__search-icon'),
          liveRegion: this.querySelector('#sr-country-search-results'),
        };
        this.addEventListener('keyup', this.onContainerKeyUp.bind(this));
        this.addEventListener('keydown', this.onContainerKeyDown.bind(this));
        this.addEventListener('focusout', this.closeSelector.bind(this));
        this.elements.button.addEventListener('click', this.openSelector.bind(this));

        if (this.elements.search) {
          this.elements.search.addEventListener('keyup', this.filterCountries.bind(this));
          this.elements.search.addEventListener('focus', this.onSearchFocus.bind(this));
          this.elements.search.addEventListener('blur', this.onSearchBlur.bind(this));
          this.elements.search.addEventListener('keydown', this.onSearchKeyDown.bind(this));
        }
        if (this.elements.closeButton) {
          this.elements.closeButton.addEventListener('click', this.hidePanel.bind(this));
        }
        if (this.elements.resetButton) {
          this.elements.resetButton.addEventListener('click', this.resetFilter.bind(this));
          this.elements.resetButton.addEventListener('mousedown', (event) => event.preventDefault());
        }

        this.querySelectorAll('a').forEach((item) => item.addEventListener('click', this.onItemClick.bind(this)));
      }

      hidePanel() {
        this.elements.button.setAttribute('aria-expanded', 'false');
        this.elements.panel.setAttribute('hidden', true);
        if (this.elements.search) {
          this.elements.search.value = '';
          this.filterCountries();
          this.elements.search.setAttribute('aria-activedescendant', '');
        }
        document.body.classList.remove('overflow-hidden-mobile');
        document.querySelector('.menu-drawer').classList.remove('country-selector-open');
        this.header.preventHide = false;
      }

      onContainerKeyDown(event) {
        const focusableItems = Array.from(this.querySelectorAll('a')).filter(
          (item) => !item.parentElement.classList.contains('hidden')
        );
        let focusedItemIndex = focusableItems.findIndex((item) => item === document.activeElement);
        let itemToFocus;

        switch (event.code.toUpperCase()) {
          case 'ARROWUP':
            event.preventDefault();
            itemToFocus =
              focusedItemIndex > 0 ? focusableItems[focusedItemIndex - 1] : focusableItems[focusableItems.length - 1];
            itemToFocus.focus();
            break;
          case 'ARROWDOWN':
            event.preventDefault();
            itemToFocus =
              focusedItemIndex < focusableItems.length - 1 ? focusableItems[focusedItemIndex + 1] : focusableItems[0];
            itemToFocus.focus();
            break;
        }

        if (!this.elements.search) return;

        setTimeout(() => {
          focusedItemIndex = focusableItems.findIndex((item) => item === document.activeElement);
          if (focusedItemIndex > -1) {
            this.elements.search.setAttribute('aria-activedescendant', focusableItems[focusedItemIndex].id);
          } else {
            this.elements.search.setAttribute('aria-activedescendant', '');
          }
        });
      }

      onContainerKeyUp(event) {
        event.preventDefault();

        switch (event.code.toUpperCase()) {
          case 'ESCAPE':
            if (this.elements.button.getAttribute('aria-expanded') == 'false') return;
            this.hidePanel();
            event.stopPropagation();
            this.elements.button.focus();
            break;
          case 'SPACE':
            if (this.elements.button.getAttribute('aria-expanded') == 'true') return;
            this.openSelector();
            break;
        }
      }

      onItemClick(event) {
        event.preventDefault();
        const form = this.querySelector('form');
        this.elements.input.value = event.currentTarget.dataset.value;
        if (form) form.submit();
      }

      openSelector() {
        this.elements.button.focus();
        this.elements.panel.toggleAttribute('hidden');
        this.elements.button.setAttribute(
          'aria-expanded',
          (this.elements.button.getAttribute('aria-expanded') === 'false').toString()
        );
        if (!document.body.classList.contains('overflow-hidden-tablet')) {
          document.body.classList.add('overflow-hidden-mobile');
        }
        if (this.elements.search && this.mql.matches) {
          this.elements.search.focus();
        }
        if (this.hasAttribute('data-prevent-hide')) {
          this.header.preventHide = true;
        }
        document.querySelector('.menu-drawer').classList.add('country-selector-open');
      }

      closeSelector(event) {
        if (
          event.target.classList.contains('country-selector__overlay') ||
          !this.contains(event.target) ||
          !this.contains(event.relatedTarget)
        ) {
          this.hidePanel();
        }
      }

      filterCountries() {
        const searchValue = this.elements.search.value.toLowerCase();
        const popularCountries = this.querySelector('.popular-countries');
        const allCountries = this.querySelectorAll('a');
        let visibleCountries = allCountries.length;

        this.elements.resetButton.classList.toggle('hidden', !searchValue);

        if (popularCountries) {
          popularCountries.classList.toggle('hidden', searchValue);
        }

        allCountries.forEach((item) => {
          const countryName = item.querySelector('.country').textContent.toLowerCase();
          if (countryName.indexOf(searchValue) > -1) {
            item.parentElement.classList.remove('hidden');
            visibleCountries++;
          } else {
            item.parentElement.classList.add('hidden');
            visibleCountries--;
          }
        });

        if (this.elements.liveRegion) {
          this.elements.liveRegion.innerHTML = window.accessibilityStrings.countrySelectorSearchCount.replace(
            '[count]',
            visibleCountries
          );
        }

        this.querySelector('.country-selector').scrollTop = 0;
        this.querySelector('.country-selector__list').scrollTop = 0;
      }

      resetFilter(event) {
        event.stopPropagation();
        this.elements.search.value = '';
        this.filterCountries();
        this.elements.search.focus();
      }

      onSearchFocus() {
        this.elements.searchIcon.classList.add('country-filter__search-icon--hidden');
      }

      onSearchBlur() {
        if (!this.elements.search.value) {
          this.elements.searchIcon.classList.remove('country-filter__search-icon--hidden');
        }
      }

      onSearchKeyDown(event) {
        if (event.code.toUpperCase() === 'ENTER') {
          event.preventDefault();
        }
      }
    }
  );
}
```
## Detailed Explanation of the `localization-form` Code

This code defines a custom web component named `localization-form` specifically designed to manage a form for selecting a user's locale and country. Here's a breakdown of the code with more details:

**1. Checking for Existing Custom Element:**

```javascript
if (!customElements.get('localization-form')) {
  // ... rest of the code defining the element
}
```

- This code snippet checks if a custom element named `localization-form` is already registered using the `customElements.get` method.
- If `customElements.get('localization-form')` returns `null`, it means the element isn't defined yet. 
- The code then proceeds to define the new element using the `customElements.define` method.

**2. Defining the `LocalizationForm` Class:**

```javascript
customElements.define(
  'localization-form',
  class LocalizationForm extends HTMLElement {
    // ... constructor and methods
  }
);
```

- This line defines a new custom element named `localization-form` using the `customElements.define` method.
- The class definition extends `HTMLElement`, inheriting all the functionalities of standard HTML elements.

**3. The Constructor (`constructor`):**

```javascript
constructor() {
  super();
  // ... element lookups and event listener attachments
}
```

- The constructor is a special function that gets called whenever a new instance of the `LocalizationForm` class is created.
  - `super()`: This calls the constructor of the parent class (`HTMLElement` in this case).
- Inside the constructor:
    - **Media Query Listener (`mql`):**
        - `this.mql = window.matchMedia('(min-width: 750px)');`: This line creates a media query listener object (`mql`) that checks if the screen width is greater than or equal to 750px. This might be used for adjusting the behavior based on screen size (e.g., focusing search input on larger screens).
    - **DOM element lookups:**
        - The code uses various selectors (like `.header-wrapper`, `button.localization-form__select`, etc.) to find references to specific elements within the component's structure in the HTML. These references are stored in the `this.elements` object for easy access later.
    - **Event Listeners:**
        - The code attaches various event listeners to the DOM elements using `addEventListener`. These listeners are defined as separate methods within the class to handle specific functionalities. 

**4. Functionalities:**

Here's a detailed explanation of some crucial methods that handle functionalities within the `LocalizationForm` component:

- **`hidePanel`:** 
    - This function is responsible for hiding the country selection panel.
    - It sets the `aria-expanded` attribute of the button to `false`, indicating the panel is collapsed.
    - It hides the panel element using the `hidden` attribute.
    - If a search input (`this.elements.search`) exists:
        - It clears the search input value.
        - It triggers the `filterCountries` function to re-render the list without filtering.
        - It resets the `aria-activedescendant` attribute (used for screen readers).
    - It removes any classes that might be affecting overflow (e.g., `overflow-hidden-mobile`) from the body element.
    - It removes a class indicating the country selector is open from the menu drawer element.
    - It sets a flag (`header.preventHide`) to allow the header to be hidden again (might be used for preventing the header from hiding while the panel is open).

- **`onContainerKeyDown`:** 
    - This function handles keyboard navigation within the country selection panel using the arrow keys (Up and Down).
    - It first creates an array of focusable items (anchor tags with links) within the panel.
    - It then identifies the currently focused item based on the document's active element.
    - Based on the pressed arrow key (`ARROWUP` or `ARROWDOWN`), it calculates the next focusable item in the list.
    - It prevents default behavior of the event to avoid unintended scrolling.
    - Finally, it focuses on the newly identified item.
    - Additionally, it checks if a search input exists (`this.elements.search`). If yes, it sets the `aria-activedescendant` attribute on the search input to point to the currently focused item (important for screen readers).

- **`onContainerKeyUp`:** 
    - This function handles the Escape key (`ESCAPE`) and Space key (`SPACE`) presses within the component.
    - It prevents default behavior
    - It checks if the panel is already closed (`aria-expanded` attribute) before processing the key press.
        - If the panel is closed (Escape key press), it calls the `hidePanel` function to hide it.
        - It stops the event from bubbling up (stopPropagation) to prevent unintended behavior on parent elements.
        - It focuses back on the button that opens the panel.
    - If the Space key is pressed and the panel is open, it does nothing (the panel is already open).

- **`onItemClick`:** 
    - This function handles clicks on the country options within the panel.
    - It prevents default behavior of the click event to avoid unintended form submission.
    - It retrieves the selected country's value from the clicked element's `data-value` attribute.
    - It updates the hidden form input fields (`this.elements.input`) with the selected value.
    - If a form element (`form`) exists within the component, it submits the form to process the selection.

- **`openSelector`:** 
    - This function opens the country selection panel.
    - It focuses on the button that opens the panel for better accessibility.
    - It toggles the visibility of the panel element using the `hidden` attribute.
    - It updates the `aria-expanded` attribute of the button to reflect the panel's open/closed state.
    - Depending on the screen size (checked using `mql.matches`), it might add a class to the body element to prevent scrolling while the panel is open (e.g., `overflow-hidden-mobile`).
    - If a search input exists (`this.elements.search`) and the screen size is large enough (based on `mql`), it focuses on the search input for easier filtering.
    - It checks for a `data-prevent-hide` attribute on the component itself. If present, it sets a flag (`header.preventHide`) to prevent the header from hiding while the panel is open (specific behavior based on your website's design).
    - Finally, it adds a class to the menu drawer element to indicate the country selector is open.

**5. Other Functionalities:**

- **`closeSelector`:** 
    - This function handles closing the country selection panel based on the clicked target and focus state.
    - It checks if the user clicked on the overlay element, outside the component itself, or if they clicked on an element that doesn't belong to the component or its currently focused child.
    - If any of these conditions are met, it calls the `hidePanel` function to close the panel.

- **`filterCountries`:** 
    - This function handles filtering the list of countries based on the user's search input.
    - It retrieves the search term in lowercase for case-insensitive matching.
    - It references elements for popular countries (if present) and all countries within the panel.
    - It keeps track of the number of visible countries after filtering.
    - It loops through all country options:
        - It converts the country name to lowercase for comparison.
        - It checks if the country name contains the search term.
            - If it does, it removes the `hidden` class from the country option's parent element, making it visible.
            - If it doesn't, it hides the country option's parent element by adding the `hidden` class.
    - It updates the text content of an element announcing the number of search results (if present), replacing a placeholder with the actual count.
    - Finally, it resets the scroll position of the country selector elements to the top.

- **`resetFilter`:** 
    - This function handles clearing the search input and resetting the filter.
    - It prevents the event from bubbling up (stopPropagation).
    - It clears the search input value.
    - It calls the `filterCountries` function to re-render the list without filtering.
    - It focuses back on the search input for further filtering.

- **`onSearchFocus` and `onSearchBlur`:** 
    - These functions manage the visibility of a search icon based on the focus state of the search input.
    - When the search input gains focus (`onSearchFocus`), it hides the search icon.
    - When the search input loses focus (`onSearchBlur`), it shows the search icon again if the search input is empty. This provides a visual cue for the user to locate the search functionality.

- **`onSearchKeyDown` (Continued):**
    - It prevents the default behavior of the Enter key press to avoid unintended form submission or other actions triggered by the key. However, without further context in the surrounding code, it's difficult to determine the exact intended behavior for Enter key press within the search functionality.

- **Accessibility Considerations:**

    - The code utilizes attributes like `aria-expanded` and `aria-activedescendant` to improve accessibility for screen reader users. These attributes communicate the state of the panel (open/closed) and the currently focused item within the panel, respectively.
    - The `liveRegion` element (if present) is likely used to announce the number of search results dynamically to screen reader users, providing feedback on the filtering process.

**Overall, the `localization-form` component offers a well-structured and functional solution for managing user selection of locale and country. It incorporates features like search functionality, keyboard accessibility, and responsiveness to different screen sizes.**
 
I hope this detailed explanation clarifies the functionalities within the `localization-form` code. If you have any further questions or require more specific information about certain parts of the code, feel free to ask!

## createOverlay Function
```javascript
// create a container and set the full-size image as its background
function createOverlay(image) {
  const overlayImage = document.createElement('img');
  overlayImage.setAttribute('src', `${image.src}`);
  overlay = document.createElement('div');
  prepareOverlay(overlay, overlayImage);

  image.style.opacity = '50%';
  toggleLoadingSpinner(image);

  overlayImage.onload = () => {
    toggleLoadingSpinner(image);
    image.parentElement.insertBefore(overlay, image);
    image.style.opacity = '100%';
  };

  return overlay;
}
```
The provided code snippet for the `createOverlay` function defines a functionality to create a container element that displays a full-size image as its background. Let's break down the steps involved:

1. **Creating Elements:**
   - The function takes an `image` element as input, presumably the original image you want to magnify.
   - It creates a new `<img>` element (`overlayImage`) to hold the full-size image.
   - It sets the `src` attribute of `overlayImage` to the same source (`image.src`) as the original image. This ensures the full-size image displayed in the overlay matches the original image.
   - It creates a new `<div>` element (`overlay`) that will serve as the container for the full-size image.

2. **Preparing the Overlay:**
   - The function calls another function named `prepareOverlay` (not shown here). This function likely sets up styles and attributes for the `overlay` container to achieve the desired visual appearance and behavior.

3. **Dimming the Original Image (Optional):**
   - The code sets the `opacity` of the original image (`image`) to 50%. This likely creates a dimming effect when the overlay is displayed, providing visual feedback to the user.

4. **Loading Spinner (Optional):**
   - The code calls a function named `toggleLoadingSpinner` (not shown here). This function presumably controls the visibility of a loading spinner element, potentially indicating that the full-size image is loading.

5. **Handling Full-Size Image Load:**
   - An `onload` event listener is attached to the `overlayImage`. This event fires once the full-size image has finished loading.
     - Inside the event listener:
        - It calls `toggleLoadingSpinner` again, likely hiding the loading spinner if it was previously shown.
        - It uses `insertBefore` to insert the `overlay` container before the original image (`image`) in the DOM structure. This positions the overlay container on top of the original image.
        - Finally, it sets the `opacity` of the original image back to 100%, potentially restoring its full visibility.

6. **Returning the Overlay:**
   - The function returns the created `overlay` element. This allows the caller (potentially another function) to interact with the overlay container further.

Overall, this code snippet provides a foundation for creating an overlay container that displays the full-size image. The `prepareOverlay` function and potentially the `toggleLoadingSpinner` function would need to be defined for complete functionality. 

## prepareOverlay Function
```javascript
function prepareOverlay(container, image) {
  container.setAttribute('class', 'image-magnify-full-size');
  container.setAttribute('aria-hidden', 'true');
  container.style.backgroundImage = `url('${image.src}')`;
  container.style.backgroundColor = 'var(--gradient-background)';
}
```

The provided code for the `prepareOverlay` function defines styles and attributes for the container element created in the `createOverlay` function. Here's a breakdown of what each line does:

1. **Setting Class:**
   - `container.setAttribute('class', 'image-magnify-full-size');`
     - This line sets the class name of the `container` element to `image-magnify-full-size`. This class name can be used in your CSS stylesheet to define the visual appearance of the overlay container, such as its size, position, and potential border or shadow. 

2. **Accessibility:**
   - `container.setAttribute('aria-hidden', 'true');`
     - This line sets the `aria-hidden` attribute of the `container` element to `"true"`. This attribute is used to indicate to assistive technologies (like screen readers) that the element is currently hidden from the user. This is important for accessibility as the overlay initially appears hidden until the full-size image loads.

3. **Background Image:**
   - `container.style.backgroundImage = `url('${image.src}')`;`
     - This line sets the `background-image` style property of the `container` element. It uses a template literal (```) to embed the `image.src` value within a `url()` function. This essentially sets the full-size image you loaded previously (`image` from the `createOverlay` function) as the background image of the container.

4. **Background Color (Optional):**
   - `container.style.backgroundColor = 'var(--gradient-background)';`
     - This line sets the `background-color` style property of the `container` element. It uses a CSS variable `var(--gradient-background)`. This allows you to define a gradient background color (or any other background color) in your CSS and reuse it here without directly specifying the color value in the JavaScript code.

In summary, the `prepareOverlay` function takes care of the visual presentation and accessibility aspects of the overlay container. It ensures the full-size image is displayed as the background, assigns a class for further styling with CSS, and initially hides the container from screen readers using `aria-hidden`.

## toggleLoadingSpinner
```javascript
function toggleLoadingSpinner(image) {
  const loadingSpinner = image.parentElement.parentElement.querySelector(`.loading__spinner`);
  loadingSpinner.classList.toggle('hidden');
}
```
The provided code for the `toggleLoadingSpinner` function manages the visibility of a loading spinner element, presumably indicating that a full-size image is loading. Here's a breakdown of what it does:

1. **Finding the Loading Spinner:**
   - `const loadingSpinner = image.parentElement.parentElement.querySelector(`.loading__spinner`);`
     - This line retrieves a reference to the loading spinner element. It uses `querySelector` on the parent element of the parent element (`image.parentElement.parentElement`) of the provided `image`. This assumes the loading spinner element is a descendant of the image's parent's parent element in the DOM structure. 
     - It searches for an element with the class name `loading__spinner`.

2. **Toggling Visibility:**
   - `loadingSpinner.classList.toggle('hidden');`
     - This line uses the `classList` property of the `loadingSpinner` element and calls the `toggle` method on it.
     - The `toggle` method checks if the class `hidden` exists on the element's class list.
       - If the class exists, it removes it, essentially making the element visible.
       - If the class doesn't exist, it adds the class `hidden`, likely defined in your CSS to hide the element.

In essence, this function dynamically controls the visibility of the loading spinner element based on its current state. It assumes the CSS class `hidden` is defined to style the loading spinner element as hidden (e.g., setting its `opacity` to 0 or `display: none`).

## moveWithHover Function
```javascript
function moveWithHover(image, event, zoomRatio) {
  // calculate mouse position
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (image.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((image.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
}
```
The `moveWithHover` function calculates the mouse position relative to the original image and updates the displayed portion of the full-size image in the overlay container. Here's a breakdown:

1. **Calculating Aspect Ratio:**
   - `const ratio = image.height / image.width;`
     - This line calculates the aspect ratio of the original image by dividing its height by its width. This value is used later to adjust the calculations for the Y position.

2. **Getting Container Bounds:**
   - `const container = event.target.getBoundingClientRect();`
     - This line retrieves the bounding client rectangle of the element that triggered the `mousemove` event (`event.target`). In this case, it's likely the original image element. The `getBoundingClientRect` method returns an object containing the element's position and dimensions relative to the viewport.

3. **Calculating Mouse Position:**
   - `const xPosition = event.clientX - container.left;`
     - This line calculates the X position of the mouse cursor relative to the original image. It subtracts the `left` property of the `container` rectangle (which represents the X coordinate of the image's left edge) from the `clientX` property of the `event` object (which represents the X coordinate of the mouse cursor).
   - `const yPosition = event.clientY - container.top;`
     - This line calculates the Y position of the mouse cursor relative to the original image, similar to the X position calculation. It subtracts the `top` property of the `container` rectangle (which represents the Y coordinate of the image's top edge) from the `clientY` property of the `event` object. 

4. **Converting to Percentages:**
   - `const xPercent = `${xPosition / (image.clientWidth / 100)}%`;`
     - This line converts the calculated X position (`xPosition`) into a percentage value relative to the width of the original image (`image.clientWidth`). It uses a template literal (```) for string formatting.
   - `const yPercent = `${yPosition / ((image.clientWidth * ratio) / 100)}%`;`
     - This line converts the calculated Y position (`yPosition`) into a percentage value relative to the height of the original image, considering the aspect ratio (`ratio`). It adjusts the image width by the aspect ratio to account for the potentially different height of the image. This ensures the Y position calculation aligns with the actual image dimensions.

5. **Updating Overlay Background Position:**
   - `overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;`
     - This line sets the `background-position` style property of the overlay container (`overlay`). It uses the calculated percentages (`xPercent` and `yPercent`) to define the position of the background image (the full-size image) within the overlay container. This essentially controls which part of the full-size image is displayed based on the mouse cursor's location over the original image.

6. **Updating Overlay Background Size:**
   - `overlay.style.backgroundSize = `${image.width * zoomRatio}px`;`
     - This line sets the `background-size` style property of the overlay container. It multiplies the original image width (`image.width`) by the zoom ratio (`zoomRatio`) and sets the unit to pixels (`px`). This controls the level of magnification applied to the displayed portion of the full-size image within the overlay.

Overall, this function dynamically adjusts the displayed area of the full-size image in the overlay container based on the user's mouse movement over the original image. It calculates the mouse position relative to the image and uses percentages to ensure the positioning works regardless of the image's actual dimensions. The zoom ratio allows for controlling the magnification level.

## magnify Fucntion
```javascript
function magnify(image, zoomRatio) {
  const overlay = createOverlay(image);
  overlay.onclick = () => overlay.remove();
  overlay.onmousemove = (event) => moveWithHover(image, event, zoomRatio);
  overlay.onmouseleave = () => overlay.remove();
}
```
The `magnify` function serves as the central piece for enabling the image magnification functionality on hover. Here's a breakdown of its role:

1. **Creating the Overlay:**
   - `const overlay = createOverlay(image);`
     - This line calls the `createOverlay` function (previously explained) to create the overlay container element. It passes the `image` element as an argument. The `createOverlay` function handles loading the full-size image, setting up the container styles, and potentially showing a loading spinner. It returns the created overlay element, which is stored in the `overlay` constant here.

2. **Handling Overlay Click:**
   - `overlay.onclick = () => overlay.remove();`
     - This line sets an `onclick` event listener on the `overlay` element. When the user clicks on the overlay container (anywhere within the magnified view), the provided arrow function is executed.
     - The arrow function simply calls the `remove` method on the `overlay` element. This removes the overlay container from the DOM, effectively hiding the magnified view.

3. **Handling Mouse Movement:**
   - `overlay.onmousemove = (event) => moveWithHover(image, event, zoomRatio);`
     - This line sets an `onmousemove` event listener on the `overlay` element. Whenever the user moves the mouse over the overlay container, the provided arrow function is executed.
     - The arrow function calls the `moveWithHover` function (previously explained). It passes the original `image` element, the `event` object containing mouse position information, and the `zoomRatio` value as arguments.
     - The `moveWithHover` function calculates the mouse position relative to the original image and updates the displayed portion of the full-size image within the overlay based on the mouse movement. The zoom ratio is used to control the magnification level.

4. **Handling Mouse Leave:**
   - `overlay.onmouseleave = () => overlay.remove();`
     - This line sets an `onmouseleave` event listener on the `overlay` element. When the user moves the mouse cursor out of the overlay container (including areas outside the displayed image), the provided arrow function is executed.
     - Similar to the click event listener, this arrow function also calls the `remove` method on the `overlay` element, effectively hiding the magnified view as the user moves the mouse away.

In summary, the `magnify` function creates the overlay container, sets up event listeners to handle clicks, mouse movement, and mouse leaving the overlay, and ultimately controls the visibility and positioning of the magnified image view based on user interaction.

## enableZoomOnHover Function
```javascript
function enableZoomOnHover(zoomRatio) {
  const images = document.querySelectorAll('.image-magnify-hover');
  images.forEach((image) => {
    image.onclick = (event) => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };
  });
}

enableZoomOnHover(2);
```
The `enableZoomOnHover` function serves as the entry point for activating the image magnification functionality on your website. Here's a breakdown of its role:

1. **Selecting Images:**
   - `const images = document.querySelectorAll('.image-magnify-hover');`
     - This line uses `querySelectorAll` to select all elements on the page that have the class `image-magnify-hover`. This class likely identifies the images you want to enable magnification for. The result is stored in a constant named `images`, which is a NodeList containing the selected image elements.

2. **Iterating Through Images:**
   - `images.forEach((image) => { ... });`
     - This line uses a `forEach` loop to iterate over each element in the `images` NodeList. Inside the loop, each element (`image`) represents an image on your page with the `image-magnify-hover` class.

3. **Adding Click Event Listener:**
   - `image.onclick = (event) => { ... };`
     - Inside the loop, for each image, an `onclick` event listener is set on the `image` element. When the user clicks on the image, the provided arrow function is executed.
     - The arrow function calls two functions:
       - `magnify(image, zoomRatio);` - This calls the `magnify` function (previously explained) to create the overlay container, handle clicks and mouse movement on the overlay, and control the magnified view. It passes the clicked `image` element and the `zoomRatio` as arguments.
       - `moveWithHover(image, event, zoomRatio);` - This calls the `moveWithHover` function (previously explained) to calculate the initial position of the magnified view based on the click location. It passes the clicked `image` element, the `event` object containing mouse position information, and the `zoomRatio` as arguments.

4. **Enabling Magnification:**
   - The final line `enableZoomOnHover(2);` calls the `enableZoomOnHover` function and passes a value of 2 (presumably the zoom ratio). This triggers the selection of images with the class `image-magnify-hover` and sets up the click event listener and initial positioning for magnification on hover.

Overall, the `enableZoomOnHover` function makes the image magnification functionality work by identifying the images, adding event listeners, and calling the core functions to create and manage the magnified view.

## MainSearch Class
```javascript
class MainSearch extends SearchForm {
  constructor() {
    super();
    this.allSearchInputs = document.querySelectorAll('input[type="search"]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    let allSearchForms = [];
    this.allSearchInputs.forEach((input) => allSearchForms.push(input.form));
    this.input.addEventListener('focus', this.onInputFocus.bind(this));
    if (allSearchForms.length < 2) return;
    allSearchForms.forEach((form) => form.addEventListener('reset', this.onFormReset.bind(this)));
    this.allSearchInputs.forEach((input) => input.addEventListener('input', this.onInput.bind(this)));
  }

  onFormReset(event) {
    super.onFormReset(event);
    if (super.shouldResetForm()) {
      this.keepInSync('', this.input);
    }
  }

  onInput(event) {
    const target = event.target;
    this.keepInSync(target.value, target);
  }

  onInputFocus() {
    const isSmallScreen = window.innerWidth < 750;
    if (isSmallScreen) {
      this.scrollIntoView({ behavior: 'smooth' });
    }
  }

  keepInSync(value, target) {
    this.allSearchInputs.forEach((input) => {
      if (input !== target) {
        input.value = value;
      }
    });
  }
}

customElements.define('main-search', MainSearch);
```
The provided code defines a custom web component named `MainSearch` that inherits from a base class `SearchForm` (not shown here). Here's a breakdown of its functionality:

**Class Definition and Properties:**

- `class MainSearch extends SearchForm { ... }`: This line defines a class named `MainSearch` that inherits from another class `SearchForm`. The `SearchForm` class likely provides some core functionalities for handling search forms that are reused here.
- `constructor() { ... }`: This is the constructor function of the `MainSearch` class. It's called whenever a new instance of this component is created.
  - `super();`: This line calls the constructor of the parent class (`SearchForm`). This ensures any initialization logic defined in the parent class constructor is executed first.
  - `this.allSearchInputs = document.querySelectorAll('input[type="search"]');`: This line retrieves all `<input>` elements on the page with the type `"search"` (search inputs) and stores them in a property named `allSearchInputs`. This allows the component to access all search inputs later.
  - `this.setupEventListeners();`: This line calls a function named `setupEventListeners` to attach event listeners to relevant elements.

**Setting Up Event Listeners:**

- `setupEventListeners() { ... }`: This function handles setting up event listeners for user interactions.
  - `let allSearchForms = [];`: This line declares an empty array named `allSearchForms`.
  - `this.allSearchInputs.forEach((input) => allSearchForms.push(input.form));`: This line iterates through each `input` element in `this.allSearchInputs`. Inside the loop, it retrieves the parent `form` element of the current `input` using `input.form` and pushes it into the `allSearchForms` array. This array will contain all forms that have search inputs.
  - `this.input.addEventListener('focus', this.onInputFocus.bind(this));`: This line adds an `addEventListener` call for the `focus` event on the `input` property of the current object (`this`). The `input` property likely refers to a specific search input element managed by the inherited `SearchForm` class. The provided function `onInputFocus` is called when the user focuses on this specific search input. The `bind(this)` ensures `this` refers to the `MainSearch` instance within the event listener function.
  - `if (allSearchForms.length < 2) return;`: This line checks if the `allSearchForms` array has less than 2 elements (forms). If there's only one search form, the additional logic for synchronizing multiple inputs might not be necessary, so the function exits early using `return;`.
  - `allSearchForms.forEach((form) => form.addEventListener('reset', this.onFormReset.bind(this)));`: This line iterates through each `form` element in the `allSearchForms` array. It adds an `addEventListener` call for the `reset` event on each form. The provided function `onFormReset` is called when a form is reset (e.g., using a reset button). Similar to `onInputFocus`, `bind(this)` is used.
  - `this.allSearchInputs.forEach((input) => input.addEventListener('input', this.onInput.bind(this)));`: This line iterates through each `input` element in `this.allSearchInputs`. It adds an `addEventListener` call for the `input` event on each search input. The provided function `onInput` is called whenever the value of a search input changes (e.g., the user types something). Again, `bind(this)` is used.

**Event Listener Functions:**

- These functions handle specific user interactions:
    - `onFormReset(event)`: This function is called when a form containing a search input is reset. It likely calls a function from the parent class (`super.onFormReset(event)`) to handle any base reset logic, then checks if the form should be reset according to some criteria (presumably defined in `shouldResetForm` of `SearchForm`). If the form should be reset, it calls `keepInSync` to synchronize the value of the specific search input managed by `this.input` with an empty string (`''`).
    - `onInput(event)`: This function is called whenever the value of a search input changes. It retrieves the target element (`event.target`) which is the search input that triggered the event. It then calls `keepInSync` to synchronize the value of all other search inputs (`this.allSearchInputs`) with the value of the target search input.
    - `onInputFocus()`: This function is called when the input element get focused.
  - This function checks if the screen width is less than 750 pixels using `window.innerWidth < 750`. This likely determines if the device is a small screen (mobile phone).
  - If it's a small screen:
    - `this.scrollIntoView({ behavior: 'smooth' });`: This line calls the `scrollIntoView` method on the current object (`this`) with options. It ensures the component scrolls into view smoothly (`behavior: 'smooth'`) when the user focuses on the specific search input (`this.input`). This is helpful for mobile usability, as the keyboard might obscure the input field on smaller screens.

**keepInSync(value, target):**

- This function is responsible for synchronizing the values of all search inputs. It takes two arguments:
  - `value`: The value to synchronize (presumably the current value of the target search input).
  - `target`: The target search input element that triggered the synchronization.

- `this.allSearchInputs.forEach((input) => { ... });`: This line iterates through each search input element in `this.allSearchInputs`.

- Inside the loop:
  - `if (input !== target) { ... }`: This conditional statement checks if the current `input` element is not the same as the `target` element. This ensures we don't set the value of the target input back to itself.
  - `input.value = value;`: If the `input` is different from the target, this line sets the value of the current `input` element to the provided `value`. This effectively synchronizes the values of all search inputs on the page.

**Registering the Custom Element:**

- `customElements.define('main-search', MainSearch);`: This line registers the `MainSearch` class as a custom element named `"main-search"`. This allows you to use the `<main-search>` tag in your HTML to create instances of this component and leverage its functionality for managing and synchronizing multiple search inputs on your web page.

Overall, the `MainSearch` custom component provides a reusable solution for keeping the values of multiple search inputs in sync on a web page. It inherits functionalities from a base class (`SearchForm`) for handling search forms and adds logic to synchronize input values based on user interactions like typing, resetting forms, and focusing on specific inputs. It also considers the screen size for smoother user experience on mobile devices.

## Media Gallery Class
The provided code defines a custom web component named `media-gallery` using JavaScript classes and the Custom Elements API. Here's a breakdown of its functionality:

**Checking for Existing Custom Element:**

- `if (!customElements.get('media-gallery')) { ... }`: This line checks if a custom element named `"media-gallery"` is already defined using `customElements.get`. If it doesn't exist, the code proceeds to define the class.

**Class Definition and Properties:**

- `class MediaGallery extends HTMLElement { ... }`: This line defines a class named `MediaGallery` that inherits from the built-in `HTMLElement` class. This allows us to create custom HTML elements with specific behaviors.
- `constructor() { ... }`: This is the constructor function of the `MediaGallery` class. It's called whenever a new instance of this component is created.
  - `super();`: This line calls the constructor of the parent class (`HTMLElement`).
  - `this.elements = { ... }`: This line defines an object named `elements` within the component. It will store references to frequently used DOM elements within the gallery for easier access.
      - It uses `querySelector` to find elements with specific ID patterns (starting with `"GalleryStatus"` for `liveRegion`, `"GalleryViewer"` for `viewer`, and `"GalleryThumbnails"` for `thumbnails`).
  - `this.mql = window.matchMedia('(min-width: 750px)');`: This line creates a media query object (`mql`) using `window.matchMedia`. The query checks if the screen width is at least 750 pixels.
  - `if (!this.elements.thumbnails) return;`: This line checks if the `thumbnails` element is found. If not, the component likely doesn't have the expected structure and might not function correctly, so the code exits early using `return;`.

**Event Listeners and Initial Setup:**

- These lines set up event listeners and perform initial configuration:
  - `this.elements.viewer.addEventListener('slideChanged', debounce(this.onSlideChanged.bind(this), 500));`: This line adds an event listener for the custom `"slideChanged"` event on the `viewer` element. The event is likely triggered when the active media item (image or video) in the gallery changes. The provided function `debounce` (assumed to be defined elsewhere) helps prevent excessive calls due to rapid slide changes. It also calls `onSlideChanged` with the component context (`this`) bound using `bind(this)`.
  - The next line iterates through all elements with a `data-target` attribute within the `thumbnails` element. These elements likely represent thumbnail buttons for switching between media items. Inside the loop:
      - It retrieves the button element within the current thumbnail using `querySelector('button')`.
      - It adds a click event listener to the button. When clicked, it calls the `setActiveMedia` function, passing the value of the `data-target` attribute (presumably the ID of the media item to switch to) and binding the component context (`this`) using `bind(this, mediaToSwitch.dataset.target)`.
  - `if (this.dataset.desktopLayout.includes('thumbnail') && this.mql.matches) this.removeListSemantic();`: This line checks two conditions:
      - If the component's data attribute `dataset.desktopLayout` includes the string `"thumbnail"` (indicating a thumbnail layout on desktop).
      - If the media query (`mql`) matches, meaning the screen width is at least 750px.
    - If both conditions are true, it calls the `removeListSemantic` function to potentially remove list semantics from the gallery on larger screens (likely for a cleaner layout).

**onSlideChanged Function:**

- `onSlideChanged(event) { ... }`: This function is called when the active media item in the gallery changes (likely triggered by the `"slideChanged"` event).
  - It retrieves the thumbnail element that corresponds to the newly active media item using `querySelector` based on the `data-mediaId` attribute of the current element in the viewer (`event.detail.currentElement`).
  - It calls `setActiveThumbnail` to visually indicate the active thumbnail element.

**setActiveMedia Function:**

- `setActiveMedia(mediaId) { ... }`: This function handles setting a specific media item (identified by `mediaId`) as active within the gallery.
  - It retrieves the element representing the media item with the matching `data-media-id` attribute within the viewer. If not found, it might return early.
  - It deactivates all previously active media items by removing the `is-active` class from all elements with `data-media-id`
  - It activates the target media item by adding the `is-active` class to the element representing the media with the matching `mediaId`.
  - It calls `preventStickyHeader` to potentially prevent a sticky header from revealing itself when switching media items.
  - It uses `window.setTimeout` to perform some actions with a slight delay (500 milliseconds):
      - It checks if the media query matches (large screen) or if the `thumbnails` element exists. If neither condition is true, it scrolls the viewer container to the position of the active media item.
      - It retrieves the bounding rectangle of the active media item using `getBoundingClientRect`.
      - It checks if the top of the image is already in view using the `top` property of the rectangle. If it's already visible (within a tolerance of 0.5 pixels), it skips scrolling.
      - If the image needs scrolling, it calculates the scroll position required to bring it into view (considering current scroll position) and scrolls the window smoothly using `window.scrollTo`.
  - It calls `playActiveMedia` to potentially play any media within the newly active item (e.g., videos).

**setActiveThumbnail Function:**

- `setActiveThumbnail(thumbnail) { ... }`: This function visually indicates the active thumbnail element.
  - It checks if `thumbnails` and `thumbnail` elements exist. If not, it exits early.
  - It removes the `aria-current` attribute from all buttons within the thumbnails, indicating none are currently selected.
  - It sets the `aria-current` attribute to `"true"` on the button within the provided `thumbnail` element, signifying it's the active item.
  - It checks if the thumbnail is already visible within the thumbnail container using a slider API function (assumed to be provided elsewhere) and a tolerance of 10 pixels.
  - If the thumbnail needs scrolling, it uses the slider API to scroll the thumbnails container to bring the active thumbnail into view.

**announceLiveRegion Function:**

- `announceLiveRegion(activeItem, position) { ... }`: This function announces information about the newly active media item using a live region (`elements.liveRegion`).
  - It retrieves the image element within the `activeItem`.
  - It sets an `onload` event handler on the image. When the image loads:
      - It sets the `aria-hidden` attribute of the live region to `"false"`, making it visible to screen readers.
      - It constructs an announcement message from a string stored in `window.accessibilityStrings.imageAvailable`, replacing a placeholder `[index]` with the provided `position` (likely indicating the image order).
      - It sets the live region's content to the announcement message.
      - It uses `setTimeout` to hide the live region again after 2 seconds by setting `aria-hidden` back to `"true"`.

**playActiveMedia Function:**

- `playActiveMedia(activeItem) { ... }`: This function likely handles playing any media (e.g., videos) within the newly active item.
  - It calls a function named `window.pauseAllMedia` (assumed to be defined elsewhere) to potentially pause any currently playing media in the gallery.
  - It retrieves the element with the class `deferred-media` within the `activeItem`. This element might represent lazy-loaded media content.
  - If the `deferred-media` element exists, it calls a method named `loadContent` (assumed to be defined on the element) with an argument of `false` (potentially to trigger immediate loading).

**preventStickyHeader Function:**

- `preventStickyHeader() { ... }`: This function might handle preventing a sticky header from revealing itself when switching media items.
  - It attempts to retrieve a reference to the sticky header element using `document.querySelector('sticky-header')`. It stores this in a property named `stickyHeader` for potential reuse.
  - If the `stickyHeader` element is not found, the function exits early.
  - It dispatches a custom event named `"preventHeaderReveal"` on the sticky header element, likely notifying it to prevent revealing itself temporarily.

**removeListSemantic Function:**

- `removeListSemantic() { ... }`: This function might be used to remove list semantics from the gallery on larger screens for a cleaner layout.
  - It checks if the `viewer.slider` element exists (presumably part of a slider component). If not, it exits early.
  - It sets the `role` attribute of the `viewer.slider` element to `"presentation"`, indicating it's not a semantic list for accessibility purposes.
  - It iterates through all slider items (`viewer.sliderItems`)
  - It sets the `role` attribute of each slide element within the slider to `"presentation"`, removing list semantics from individual slides as well.

**Overall Functionality:**

The `media-gallery` custom component provides a reusable solution for building image and/or video galleries with functionalities like:

  - Synchronizing active thumbnails with the currently displayed media item.
  - Handling media switching through thumbnail clicks.
  - Announcing changes to the active media item for screen readers using a live region.
  - Potentially playing media within the active item.
  - Optionally preventing a sticky header from revealing itself when switching media (for a smoother experience).
  - Adjusting layout and semantics on larger screens (desktops) for a cleaner presentation.

**Component Registration:**

- `customElements.define('media-gallery', MediaGallery);`: This line registers the `MediaGallery` class as a custom element named `"media-gallery"`. This allows you to use the `<media-gallery>` tag in your HTML to create instances of this component and leverage its functionalities for building interactive media galleries on your web page.

In summary, the `media-gallery` component demonstrates the use of custom elements, event listeners, DOM manipulation, and accessibility considerations to create a dynamic and user-friendly media gallery experience.

## PasswordModal Class
```javascript
class PasswordModal extends DetailsModal {
  constructor() {
    super();

    if (this.querySelector('input[aria-invalid="true"]')) this.open({ target: this.querySelector('details') });
  }
}

customElements.define('password-modal', PasswordModal);
```
The provided code defines a custom web component named `PasswordModal` that inherits from a base class `DetailsModal` (not shown here). Here's a breakdown of its functionality:

**Class Definition and Inheritance:**

- `class PasswordModal extends DetailsModal { ... }`: This line defines a class named `PasswordModal` that inherits from another class `DetailsModal`. The `DetailsModal` class likely provides functionalities for handling modal elements based on the `<details>` HTML element.

**Constructor:**

- `constructor() { ... }`: This is the constructor function of the `PasswordModal` class. It's called whenever a new instance of this component is created.
  - `super();`: This line calls the constructor of the parent class (`DetailsModal`). This ensures any initialization logic defined in the parent class constructor is executed first.
  - `if (this.querySelector('input[aria-invalid="true"]')) this.open({ target: this.querySelector('details') });`: This line checks if there exists an `<input>` element within the component that has the `aria-invalid="true"` attribute set. This attribute is commonly used to indicate that a user input is invalid.
    - If such an invalid input element is found, the code calls a function named `open` (likely defined in the parent class `DetailsModal`) to open the modal. The function is provided an object with a `target` property set to the `<details>` element within the component, ensuring the specific modal element is opened.

**Registering the Custom Element:**

- `customElements.define('password-modal', PasswordModal);`: This line registers the `PasswordModal` class as a custom element named `"password-modal"`. This allows you to use the `<password-modal>` tag in your HTML to create instances of this component and leverage its behavior for automatically opening a modal dialog whenever an associated password input field is found to be invalid.

Overall, the `PasswordModal` custom component provides a convenient way to create password modals that automatically open when the user submits an invalid password. It inherits functionalities from a base class (`DetailsModal`) for managing the opening and closing of the modal element.

## PickupAvailability Class
```javascript
if (!customElements.get('pickup-availability')) {
  customElements.define(
    'pickup-availability',
    class PickupAvailability extends HTMLElement {
      constructor() {
        super();

        if (!this.hasAttribute('available')) return;

        this.errorHtml = this.querySelector('template').content.firstElementChild.cloneNode(true);
        this.onClickRefreshList = this.onClickRefreshList.bind(this);
        this.fetchAvailability(this.dataset.variantId);
      }

      fetchAvailability(variantId) {
        let rootUrl = this.dataset.rootUrl;
        if (!rootUrl.endsWith('/')) {
          rootUrl = rootUrl + '/';
        }
        const variantSectionUrl = `${rootUrl}variants/${variantId}/?section_id=pickup-availability`;

        fetch(variantSectionUrl)
          .then((response) => response.text())
          .then((text) => {
            const sectionInnerHTML = new DOMParser()
              .parseFromString(text, 'text/html')
              .querySelector('.shopify-section');
            this.renderPreview(sectionInnerHTML);
          })
          .catch((e) => {
            const button = this.querySelector('button');
            if (button) button.removeEventListener('click', this.onClickRefreshList);
            this.renderError();
          });
      }

      onClickRefreshList(evt) {
        this.fetchAvailability(this.dataset.variantId);
      }

      renderError() {
        this.innerHTML = '';
        this.appendChild(this.errorHtml);

        this.querySelector('button').addEventListener('click', this.onClickRefreshList);
      }

      renderPreview(sectionInnerHTML) {
        const drawer = document.querySelector('pickup-availability-drawer');
        if (drawer) drawer.remove();
        if (!sectionInnerHTML.querySelector('pickup-availability-preview')) {
          this.innerHTML = '';
          this.removeAttribute('available');
          return;
        }

        this.innerHTML = sectionInnerHTML.querySelector('pickup-availability-preview').outerHTML;
        this.setAttribute('available', '');

        document.body.appendChild(sectionInnerHTML.querySelector('pickup-availability-drawer'));
        const colorClassesToApply = this.dataset.productPageColorScheme.split(' ');
        colorClassesToApply.forEach((colorClass) => {
          document.querySelector('pickup-availability-drawer').classList.add(colorClass);
        });

        const button = this.querySelector('button');
        if (button)
          button.addEventListener('click', (evt) => {
            document.querySelector('pickup-availability-drawer').show(evt.target);
          });
      }
    }
  );
}

if (!customElements.get('pickup-availability-drawer')) {
  customElements.define(
    'pickup-availability-drawer',
    class PickupAvailabilityDrawer extends HTMLElement {
      constructor() {
        super();

        this.onBodyClick = this.handleBodyClick.bind(this);

        this.querySelector('button').addEventListener('click', () => {
          this.hide();
        });

        this.addEventListener('keyup', (event) => {
          if (event.code.toUpperCase() === 'ESCAPE') this.hide();
        });
      }

      handleBodyClick(evt) {
        const target = evt.target;
        if (
          target != this &&
          !target.closest('pickup-availability-drawer') &&
          target.id != 'ShowPickupAvailabilityDrawer'
        ) {
          this.hide();
        }
      }

      hide() {
        this.removeAttribute('open');
        document.body.removeEventListener('click', this.onBodyClick);
        document.body.classList.remove('overflow-hidden');
        removeTrapFocus(this.focusElement);
      }

      show(focusElement) {
        this.focusElement = focusElement;
        this.setAttribute('open', '');
        document.body.addEventListener('click', this.onBodyClick);
        document.body.classList.add('overflow-hidden');
        trapFocus(this);
      }
    }
  );
}
```

The provided code defines two custom web components related to pickup availability on a product page:

**1. pickup-availability:**

- This component checks for the presence of an `available` attribute on the element. If not available, it likely indicates pickup is not offered and the component exits early.
- It retrieves a reference to a `<template>` element within the component using `querySelector`. This template likely holds the HTML content for error messages or previews.
- It binds the `onClickRefreshList` function to the component context using `bind(this)`. This ensures the function has access to the component's properties when called.
- It calls the `fetchAvailability` function, passing the `dataset.variantId` as an argument (likely the ID of the product variant).

**fetchAvailability(variantId):**

- This function constructs the URL for fetching pickup availability information for the specific product variant.
  - It retrieves the `dataset.rootUrl` property, which might be a base URL for the shop.
  - It ensures the URL ends with a slash (`/`).
  - It constructs the final URL by appending `"variants/` + variantId + `/?section_id=pickup-availability"` to the base URL.
- It uses `fetch` to retrieve the HTML content from the constructed URL.
  - On successful response:
    - It parses the response text into a DOM document using `DOMParser`.
    - It selects the element with the class `.shopify-section` from the parsed document, assuming this element contains the pickup availability information.
    - It calls `renderPreview` to display the retrieved availability information.
  - On errors:
    - It retrieves a button element from the component.
    - If the button exists, it removes any previously attached click event listener using the bound `onClickRefreshList` function.
    - It calls `renderError` to display an error message.

**onClickRefreshList(evt):**

- This function simply calls `fetchAvailability` again with the same `variantId` to refresh the availability information, likely triggered by a user interaction (e.g., clicking a refresh button).

**renderError():**

- This function clears the component's inner HTML and appends the pre-defined error content from the template element (`this.errorHtml`).
- It retrieves the button element and adds a click event listener using the bound `onClickRefreshList` function to handle refresh attempts.

**renderPreview(sectionInnerHTML):**

- This function handles rendering the retrieved pickup availability preview.
  - It first checks for an existing `pickup-availability-drawer` element in the document and removes it if found (avoiding duplicate drawers).
  - It checks if the provided `sectionInnerHTML` contains an element with the class `"pickup-availability-preview"`. If not, it clears the component's content, removes the `available` attribute (potentially indicating pickup information is unavailable), and exits early.
  - If the preview element is found, it extracts its outer HTML (including child elements).
  - It sets the component's inner HTML to the extracted preview HTML and sets the `available` attribute back to indicate availability information is displayed.
  - It retrieves the `pickup-availability-drawer` element from the parsed document and appends it to the document body.
  - It retrieves color class names from the component's `dataset.productPageColorScheme` property and applies them to the drawer element for styling purposes.
  - It retrieves a button element within the preview and adds a click event listener. When clicked, it likely triggers showing a more detailed drawer component (defined next).

**2. pickup-availability-drawer:**

- This component represents the modal drawer that displays detailed pickup availability information.

**handleBodyClick(evt):**

- This function handles closing the drawer based on clicks outside the drawer element.
  - It checks if the clicked target is not the drawer itself, not a descendant of the drawer, and not an element with the ID `"ShowPickupAvailabilityDrawer"` (likely a separate button to trigger showing the drawer).
  - If these conditions are met, it calls the `hide` function to close the drawer.

**hide():**

- This function hides the drawer by:
  - Removing the `open` attribute from the drawer element.
  - Removing the click event listener for body clicks (attached in `show`).
  - Removing the `overflow-hidden` class from the document body (likely for preventing scroll while the drawer is open).
  - Calling a function named `removeTrapFocus` (not provided here) to remove any focus trapping mechanism used for the drawer.

**show(focusElement):**

- This function shows the drawer by:
  - Storing a reference to the element that currently has focus (potentially for restoring focus later)
  - Setting the `open` attribute on the drawer element to indicate it's open.
  - Adding a click event listener to the document body for handling clicks outside the drawer, which calls the bound `onBodyClick` function.
  - Adding the `overflow-hidden` class to the document body, likely to prevent scrolling while the drawer is open and maintain focus within the drawer.
  - Calling a function named `trapFocus` (not provided here) to implement a focus trap mechanism within the drawer. This ensures that keyboard focus stays within the drawer content and doesn't accidentally tab out.

**Overall Functionality:**

The two custom components, `pickup-availability` and `pickup-availability-drawer`, work together to provide a user-friendly experience for displaying and interacting with pickup availability information on a product page. Here's a summary of their roles:

- `pickup-availability`:
    - Checks for availability based on an attribute and fetches details from the server.
    - Renders an error message if unavailable or a preview with a button to show the detailed drawer.
    - Handles refreshing availability information.
- `pickup-availability-drawer`:
    - Represents the modal drawer that displays detailed pickup availability information.
    - Handles opening and closing the drawer based on user interaction and clicks outside the drawer.
    - Implements focus trapping to maintain keyboard focus within the drawer content.

**Conditional Registration:**

Both components are defined using `customElements.define` only if the corresponding element name (`pickup-availability` or `pickup-availability-drawer`) hasn't been registered yet using `customElements.get`. This ensures they are defined only once, even if the code is included multiple times on a page.
