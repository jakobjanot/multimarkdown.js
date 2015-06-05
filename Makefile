BUILDDIR=build
MMDDIR=deps/multimarkdown-4
EMCC=$(/usr/bin/which emcc)

all: dist/multimarkdown.js

deps/multimarkdown-4:
	git submodule update --init --recursive

$(MMDDIR)/parser.o:
	git submodule update --init --recursive
	make -C $(MMDDIR)

build/libmultimarkdown.js: $(MMDDIR)/parser.o
	git submodule update --init --recursive
	mkdir -pv build
	# Set total memory to 256MB because large markdown documents will run into the default 16MB limit
	$(EMCC) -O2 /src/$(MMDDIR)/*.c -o $@ -s EXPORTED_FUNCTIONS=\"['_mmd_version', '_markdown_to_string']\" -s OUTLINING_LIMIT=10000 -s TOTAL_MEMORY=268435456"

dist/multimarkdown.js: src/*.js src/**/*.js build/libmultimarkdown.js
	mkdir -pv dist
	cat src/header.js \
		build/libmultimarkdown.js \
		src/multimarkdown.js \
		src/footer.js \
		| grep -v process.platform.match \
		| sed -e 's/\.delete/["delete"]/g' > $@

test: saucetest nodetest

nodetest:
	node ./tests/node/require_test.js

browsertest: dist/multimarkdown.js
	./node_modules/karma/bin/karma start tests/karma/local.conf.js --single-run

autotest:  dist/multimarkdown.js
	./node_modules/karma/bin/karma start tests/karma/local.conf.js

saucetest:  dist/multimarkdown.js test-main.js chrometest
	LAUNCHER=sl_safari ./node_modules/karma/bin/karma start tests/karma/sauce.conf.js
	LAUNCHER=sl_firefox ./node_modules/karma/bin/karma start tests/karma/sauce.conf.js
	LAUNCHER=sl_ie_11 ./node_modules/karma/bin/karma start tests/karma/sauce.conf.js
	LAUNCHER=sl_ie_10 ./node_modules/karma/bin/karma start tests/karma/sauce.conf.js
	# LAUNCHER=sl_ie_8 ./node_modules/karma/bin/karma start tests/karma/sauce.conf.js

chrometest:
	LAUNCHER=sl_chrome ./node_modules/karma/bin/karma start tests/karma/sauce.conf.js

ie9test:
	# LAUNCHER=sl_ie_9 ./node_modules/karma/bin/karma start tests/karma/sauce.conf.js

clean:
	rm -rf build dist deps node_modules
