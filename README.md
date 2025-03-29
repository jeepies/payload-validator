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

#### Negative

```js
const isNegative = new validator.int().negative();
```

#### Positive

```js
const isPositive = new validator.int().positive();
```

#### Finite

```js
const _isFinite = new validator.int().finite();
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

#### Exact Length

```js
const password = new validator.str().length(8);
```

#### Includes

```js
const password = new validator.str().includes("123");
```

#### Starts With

```js
const password = new validator.str().starts_with("P");
```

#### Ends With

```js
const password = new validator.str().ends_with("123");
```

#### RegEx

```js
const uuid = new validator.str().regex('/
[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}
/');
```

#### Email

```js
const isEmail = new validator.str().email();
```

#### IP Address

```js
const isIP = new validator.str().ip();
```

## Roadmap (3.0.0)

- [ ] Objects
