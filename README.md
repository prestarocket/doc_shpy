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

# Function to Pause All Media

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