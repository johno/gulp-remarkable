install:
	npm install

lint:
	$(MAKE) install
	jshint lib/*.js test/*.js index.js

test:
	$(MAKE) lint
	@NODE_ENV=test mocha

test-cov:
	$(MAKE) test
	@NODE_ENV=test node_modules/.bin/istanbul cover node_modules/.bin/_mocha

test-travis:
	$(MAKE) test
	@NODE_ENV=test node_modules/.bin/istanbul cover node_modules/.bin/_mocha --report lcovonly

.PHONY: test lint
