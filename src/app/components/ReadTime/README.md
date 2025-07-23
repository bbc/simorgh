## Description

This component takes the `readTime` data supplied by the `pageData` of an Article page and renders it on the page, to give users an estimated read time. 

```
"pageData": {
    "metadata":{
        "stats":{
            readTime: 1
        }
    }
}
```

If no `readTime` is supplied nothing is rendered. This might happen as not every Article will have a `readTime`.