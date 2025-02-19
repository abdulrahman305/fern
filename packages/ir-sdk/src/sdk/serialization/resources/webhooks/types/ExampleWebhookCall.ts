/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernIr from "../../../../api";
import * as core from "../../../../core";

export const ExampleWebhookCall: core.serialization.ObjectSchema<
    serializers.ExampleWebhookCall.Raw,
    FernIr.ExampleWebhookCall
> = core.serialization
    .objectWithoutOptionalProperties({
        name: core.serialization.lazyObject(async () => (await import("../../..")).Name).optional(),
        payload: core.serialization.lazyObject(async () => (await import("../../..")).ExampleTypeReference),
    })
    .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithDocs));

export declare namespace ExampleWebhookCall {
    interface Raw extends serializers.WithDocs.Raw {
        name?: serializers.Name.Raw | null;
        payload: serializers.ExampleTypeReference.Raw;
    }
}
