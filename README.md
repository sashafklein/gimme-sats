# Gimme Sats

As set of React components and utilities to make accepting Lightning payments in React apps dead simple. The core library consists of a `GMSProvider`, which wraps the application, and a `GimmeSats` button which can then be rendered throughout the app. The latter triggers an interface -- fully themeable and customizable -- for generating a lightning invoice with your favorite service provider and accepting payment.

In two minutes, you can add Lightning tips on your React site.

## Getting Started

### Installation

```
yarn add gimme-sats
```

### Use

First, set up the provider, choosing the theme and global service. (Currently, Gimme Sats only works with Strike).

```jsx
import { GMSProvider, themes, services } from 'gimme-sats';

<GMSProvider 
  theme={themes.DARK_BLUE} 
  services={services.STRIKE} 
  // Here, "to" is the Strike handle
  to="sasha"
>
  <App />
</GMSProvider>
```

Then incorporate the GimmeSats button in your app to trigger a payment interface:

```jsx
<GimmeSats fixedAmount={5} fixedNote="Tip me!" />
```

That's it! The `GimmeSats` button, matching the selected theme, will trigger a themed payment modal.

## What's in the Box

### Components

#### `GMSProvider`

A context provider meant to wrap the application. Behind the scenes, `GMSProvider` uses a Redux-like pattern to track context changes (amount, note, theme, etc) and manage the payment flow. This component should be outside of any display components, so that it can overlay a full-page screen and modal on payment triggering.

```ts
interface Props {
  /** The single React component to render within this context. (Your app) */
  children: ReactChild;
  /** An object of type ColorTheme. Either a provided theme or a custom object of identical shape. */
  theme?: ColorTheme;
  /** One of the acceptable API Service types. (Currently, just Strike). */
  service: string;
  /** The unique identifier of the payee in the given service. */
  to: string;
  /** Any additional global defaults for a GimmeSats button. */
  defaults?: Context;
}
```

#### `GimmeSats`

A button for triggering the payment flow. This button takes a large set of options, some of which are redundant with and override the Provider options. The button component can accept the full set of configurations shared in global context, and will override any Provider details on trigger.

```ts
interface Props = {
  /** Amount set prior to button click, which user cannot override. */
  fixedAmount?: number;
  /** Note set prior to button click, which user cannot override. */
  fixedNote?: string;
  /** Amount populating the numerical input when the modal opens. Can be overriden */
  defaultAmount?: number;
  /** Note populating the text input when the modal opens. Can be overriden. */
  defaultNote?: string;
  /** The active amount the user will pay (or has paid), in dollars. */
  amount?: number;
  /** The current payment note. */
  note?: string;
  /** Identifying string for recipient. Varies by API service. */
  to?: string;
  /** API service name. Must be one of the constants included in this repository. */
  service?: string,
  /** Optional callback run on successful payment. Given context and actions as arguments. */
  onPayment?(context: Context, actions: Actions): Function;
  /** Stage of the purchase flow. Must be one of the constants included in this repository. */
  stage?: string;
  /** Color theme for the button and modal. */
  theme?: ColorTheme;
}
```

By default, the button says "Gimme Sats" and includes a lightning bolt. Visuals can be customized by passing in a custom child, changing the theme object, or overriding styles with CSS (see below).

### Other

#### Constants

This library exports several constant objects:

- **services** - A list of supported services to choose between for generating and checking on the invoice.
- **themes** - A list of preexisting theme objects. 
- **stages** - A list of constants determining the stage of the payment process. You are only likely to use these if you add an `onPayment` callback.

## Theming

This library uses `styled-components` to simplify theming. In addition, it attaches human-readable CSS classes to most major components in the flow. These are all prepended with `gms__` to avoid CSS clashes. If the theme objects provide insufficient customization, you can add CSS styles to alter these properties.

I'll look into offering better theming in the future.

## Roadmap

### Version 1.1

- [ ] Improve styles and add animation
- [ ] Handle unexpected errors smoothly
- [ ] Add testing (mostly integration and end-to-end)
- [ ] Add CI and CI badge to Readme
- [ ] Allow users to view amount in sats, in addition to USD
- [ ] Add a handful of additional themes
- [ ] Add alternatives to Strike
- [ ] Ensure valid identifier before attempting to create invoice

### Version 2.2

I believe a version 2 could be made to include a cart. This cart would track SKUs in context, and then generate amount and description automatically from these items. The interface would then show the items in the cart, and allow the user to confirm and view/pay an invoice for the cart. The description for this invoice would include data (human-readable or computer-readable?) about the purchase. 

Before doing this, research LNURL and any protocols that might affect functionality here. 

### Nice-to-Haves

- [ ] Accept onchain Bitcoin payments
- [ ] Handle Paynyms?
- [ ] Variety of premade GimmeSats button styles
- [ ] Investigate integration into libraries like Gatsby?

## Contributing

I'd love help on this
