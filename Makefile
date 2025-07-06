# Makefile for TaskNexus
# =======================
# Comprehensive commands for development, building, formatting, linting,
# AWS infra provisioning, Lambda packaging, and asset deployment.

# ────────────────────────────────────────────────────────────────────────────────
#  VARIABLES
# ────────────────────────────────────────────────────────────────────────────────

# Package managers
YARN            := yarn
NPM             := npm

# Expo commands
EXPO            := $(YARN) expo

# AWS / Terraform
AWS_DIR         := aws
SHELL_DIR       := shell

# Web assets directory
WEB_ASSETS_DIR  := web-assets

# Terraform CLI wrapper
TERRAFORM       := terraform
TF_INIT_ARGS    := -chdir=$(AWS_DIR) init
TF_APPLY_ARGS   := -chdir=$(AWS_DIR) apply -auto-approve
TF_DESTROY_ARGS := -chdir=$(AWS_DIR) destroy -auto-approve
TF_PLAN_ARGS    := -chdir=$(AWS_DIR) plan

# Lambda packaging
LAMBDA_SRC      := $(AWS_DIR)/lambda/taskReminder
LAMBDA_ZIP      := $(LAMBDA_SRC).zip

# ────────────────────────────────────────────────────────────────────────────────
#  PHONY TARGETS
# ────────────────────────────────────────────────────────────────────────────────

.PHONY: help \
        install deps lint format test type-check start build build-web \
        aws-init aws-plan aws-apply aws-destroy \
        lambda-package lambda-update \
        deploy-assets \
        clean

# ────────────────────────────────────────────────────────────────────────────────
#  HELP
# ────────────────────────────────────────────────────────────────────────────────

help:
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?##"}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ────────────────────────────────────────────────────────────────────────────────
#  DEPENDENCIES
# ────────────────────────────────────────────────────────────────────────────────

install: ## Install all JS dependencies via Yarn
	$(YARN) install

deps: install ## Alias for install

lint: ## Run ESLint
	$(YARN) lint

format: ## Run Prettier to format code
	$(YARN) format

test: ## Run tests
	$(YARN) test

type-check: ## Run TypeScript compiler in check mode
	$(NPM) run tsc -- --noEmit

# ────────────────────────────────────────────────────────────────────────────────
#  EXPO / APP
# ────────────────────────────────────────────────────────────────────────────────

start: ## Start Expo in development mode
	$(EXPO) start

build: ## Build standalone apps for distribution
	$(EXPO) build

build-web: ## Build web assets to $(WEB_ASSETS_DIR)
	$(EXPO) build:web --output $(WEB_ASSETS_DIR)

# ────────────────────────────────────────────────────────────────────────────────
#  AWS INFRA (TERRAFORM)
# ────────────────────────────────────────────────────────────────────────────────

aws-init: ## terraform init + apply all infra in aws/
	@echo "🌱 Initializing & applying AWS infra..."
	$(TERRAFORM) $(TF_INIT_ARGS)
	$(TERRAFORM) $(TF_APPLY_ARGS)

aws-plan: ## terraform plan (preview infra changes)
	@echo "🔍 Planning AWS infra changes..."
	$(TERRAFORM) $(TF_PLAN_ARGS)

aws-apply: ## terraform apply only (after init)
	@echo "🚀 Applying AWS infra changes..."
	$(TERRAFORM) $(TF_APPLY_ARGS)

aws-destroy: ## terraform destroy infra when cleaning up
	@echo "⚠️  Destroying AWS infra..."
	$(TERRAFORM) $(TF_DESTROY_ARGS)

# ────────────────────────────────────────────────────────────────────────────────
#  LAMBDA PACKAGE & UPDATE
# ────────────────────────────────────────────────────────────────────────────────

lambda-package: ## Zip up Lambda function source for Terraform
	@echo "📦 Packaging Lambda code..."
	@rm -f $(LAMBDA_ZIP)
	@cd $(LAMBDA_SRC) && zip -r ../../taskReminder.zip ./*
	@echo "✅ $(LAMBDA_ZIP) created."

lambda-update: lambda-package ## Re-package Lambda and apply only the Lambda function
	@echo "🔄 Updating Lambda in AWS..."
	@cd $(AWS_DIR) && $(TERRAFORM) apply -target=aws_lambda_function.task_reminder -auto-approve
	@echo "✅ Lambda function updated."

# ────────────────────────────────────────────────────────────────────────────────
#  ASSETS DEPLOYMENT
# ────────────────────────────────────────────────────────────────────────────────

deploy-assets: ## Sync local web assets into S3 bucket
	@echo "📥 Fetching S3 bucket name..."
	BUCKET=$$(terraform -chdir=$(AWS_DIR) output -raw s3_bucket) && \
	echo "📤 Syncing $(WEB_ASSETS_DIR) → s3://$$BUCKET" && \
	aws s3 sync $(WEB_ASSETS_DIR) s3://$$BUCKET --acl public-read --delete && \
	echo "✅ Assets deployed."

# ────────────────────────────────────────────────────────────────────────────────
#  CLEANUP
# ────────────────────────────────────────────────────────────────────────────────

clean: ## Remove build artifacts
	@echo "🧹 Cleaning up..."
	@rm -rf $(WEB_ASSETS_DIR)
	@rm -f $(LAMBDA_ZIP)
	@echo "✅ Cleaned."

