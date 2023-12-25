function getKey() {
    return (Math.random() + 1).toString(36).substring(7);
}

function getImageFromHtml(html) {
    try {
        const matches = html.match(/<meta(.*?)>/g) || [];
        const metaStr = matches.find((str) => {
            return str.search('og:image') >= 0;
        }) || '';
        return metaStr.match(/content="(.*)"/)[1];
    } catch (error) {
        return '';
    }
}

function getTitleFromHtml(html) {
    try {
        return html.match("<title>(.*?)</title>")[1];
    } catch (error) {
        return '';
    }
}

function getPageDataFromHtml(html) {
    return {
        title: getTitleFromHtml(html),
        img: getImageFromHtml(html)
    };
}

function getPageData(link) {
    return fetch(link)
        .then((response) => response.text())
        .then(getPageDataFromHtml)
        .catch((res) => {
            console.log(res);
            return { title: '', img: '' };
        });
}

module.exports = { getKey, getPageData };
