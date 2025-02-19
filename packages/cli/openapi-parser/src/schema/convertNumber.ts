import { PrimitiveSchemaValueWithExample, SchemaWithExample, SdkGroupName } from "@fern-api/openapi-ir-sdk";
import { wrapPrimitive } from "./convertSchemas";

export function convertNumber({
    nameOverride,
    generatedName,
    format,
    _default,
    minimum,
    maximum,
    exclusiveMinimum,
    exclusiveMaximum,
    multipleOf,
    description,
    wrapAsNullable,
    example,
    groupName
}: {
    nameOverride: string | undefined;
    generatedName: string;
    format: string | undefined;
    _default: number | undefined;
    minimum: number | undefined;
    maximum: number | undefined;
    exclusiveMinimum: boolean | undefined;
    exclusiveMaximum: boolean | undefined;
    multipleOf: number | undefined;
    description: string | undefined;
    wrapAsNullable: boolean;
    example: number | undefined;
    groupName: SdkGroupName | undefined;
}): SchemaWithExample {
    if (format == null || format === "double") {
        return wrapPrimitive({
            nameOverride,
            generatedName,
            primitive: PrimitiveSchemaValueWithExample.double({
                default: _default,
                minimum,
                maximum,
                exclusiveMinimum,
                exclusiveMaximum,
                multipleOf,
                example
            }),
            wrapAsNullable,
            description,
            groupName
        });
    } else if (format === "float") {
        return wrapPrimitive({
            nameOverride,
            generatedName,
            primitive: PrimitiveSchemaValueWithExample.float({
                example
            }),
            wrapAsNullable,
            description,
            groupName
        });
    } else if (format === "int32") {
        return wrapPrimitive({
            nameOverride,
            generatedName,
            primitive: PrimitiveSchemaValueWithExample.int({
                default: _default,
                minimum,
                maximum,
                exclusiveMinimum,
                exclusiveMaximum,
                multipleOf,
                example
            }),
            wrapAsNullable,
            description,
            groupName
        });
    } else if (format === "int64") {
        return wrapPrimitive({
            nameOverride,
            generatedName,
            primitive: PrimitiveSchemaValueWithExample.int64({
                default: _default,
                example
            }),
            wrapAsNullable,
            description,
            groupName
        });
    } else if (format === "time-delta") {
        return wrapPrimitive({
            nameOverride,
            generatedName,
            primitive: PrimitiveSchemaValueWithExample.float({
                example
            }),
            wrapAsNullable,
            description,
            groupName
        });
    }
    return wrapPrimitive({
        nameOverride,
        generatedName,
        primitive: PrimitiveSchemaValueWithExample.float({
            example
        }),
        wrapAsNullable,
        description,
        groupName
    });
}
