CC=emcc
LD=emld
MMDDIR=deps/multimarkdown-4
SRCDIR=src

all: dist/multimarkdown.js

$(MMDIR):
	git submodule update --init --recursive

$(MMDDIR)/parser.o: $(MMDIR)
	git submodule update --init --recursive
	make $(MMDDIR)

dist/multimarkdown.js: $(MMDDIR)/parser.o
	mkdir -pv dist
	# Set total memory to 256MB because large markdown documents will run into the default 16MB limit
	#$(CC) -O2 -o $@ -s EXPORTED_FUNCTIONS="['_mmd_version', '_markdown_to_string']" -s OUTLINING_LIMIT=10000 -s TOTAL_MEMORY=268435456

	# $(CC) --memory-init-file 0 -O3 -Ideps/multimarkdown-4 $(SRCDIR)/multimarkdown.c \
	# -o $@ --pre-js $(SRCDIR)/pre.js --post-js $(SRCDIR)/post.js \
	# -s EXPORTED_FUNCTIONS="['_mmd_version', '_markdown_to_string']" \
	# -s RESERVED_FUNCTION_POINTERS=20 -s OUTLINING_LIMIT=10000 -s TOTAL_MEMORY=268435456 \
	# -o $@

	$(CC) --memory-init-file 0 -O3 -Ideps/multimarkdown-4 $(SRCDIR)/multimarkdown.js.c \
	-o $@ \
	--post-js $(SRCDIR)/post.js \
	--closure 0 \
	-s EXPORTED_FUNCTIONS="['_mmd_version', '_markdown_to_string']" \
	-s OUTLINING_LIMIT=10000 -s TOTAL_MEMORY=268435456 \
	-o $@

	# EMCC_DEBUG=0 $(CC) --memory-init-file 0 -O3 -Ideps/multimarkdown-4 $(SRCDIR)/multimarkdown.c \
	# --pre-js $(SRCDIR)/pre.js --post-js $(SRCDIR)/post.js \
	# -s EXPORTED_FUNCTIONS="['_mmd_version', '_markdown_to_string']" \
	# -s RESERVED_FUNCTION_POINTERS=20 -s OUTLINING_LIMIT=10000 -s TOTAL_MEMORY=268435456 \
	# --minify 0 -o $@

test: nodetest

nodetest:
	node ./tests/node/require_test.js

browsertest: dist/multimarkdown.js
	./node_modules/karma/bin/karma start tests/karma/local.conf.js --single-run

autotest:  dist/multimarkdown.js
	./node_modules/karma/bin/karma start tests/karma/local.conf.js

clean:
	rm -rf dist deps node_modules
