# Examples

## Add link
```js
fetch('https://gagikpog-api.ru/go/create', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        link: 'https://films.gagikpog.ru/'
    })
}).then((res) => {
    return res.json();
}).then((res) => {
    console.log(res.link);
});

// Open link https://gagikpog-api.ru/go/{link}
```
