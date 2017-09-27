#### 1.5.1 (2017-09-27)

##### Chores

* **develop:** Added package-lock.json ([e923219d](https://github.com/fvdm/nodejs-requestbin/commit/e923219d8de27cfd4022e7fb49f479d48d50f064))
* **package:**
  * Update dependencies ([0373dff1](https://github.com/fvdm/nodejs-requestbin/commit/0373dff131c8df70c3e2fc2e1fa24dce1122fa92))
  * Update dotest dev dep ([64c449e7](https://github.com/fvdm/nodejs-requestbin/commit/64c449e7e87e2dbe8a2b898ab8108b8f4d614c1f))
  * Update dev deps ([1cc6b8ab](https://github.com/fvdm/nodejs-requestbin/commit/1cc6b8ab23bdfc42aaad69d6708d23105372a9cf))

##### Documentation Changes

* **readme:** Add coffee button to Author ([d3448673](https://github.com/fvdm/nodejs-requestbin/commit/d3448673071efbca504fb7b265951a2c336d4765))
* **badges:**
  * Fixed wrong branch ([e58644d5](https://github.com/fvdm/nodejs-requestbin/commit/e58644d5cb4c8aeef60e910685f954c65e2f10af))
  * Added coverage status ([be1bccad](https://github.com/fvdm/nodejs-requestbin/commit/be1bccada6516fb192b1aa97148ccd0318246f8d))

##### Bug Fixes

* **talk:** Changed base url to HTTPS (#11) ([f076fff0](https://github.com/fvdm/nodejs-requestbin/commit/f076fff079f63ed31057cf6375860443243aba13))
* **response:**
  * doError calls should include options ([f343eac2](https://github.com/fvdm/nodejs-requestbin/commit/f343eac272377cb90001a0b03dc6416e396b7afc))
  * Rewrite error response (#11) ([b51a9861](https://github.com/fvdm/nodejs-requestbin/commit/b51a9861b58b26c24b1eb8de055ce7196a3f2c61))
* **doError:** Fixed missing options (#11) ([65516ab2](https://github.com/fvdm/nodejs-requestbin/commit/65516ab23087271db14aea95244215bb797976a6))

##### Code Style Changes

* **main:**
  * Minor comment edits ([808524a5](https://github.com/fvdm/nodejs-requestbin/commit/808524a54c2c9350d3f65bea809f4b75b1528769))
  * Clean up JSDoc syntax ([66063708](https://github.com/fvdm/nodejs-requestbin/commit/660637089b36c1fbc9c01986f7e96dee6ffa4285))
* **response:** Removed old error var ([e0f7dbb0](https://github.com/fvdm/nodejs-requestbin/commit/e0f7dbb04ebb0db2198d28dea3f01cea4461cd3f))

##### Tests

* **config:**
  * Replaced node 7 with 8 on Travis ([b1ab64fe](https://github.com/fvdm/nodejs-requestbin/commit/b1ab64fee099ba669047407de4084198f37d58ba))
  * Travis CI update node versions ([77482d04](https://github.com/fvdm/nodejs-requestbin/commit/77482d04fe5077d265319f632f9c546d245767aa))
  * Use dynamic node versions on Travis CI ([070c1451](https://github.com/fvdm/nodejs-requestbin/commit/070c14515dbb47b5e538edbbab3190c534d652c3))
* **main:**
  * Minor fixes ([17cf5a8a](https://github.com/fvdm/nodejs-requestbin/commit/17cf5a8a82eb6bcf94a57fb4e92597d13a43ecb8))
  * Don’t skip tests ([962029a8](https://github.com/fvdm/nodejs-requestbin/commit/962029a8ee0d69175c70636648d37383bbad10d7))

### 1.5.0 (2016-9-5)

##### Chores

* **develop:** Add gitignore config ([2176af79](https://github.com/fvdm/nodejs-requestbin/commit/2176af79b18c0954ea77ef86a9dbcb1e6f627435))
* **package:**
  * Add Tonic example ([5713fe2c](https://github.com/fvdm/nodejs-requestbin/commit/5713fe2c2fb13160b7bf128c62db5f1798ccd121))
  * Add example.js ([f912d466](https://github.com/fvdm/nodejs-requestbin/commit/f912d466cfaad3b4736a24752a847012d01c5081))
  * Replaced test runner and dev deps by dotest ([502d0966](https://github.com/fvdm/nodejs-requestbin/commit/502d0966e1c39932be8cceceeadf9d922309e842))
  * Update httpreq dep ([523da9c2](https://github.com/fvdm/nodejs-requestbin/commit/523da9c24afdfd4e0915972e87074e9e5e376bc8))
  * Minor clean up ([de983403](https://github.com/fvdm/nodejs-requestbin/commit/de98340350cf363baf3b453c22f9e3d1fe18ce50))
  * update eslint to version 3.0.0 ([57213c74](https://github.com/fvdm/nodejs-requestbin/commit/57213c74759633f62385f0745f3abbbe29bca8e8))
  * update eslint to version 2.5.1 ([54bfabb7](https://github.com/fvdm/nodejs-requestbin/commit/54bfabb7cba1fce8e4f58e80121169b7513ef194))
  * update eslint to version 2.5.0 ([607c805d](https://github.com/fvdm/nodejs-requestbin/commit/607c805d8e85bc9fc58d2f1034a6551a6f8a6a58))

##### Documentation Changes

* **badges:**
  * Replace Gemnasium with bitHound ([caf00ceb](https://github.com/fvdm/nodejs-requestbin/commit/caf00ceb3cd0a25a3f6ff2446a83379d08f771bb))
  * Deeplink Gemnasium to dependencies tab ([47757a2c](https://github.com/fvdm/nodejs-requestbin/commit/47757a2cb6ae98675ca18ac92ed2d3c4f46e7bfc))
  * Add npm version for changelog ([9375aef4](https://github.com/fvdm/nodejs-requestbin/commit/9375aef4bb50e869a18e05ed63846f0ee3edd28e))
* **readme:** Cleaner author footnote ([0c07240a](https://github.com/fvdm/nodejs-requestbin/commit/0c07240a16550904ec68ec276fef58e0291a7f06))

##### Bug Fixes

* **main:**
  * Fixed missing options ([f63fd1e1](https://github.com/fvdm/nodejs-requestbin/commit/f63fd1e16e8f02d0d407716f66d1c04545fbb111))
  * Fix syntax typo ([03e99236](https://github.com/fvdm/nodejs-requestbin/commit/03e9923667c40898a2d32300e77889461c19477d))
  * Fixed syntax typo ([46d316de](https://github.com/fvdm/nodejs-requestbin/commit/46d316de0dae360bb90953988ec427c635e2d5dc))

##### Other Changes

* **example:** Consistent return ([4ca95552](https://github.com/fvdm/nodejs-requestbin/commit/4ca955523423bbbfca3840ced24a35579fc969d2))
* **undefined:**
  * always run both test commands ([d053d05f](https://github.com/fvdm/nodejs-requestbin/commit/d053d05feadccaecab2be8bb512ac179c8047b6b))
  * dotest minimum v1.5.0 ([5dd47d8d](https://github.com/fvdm/nodejs-requestbin/commit/5dd47d8d49b198372f166040e4fa32b2a0434224))
  * dev dep eslint 2.5.1 is broken ([a8d7add4](https://github.com/fvdm/nodejs-requestbin/commit/a8d7add4958df662f94f319ebfb2efe6b27bc610))

##### Refactors

* **main:**
  * Moved response handling to function ([9590f0db](https://github.com/fvdm/nodejs-requestbin/commit/9590f0dbf764eac554c518f2490b451d5af0f8a8))
  * Cleaner methods code with JSDoc ([02bc29bb](https://github.com/fvdm/nodejs-requestbin/commit/02bc29bbdb309288ece2aaa872cf75e63e74eb67))
* **package:** Minimum supported node v4.0 ([f3ae249e](https://github.com/fvdm/nodejs-requestbin/commit/f3ae249e985fa4be8065c5d68cf698e1383eaade))

##### Code Style Changes

* **comment:** Add intro and JSdoc ([b3044289](https://github.com/fvdm/nodejs-requestbin/commit/b3044289eef2d79cd159faa13470bae09385fa39))

##### Tests

* **config:**
  * Minor lint tweaks ([827d9c0b](https://github.com/fvdm/nodejs-requestbin/commit/827d9c0b3a99b5ab4045c0ddbf77eef84449a4a2))
  * Add bitHound config ([5b370123](https://github.com/fvdm/nodejs-requestbin/commit/5b3701238071d4a3f1ce9eb0c646f5347b0a3194))
* **lint:** Update eslint to ES6 ([d4ffdaa1](https://github.com/fvdm/nodejs-requestbin/commit/d4ffdaa1933f6a5c1762588080796f168b964e7f))
* **undefined:**
  * add node v6 to Travis config ([76bda9c1](https://github.com/fvdm/nodejs-requestbin/commit/76bda9c132d6432bc24cc24407fdc5055b0657ff))
  * wait one second between tests ([7013b9af](https://github.com/fvdm/nodejs-requestbin/commit/7013b9af4cd158ee57dd28cd60f7670a8293b857))
  * don't fail when response is incomplete ([bae4d515](https://github.com/fvdm/nodejs-requestbin/commit/bae4d515e003cf231d5e6c2f16d6be299c201206))

