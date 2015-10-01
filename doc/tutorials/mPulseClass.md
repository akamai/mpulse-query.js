### mPulse Class usage

```js
// Require the mPulse class
var mPulse = require("mpulse-query").mPulse;

// Access mPulse API for mpulse.soasta.com
var mP = new mPulse("XXXX-XXXX-XXXX-XXXX");
mP.query("summary", {date: "today"}, function(err, result) {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(result);
});
```

```js
// Access mPulse API for your API instance
var mP = new mPulse("XXXX-XXXX-XXXX-XXXX", "http://1.2.3.4/concerto/mpulse/api/v2");
mP.query("summary", {date: "today"}, function(err, result) {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(result);
});
```

```js
// Access mPulse API for your API instance and its RepositoryService
var mP = new mPulse("XXXX-XXXX-XXXX-XXXX",
"http://1.2.3.4/concerto/mpulse/api/v2",
"http://1.2.3.4/concerto/services/rest/RepositoryService/v1");
mP.query("summary", {date: "today"}, function(err, result) {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(result);
});
```
