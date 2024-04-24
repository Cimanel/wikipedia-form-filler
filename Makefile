.PHONY: logs

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	yarn

start: ## Start the application
	yarn dev

build: ## Build the application for production
	yarn build

lint: ## Lint the code
	yarn lint
