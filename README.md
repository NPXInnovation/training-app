# Create NPX Fullstack App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [MUI](https://mui.com)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Prerequisites:

- Azure Developer CLI (azd) is [installed](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd?tabs=winget-windows%2Cbrew-mac%2Cscript-linux&pivots=os-windows) locally 
- Azure CLI (az) is [installed](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) locally
- GitHub CLI (gh) is [installed](https://cli.github.com/manual/installation) locally

Steps:

1. Run `./scripts/deployment.sh` in your terminal.
2. This will prompt you with the environment name, Azure subscriptions, and Azure location. The environment name should not be more than 16 characters and only a few locations are compatible, so to be safe, choose canadacentral.
3. When prompted to commit and push to start the configured CI pipeline, DO NOT say yes as the deployment will fail.
4. The script will also run the Github Actions Workflow, where you can follow along the workflow through the terminal.
5. After the workflow is complete, the script will run another script to finalize the deployment.
6. Confirm all steps run WITHOUT errors.
