/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedAudiences from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const Foo: core.serialization.ObjectSchema<serializers.folderB.Foo.Raw, SeedAudiences.folderB.Foo> =
    core.serialization.object({
        foo: core.serialization.lazyObject(() => serializers.folderC.Foo).optional(),
    });

export declare namespace Foo {
    interface Raw {
        foo?: serializers.folderC.Foo.Raw | null;
    }
}
