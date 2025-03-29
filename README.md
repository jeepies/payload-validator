# Payload Validator

## Usage

To start using the validator, you can use

```js
import validator from 'pavi';
```

## Parsing and Response

There are two types of parsing - safe and unsafe.

```js
const packageName = new validator.str().equals('pavi');

const unsafeParse = packageName.parse('ivap'); // will throw an error
const safeParse = packageName.safeParse('ivap'); // will return an object
```

When you use the `safeParse` method, an object will be returned

```js
const failSafeParse = packageName.safeParse('ivap');
/*
{
    error: ['EQUALS'],
    success: false,
}
*/
const passSafeParse = packageName.safeParse('pavi');
/*
{
    data: "pavi",
    success: true,
}
*/
```

Methods can also be chained

```js
const password = new validator.str().min(3).max(256);
```

You can also add custom error messages

```js
const username = new validator.str().equals('jeepies', { error_message: 'Incorrect username!' });
const result = username.safeParse('admin');
/*
{
    error: ['Incorrect username!'],
    success: false,
}
*/
```

## Data Types

### Integer

#### Equals

```js
const clientBankPin = new validator.int().equals(1337);
```

#### Greater than (GT)

```js
const isAbove18 = new validator.int().gt(18);
```

#### Less than (LT)

```js
const isBelow100 = new validator.int().lt(100);
```

#### Greater than or equals (GTE)

```js
const is21OrAbove = new validator.int().gte(21);
```

#### Less than or equals (LTE)

```js
const is100OrBelow = new validator.int().lte(100);
```

### String

#### Equals

```js
const username = new validator.str().equals('jeepies');
```

#### Minimum Length

```js
const password = new validator.str().min(3);
```

#### Maximum Length

```js
const password = new validator.str().max(256);
```

## Roadmap (3.0.0)

- [x] Custom error messages
- [ ] String Methods
  - [x] MIN
  - [x] MAX
  - [ ] REGEX
  - [x] LENGTH
  - [ ] IS_EMAIL
  - [ ] IS_IP
  - [x] INCLUDES
  - [x] STARTS_WITH
  - [x] ENDS_WITH
- [ ] Advanced Integer Methods
  - [x] IS_NEGATIVE
  - [x] IS_POSITIVE
  - [ ] IS_FINITE
  - [ ] IS_PHONE_NUMBER
- [ ] Objects