/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernOpenapiIr from "../../../../api";
import * as core from "../../../../core";

export const ObjectPropertyWithExample: core.serialization.ObjectSchema<
    serializers.ObjectPropertyWithExample.Raw,
    FernOpenapiIr.ObjectPropertyWithExample
> = core.serialization.objectWithoutOptionalProperties({
    key: core.serialization.string(),
    schema: core.serialization.lazy(async () => (await import("../../..")).SchemaWithExample),
    audiences: core.serialization.list(core.serialization.string()),
    conflict: core.serialization.record(
        core.serialization.lazy(async () => (await import("../../..")).SchemaId),
        core.serialization.lazyObject(async () => (await import("../../..")).ObjectPropertyConflictInfo)
    ),
    nameOverride: core.serialization.string().optional(),
    generatedName: core.serialization.string(),
});

export declare namespace ObjectPropertyWithExample {
    interface Raw {
        key: string;
        schema: serializers.SchemaWithExample.Raw;
        audiences: string[];
        conflict: Record<serializers.SchemaId.Raw, serializers.ObjectPropertyConflictInfo.Raw>;
        nameOverride?: string | null;
        generatedName: string;
    }
}
