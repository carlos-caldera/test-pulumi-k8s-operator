import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

// Get the Pulumi API token.
const pulumiConfig = new pulumi.Config();
const pulumiAccessToken = pulumiConfig.requireSecret("pulumiAccessToken")

// Create the API token as a Kubernetes Secret.
const accessToken = new kx.Secret("accesstoken", {
    stringData: { accessToken: pulumiAccessToken },
});

// Create an NGINX deployment in-cluster.
const mystack = new k8s.apiextensions.CustomResource("my-stack", {
    apiVersion: 'pulumi.com/v1',
    kind: 'Stack',
    spec: {
        envRefs: {
            PULUMI_ACCESS_TOKEN: {
                type: "Secret",
                secret: {
                    name: accessToken.metadata.name,
                    key: "accessToken"
                },
            },
        },
        stack: "carlos-caldera/test-pulumi-k8s/dev",
        projectRepo: "https://github.com/carlos-caldera/test-pulumi-k8s",
        commit: "1ddef5f9d25b27da793995a17e102b69c81813a9",
        // branch: "refs/heads/master", // Alternatively, track master branch.
        destroyOnFinalize: true,
    }
});
