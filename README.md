# Gimme Sats ⚡️

A set of React components and utilities to make accepting Lightning payments in React apps dead simple. The core library consists of a `GimmeSatsProvider`, which wraps the application, and a `GimmeSats` button which can then be rendered throughout the app. The latter triggers an interface -- fully themeable and customizable -- for generating a lightning invoice with your favorite service provider and accepting payment.

In two minutes, you can add Lightning tips on your React site.

## Getting Started

### Installation

```
yarn add gimme-sats
```

### Use

First, set up the provider, choosing the theme and global service. (Currently, Gimme Sats only works with Strike).

```jsx
import { GimmeSatsProvider, THEMES, SERVICES } from "gimme-sats";

<GimmeSatsProvider
  theme={THEMES.DARK_BLUE}
  service={SERVICES.STRIKE}
  // Here, "to" is the Strike handle
  to="sasha"
>
  <App />
</GimmeSatsProvider>;
```

Then incorporate the GimmeSats button in your app to trigger a payment interface:

```jsx
<GimmeSats fixedAmount={5} fixedNote="Tip me!" />
```

That's it! The `GimmeSats` button, matching the selected theme, will trigger a themed payment modal.

## What's in the Box

### Components

#### `GimmeSatsProvider`

A context provider meant to wrap the application. Behind the scenes, `GimmeSatsProvider` uses a Redux-like pattern to track context changes (amount, note, theme, etc) and manage the payment flow. This component should be outside of any display components, so that it can overlay a full-page screen and modal on payment triggering.

See up-to-date props in the typescript declarations [in the file](./components/GimmeSatsProvider.tsx).

#### `GimmeSats`

A button for triggering the payment flow. This button takes a large set of options, some of which are redundant with and override the Provider options. The button component can accept the full set of configurations shared in global context, and will override any Provider details on trigger.

GimmeSats takes a number of props:

```ts
interface Props extends Settings {
  children?: ReactChild;
  /** Whether the button should be light dark or mid of the given theme. */
  tone?: string;
  /** Styles the button alone, not the triggered modal. */
  buttonTheme?: ColorTheme;
  /** Settings to launch with, an attributes of which override global settings for the triggered modal. */
  settings?: Settings;
  /** Whether to show a lightning bolt icon. */
  bolt?: Boolean;
}
```

Settings is defined below:

```ts
export interface Settings {
  /** Amount to charge. If pre-set, can be 'fixed' or malleable. */
  amount?: number;
  /** If true, amount is not changeable by user. Default: false. */
  amountIsFixed?: Boolean;
  /** Charge note. Can be 'fixed' or malleable. */
  note?: string;
  /** If true, note is not alterable by user. Default: false. */
  noteIsFixed?: Boolean;
  /** Identifier of payment recipient. Varies based on service. */
  to?: string;
  /** Name to show in place of 'to' value. */
  displayName?: string;
  /** Service. API service for generating invoice and receiving payment. Default: STRIKE. */
  service?: string;
  /** Color theme for the button and modal. */
  theme?: ColorTheme;
  /** Stage of the purchase flow. Must be one of the constants included in this repository. */
  stage?: string;
}
```

By default, the button says "Gimme Sats" and includes a lightning bolt. A text-free, bolt-only version is also exported, and named `GimmeSatsJustBolt`. Visuals can be further customized by passing in a custom child, changing the theme object, or overriding styles with CSS (see below).

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

- [x] Improve styles and add light animations
- [x] Handle unexpected errors smoothly
- [x] Better delineate between global config and button-specific options, to avoid bugs.
- [ ] Add testing (mostly integration and end-to-end)
- [ ] Add CI and CI badge to Readme

### Version 1.2

- [ ] Allow users to view amount in sats, in addition to USD
- [ ] Add a handful of additional themes
- [ ] Add alternatives to Strike
- [ ] Ensure valid identifier before attempting to create invoice? (Maybe unnecessary)

### Version 2.0

I believe a version 2 could be made to include a cart. This cart would track SKUs in context, and then generate amount and description automatically from these items. The interface would then show the items in the cart, and allow the user to confirm and view/pay an invoice for the cart. The description for this invoice would include data (human-readable or computer-readable?) about the purchase.

Before doing this, research LNURL and any protocols that might affect functionality here.

### Nice-to-Haves

- [ ] Accept onchain Bitcoin payments
- [ ] Handle Paynyms?
- [ ] Variety of premade GimmeSats button styles
- [ ] Investigate integration into libraries like Gatsby?
- [ ] Build as framework-agnostic vanilla-JS library?

## Contributing

I'd love help on this. Feel encouraged to raise an issue, fork and PR, or just reach out.
