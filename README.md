# Gimme Sats

As set of React components and utilities to simplify accepting Lightning payment in React apps.

## Getting Started

### Installation

### Use

## What's Included

### Components

### Pay Button

Options

- FixedAmount: Number
- FixedNote: String
- DefaultAmount: Number
- DefaultNote: String
- RequireNote: Boolean
- Handle: String
- Service: Strike | Zebedee
- ShowIcon: Boolean
- Options: Object
- Children: Any (usually: "Gimme Sats[]")
- ShowExpiry: Boolean
- OnPayment

Future options

- Currency: String (USD, BTC, sats, millisats)

```jsx
<SatsButton showIcon={true}>Tip Me On Strike!</SatsButton>
```

### Pay Card

### Utilities

- Gimme Components

  Util generates components in one file based on configuration:

  ```jsx
  import { gimmeComponents, STRIKE } from 'gimme-sats';
  const { SatsButton, SatsCard } = gimmeComponents(STRIKE, { fixedNote: 'Pay me on Strike', handle: 'sasha' });
  export SatsButton;
  export SatsCard;
  ```

- Stylesheet (default styles, separate for each component)
- API

```js
import { Strike } from "gimme-sats";
Strike.getInvoice(name, amount, description);
Strike.checkInvoice(invoiceId, onPayment, nearExpiration, renewalThreshold);
Strike.renewInvoice(invoiceId); // Would this not just get a new invoice?
```

## Roadmap

- Foolproof payment at moment of expiry
- Allow users to choose input currencies
- Show sats / bitcoin when paying BTC
- Display cart - Allow users to pass cart of items to button to display alongside (potentially a different component, given that amount and description would be fixed)
- Take Paynym and check BTC payment somehow?
- Paylink -- Link to GimmeSats.com/strike/sasha?amount=40&description=Blah
- Custom paylinks which obscure details (needs user database)
- Styling - Make base block class selectable (now defaults to "gms")

## Contribution

I'm all pull requests!
