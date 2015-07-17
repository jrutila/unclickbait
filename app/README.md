# unclickbait

## Running

Go to https://ide.c9.io/jrutila/unclickbait and do following:
* (terminal 2) mongod --smallfiles --dbpath data/
* (terminal 1) cd app/
* (terminal 1) sails lift

Navigate to: https://unclickbait-jrutila.c9.io/clickbait/
It should show all UnClickbait titles (will not work on production).

# API

## Adding a new UnClickbait title

POST a following json to https://unclickbait-jrutila.c9.io/clickbait/add

ref and originalText are optional

``` json
{
 "ref": "http://referer.org",
 "url": "http://example.com/clickbaitnews/2333412",
 "originalText": "You won't believe what it said before",
 "text": "This is the better text"
}
```

## Retrieving UnClickbait titles

POST a following json to https://unclickbait-jrutila.c9.io/clickbait/search

* url: list of urls for what you want the unclickbait titles
* ref: optional (and not yet implemented) if you want titles only for this site

``` json
{
 "url": [ "http://example.com/clickbait/1", "http://example.com/clickbait/2" ],
 "ref": "http://currentpage.com"
}
```

Returns a list that contains unclickbait titles for all those urls that have
fixed title. TODO: automatic limit to 20 titles or so.

## TODO: Logging in

https://unclickbait-jrutila.c9.io/auth/login actually should work already

## TODO: Scoring

## TODO: Reporting

Report a title

* Spam
* Typo
* Not really a clickbait title originally