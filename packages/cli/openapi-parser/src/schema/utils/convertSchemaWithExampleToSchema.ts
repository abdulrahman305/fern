import { assertNever } from "@fern-api/core-utils";
import {
    ObjectProperty,
    ObjectPropertyWithExample,
    OneOfSchema,
    OneOfSchemaWithExample,
    PrimitiveSchemaValue,
    PrimitiveSchemaValueWithExample,
    Schema,
    SchemaWithExample
} from "@fern-api/openapi-ir-sdk";

export function convertSchemaWithExampleToSchema(schema: SchemaWithExample): Schema {
    switch (schema.type) {
        case "object":
            return Schema.object({
                allOf: schema.allOf,
                properties: schema.properties.map((objectProperty) => convertToObjectProperty(objectProperty)),
                allOfPropertyConflicts: schema.allOfPropertyConflicts,
                description: schema.description,
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                groupName: schema.groupName,
                additionalProperties: schema.additionalProperties
            });
        case "array":
            return Schema.array({
                description: schema.description,
                value: convertSchemaWithExampleToSchema(schema.value),
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                groupName: schema.groupName
            });
        case "enum":
            return Schema.enum({
                description: schema.description,
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                values: schema.values,
                groupName: schema.groupName
            });
        case "literal":
            return Schema.literal({
                description: schema.description,
                value: schema.value,
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                groupName: schema.groupName
            });
        case "nullable":
            return Schema.nullable({
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                description: schema.description,
                value: convertSchemaWithExampleToSchema(schema.value),
                groupName: schema.groupName
            });
        case "optional":
            return Schema.optional({
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                description: schema.description,
                value: convertSchemaWithExampleToSchema(schema.value),
                groupName: schema.groupName
            });
        case "primitive":
            return Schema.primitive({
                description: schema.description,
                schema: convertToPrimitiveSchemaValue(schema.schema),
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                groupName: schema.groupName
            });
        case "map":
            return Schema.map({
                description: schema.description,
                key: Schema.primitive({
                    description: schema.key.description,
                    schema: convertToPrimitiveSchemaValue(schema.key.schema),
                    generatedName: schema.key.generatedName,
                    nameOverride: schema.key.nameOverride,
                    groupName: schema.groupName
                }),
                value: convertSchemaWithExampleToSchema(schema.value),
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                groupName: schema.groupName
            });
        case "reference":
            return Schema.reference({
                description: schema.description,
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                schema: schema.schema,
                groupName: schema.groupName
            });
        case "oneOf":
            return Schema.oneOf(convertToOneOf(schema.value));
        case "unknown":
            return Schema.unknown({ nameOverride: schema.nameOverride, generatedName: schema.generatedName });
        default:
            assertNever(schema);
    }
}

export function convertSchemaWithExampleToOptionalSchema(schema: SchemaWithExample): Schema {
    switch (schema.type) {
        case "object":
        case "array":
        case "enum":
        case "literal":
        case "nullable":
        case "primitive":
        case "map":
        case "reference":
        case "unknown":
            return Schema.optional({
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                description: schema.description,
                value: convertSchemaWithExampleToSchema(schema),
                groupName: schema.groupName
            });
        case "optional":
            return Schema.optional({
                generatedName: schema.generatedName,
                nameOverride: schema.nameOverride,
                description: schema.description,
                value: convertSchemaWithExampleToSchema(schema.value),
                groupName: schema.groupName
            });
        case "oneOf": {
            const oneOfSchema = convertToOneOf(schema.value);
            return Schema.optional({
                generatedName: oneOfSchema.generatedName,
                nameOverride: oneOfSchema.nameOverride,
                description: oneOfSchema.description,
                value: Schema.oneOf(convertToOneOf(schema.value)),
                groupName: oneOfSchema.groupName
            });
        }
        default:
            assertNever(schema);
    }
}

function convertToOneOf(oneOfSchema: OneOfSchemaWithExample): OneOfSchema {
    switch (oneOfSchema.type) {
        case "discriminated":
            return OneOfSchema.discriminated({
                commonProperties: oneOfSchema.commonProperties.map((commonProperty) => {
                    return {
                        key: commonProperty.key,
                        schema: convertSchemaWithExampleToSchema(commonProperty.schema)
                    };
                }),
                description: oneOfSchema.description,
                discriminantProperty: oneOfSchema.discriminantProperty,
                generatedName: oneOfSchema.generatedName,
                nameOverride: oneOfSchema.nameOverride,
                schemas: Object.fromEntries(
                    Object.entries(oneOfSchema.schemas).map(([discriminantValue, schemaWithExample]) => {
                        return [discriminantValue, convertSchemaWithExampleToSchema(schemaWithExample)];
                    })
                ),
                groupName: oneOfSchema.groupName
            });
        case "undisciminated":
            return OneOfSchema.undisciminated({
                description: oneOfSchema.description,
                generatedName: oneOfSchema.generatedName,
                nameOverride: oneOfSchema.nameOverride,
                schemas: oneOfSchema.schemas.map((oneOfSchema) => convertSchemaWithExampleToSchema(oneOfSchema)),
                groupName: oneOfSchema.groupName
            });
        default:
            assertNever(oneOfSchema);
    }
}

function convertToPrimitiveSchemaValue(primitiveSchema: PrimitiveSchemaValueWithExample): PrimitiveSchemaValue {
    switch (primitiveSchema.type) {
        case "string":
            return PrimitiveSchemaValue.string(primitiveSchema);
        case "base64":
            return PrimitiveSchemaValue.base64();
        case "boolean":
            return PrimitiveSchemaValue.boolean(primitiveSchema);
        case "date":
            return PrimitiveSchemaValue.date();
        case "datetime":
            return PrimitiveSchemaValue.datetime();
        case "double":
            return PrimitiveSchemaValue.double(primitiveSchema);
        case "float":
            return PrimitiveSchemaValue.float();
        case "int":
            return PrimitiveSchemaValue.int(primitiveSchema);
        case "int64":
            return PrimitiveSchemaValue.int64(primitiveSchema);
        default:
            assertNever(primitiveSchema);
    }
}

function convertToObjectProperty(objectProperty: ObjectPropertyWithExample): ObjectProperty {
    return {
        conflict: objectProperty.conflict,
        generatedName: objectProperty.generatedName,
        key: objectProperty.key,
        schema: convertSchemaWithExampleToSchema(objectProperty.schema),
        audiences: objectProperty.audiences,
        nameOverride: objectProperty.nameOverride
    };
}
