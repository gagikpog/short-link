# Examples

## Add link
```js
fetch('go/create', {
    method: 'POST',
    headers: {
        'Content-type':  'application/json'
    },
    body: JSON.stringify({
        link: 'https://films.gagikpog.ru/'
    })
});
```
