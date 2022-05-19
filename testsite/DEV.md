# DEV notes

## Notes

This is the sample response for `octokit` `GET /repos/{owner}/{repo}/git/trees/{tree_sha}` request:

`repoTreeResponse (non-recursive)`
```js
{
  status: 200,
  url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/trees/main',
  headers: {
    'accept-ranges': 'bytes',
    'access-control-allow-origin': '*',
    'access-control-expose-headers': 'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset',
    'cache-control': 'public, max-age=60, s-maxage=60',
    connection: 'close',
    'content-encoding': 'gzip',
    'content-length': '908',
    'content-security-policy': "default-src 'none'",
    'content-type': 'application/json; charset=utf-8',
    date: 'Wed, 04 May 2022 07:21:27 GMT',
    etag: 'W/"ad6ba9ff76921172d83b277795738365256bf69cdb360513ea36967c599587e0"',
    'last-modified': 'Wed, 23 Mar 2022 12:53:19 GMT',
    'referrer-policy': 'origin-when-cross-origin, strict-origin-when-cross-origin',
    server: 'GitHub.com',
    'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
    vary: 'Accept, Accept-Encoding, Accept, X-Requested-With',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'deny',
    'x-github-media-type': 'github.v3; format=json',
    'x-github-request-id': 'C12C:2DA7:3514F:4604B:62722977',
    'x-ratelimit-limit': '60',
    'x-ratelimit-remaining': '59',
    'x-ratelimit-reset': '1651652487',
    'x-ratelimit-resource': 'core',
    'x-ratelimit-used': '1',
    'x-xss-protection': '0'
  },
  data: {
    sha: 'ee301fd22542807650f22a03ffe214bd9941a449',
    url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/trees/ee301fd22542807650f22a03ffe214bd9941a449',
    tree: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    truncated: false
  }
}
```

and specifically `repoTreeResponse > data > tree`
note both files (`blob`) and directories (`tree`)

```js
// tree snippet
  {
    path: 'static/img/logomark-dark.svg',
    mode: '100644',
    type: 'blob',
    sha: 'fe1ed334fc47f0e0cbb39105dccf294ae1505cc3',
    size: 1739,
    url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/blobs/fe1ed334fc47f0e0cbb39105dccf294ae1505cc3'
  },
  {
    path: 'static/img/logomark.svg',
    mode: '100644',
    type: 'blob',
    sha: '55e46606623c148fe40e580af8093744b416d3e2',
    size: 1747,
    url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/blobs/55e46606623c148fe40e580af8093744b416d3e2'
  },
  {
    path: 'static/img/tutorial',
    mode: '040000',
    type: 'tree',
    sha: '625b87119f68ecb83f5ff43027c84aef5c650aa6',
    url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/trees/625b87119f68ecb83f5ff43027c84aef5c650aa6'
  },
```

### Improve:

**User-Agent** - Consider customizing User-Agent value for oktokit Trees API call (tools: https://github.com/node-modules/default-user-agent, https://httpbin.org)
