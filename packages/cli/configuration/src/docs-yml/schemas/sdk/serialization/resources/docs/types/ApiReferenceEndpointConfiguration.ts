/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernDocsConfig from "../../../../api";
import * as core from "../../../../core";

export const ApiReferenceEndpointConfiguration: core.serialization.ObjectSchema<
    serializers.ApiReferenceEndpointConfiguration.Raw,
    FernDocsConfig.ApiReferenceEndpointConfiguration
> = core.serialization.object({
    endpoint: core.serialization.string(),
    title: core.serialization.string().optional(),
    slug: core.serialization.string().optional(),
    icon: core.serialization.string().optional(),
    hidden: core.serialization.boolean().optional(),
});

export declare namespace ApiReferenceEndpointConfiguration {
    interface Raw {
        endpoint: string;
        title?: string | null;
        slug?: string | null;
        icon?: string | null;
        hidden?: boolean | null;
    }
}
