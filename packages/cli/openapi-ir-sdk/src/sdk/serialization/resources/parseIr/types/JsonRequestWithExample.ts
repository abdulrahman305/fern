/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernOpenapiIr from "../../../../api";
import * as core from "../../../../core";

export const JsonRequestWithExample: core.serialization.ObjectSchema<
    serializers.JsonRequestWithExample.Raw,
    FernOpenapiIr.JsonRequestWithExample
> = core.serialization
    .objectWithoutOptionalProperties({
        schema: core.serialization.lazy(async () => (await import("../../..")).SchemaWithExample),
        contentType: core.serialization.string().optional(),
        fullExamples: core.serialization
            .list(core.serialization.lazyObject(async () => (await import("../../..")).NamedFullExample))
            .optional(),
        additionalProperties: core.serialization.boolean(),
    })
    .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithDescription));

export declare namespace JsonRequestWithExample {
    interface Raw extends serializers.WithDescription.Raw {
        schema: serializers.SchemaWithExample.Raw;
        contentType?: string | null;
        fullExamples?: serializers.NamedFullExample.Raw[] | null;
        additionalProperties: boolean;
    }
}
