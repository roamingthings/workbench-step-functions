.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-CreateJobFunction build-RetrieveJokeFunction build-JobStatusFunction

build-CreateJobFunction:
	$(MAKE) HANDLER=src/create-job/app.ts build-lambda-common

build-RetrieveJokeFunction:
	$(MAKE) HANDLER=src/retrieve-joke/app.ts build-lambda-common

build-JobStatusFunction:
	$(MAKE) HANDLER=src/job-status/app.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes doesn't relate to dependencies
