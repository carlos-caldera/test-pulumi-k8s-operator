# test-pulumi-k8s-operator

Repo to test [Pulumi K8s Operator](https://www.pulumi.com/docs/guides/continuous-delivery/pulumi-kubernetes-operator/)

Runs K8s resources located in [this repo](https://github.com/carlos-caldera/test-pulumi-k8s)

## Requirements
- Pulumi

## How to run
- Install dependencies
  - `npm ci`
- Initialize stack
  - `pulumi stack init dev`
- Create K8s cluster and [deploy the operator](https://github.com/pulumi/pulumi-kubernetes-operator#deploy-the-operator) onto the cluster
  - Relevant source code for operator can be found in `resources` directory
  - Ensure `kubectl` config context is pointing to this K8s cluster
- Create a Pulumi access token and set the config value:
  ```
  pulumi config set --secret test-pulumi-k8s-operator:pulumiAccessToken <SECRET>
  ```
- Run `pulumi up`
  - This will deploy the K8s resources described in the associated project repo at the given commit SHA

## Clean up
- `pulumi destroy`
- `pulumi stack rm`
