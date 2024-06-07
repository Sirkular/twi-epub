
## twi-epub

Scrapes wanderinginn.com to create an epub.

### Setup

- Install Node v18.15.0
- Install yarn 1.22.22

```
yarn install
```

### Usage

```
// Grab every chapter from the first to the latest.
node twi.js
// or
NODE_TLS_REJECT_UNAUTHORIZED=0 node twi.js

// Grab only chapter 10.15 and put it into an epub.
node twi.js 1 https://wanderinginn.com/2024/05/18/10-15/
```

`twi.epub` will be generated.

### Parameters

count    (optional)  - The number of chapters to download to create the epub from.

startUrl (optional)  - The URL of the chapter to start at.
