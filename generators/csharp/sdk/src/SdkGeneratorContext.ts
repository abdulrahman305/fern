import { AbstractCsharpGeneratorContext, AsIsFiles, csharp } from "@fern-api/csharp-codegen";
import { RelativeFilePath } from "@fern-api/fs-utils";
import {
    FernFilepath,
    HttpEndpoint,
    HttpService,
    Name,
    ServiceId,
    Subpackage,
    SubpackageId,
    TypeId,
    TypeReference
} from "@fern-fern/ir-sdk/api";
import { camelCase, upperFirst } from "lodash-es";
import { CLIENT_OPTIONS_CLASS_NAME } from "./client-options/ClientOptionsGenerator";
import { SdkCustomConfigSchema } from "./SdkCustomConfig";

const TYPES_FOLDER_NAME = "Types";

export class SdkGeneratorContext extends AbstractCsharpGeneratorContext<SdkCustomConfigSchema> {
    /**
     * Returns the service with the given id
     * @param serviceId
     * @returns
     */
    public getHttpServiceOrThrow(serviceId: ServiceId): HttpService {
        const service = this.ir.services[serviceId];
        if (service == null) {
            throw new Error(`Service with id ${serviceId} not found`);
        }
        return service;
    }

    public getSubpackageOrThrow(subpackageId: SubpackageId): Subpackage {
        const subpackage = this.ir.subpackages[subpackageId];
        if (subpackage == null) {
            throw new Error(`Subpackage with id ${subpackageId} not found`);
        }
        return subpackage;
    }

    /**
     * __package__.yml types are stored in a Types directory (e.g. /src/Types)
     * __{{file}}__.yml types are stored in a directory with the same name as the file
     * (e.g. /src/{{file}}/Types)
     *
     * @param typeId The type id of the type declaration
     * @returns
     */
    public getDirectoryForTypeId(typeId: TypeId): RelativeFilePath {
        const typeDeclaration = this.getTypeDeclarationOrThrow(typeId);
        return RelativeFilePath.of(
            [
                ...typeDeclaration.name.fernFilepath.allParts.map((path) => path.pascalCase.safeName),
                TYPES_FOLDER_NAME
            ].join("/")
        );
    }

    public getNamespaceForTypeId(typeId: TypeId): string {
        const typeDeclaration = this.getTypeDeclarationOrThrow(typeId);
        return this.getNamespaceFromFernFilepath(typeDeclaration.name.fernFilepath);
    }

    public getAsIsFiles(): string[] {
        return [
            AsIsFiles.RawClient,
            AsIsFiles.StringEnumSerializer,
            AsIsFiles.OneOfSerializer,
            AsIsFiles.CollectionItemSerializer,
            AsIsFiles.HttpMethodExtensions
        ];
    }

    public getNamespaceForServiceId(serviceId: ServiceId): string {
        const service = this.getHttpServiceOrThrow(serviceId);
        return this.getNamespaceFromFernFilepath(service.name.fernFilepath);
    }

    public getDirectoryForSubpackage(subpackage: Subpackage): string {
        return RelativeFilePath.of(
            [...subpackage.fernFilepath.allParts.map((path) => path.pascalCase.safeName)].join("/")
        );
    }

    public getDirectoryForServiceId(serviceId: ServiceId): string {
        const service = this.getHttpServiceOrThrow(serviceId);
        return RelativeFilePath.of(
            [...service.name.fernFilepath.allParts.map((path) => path.pascalCase.safeName)].join("/")
        );
    }

    public getSubpackageClassReference(subpackage: Subpackage): csharp.ClassReference {
        return csharp.classReference({
            name: `${subpackage.name.pascalCase.unsafeName}Client`,
            namespace: this.getNamespaceFromFernFilepath(subpackage.fernFilepath)
        });
    }

    public getRootClientClassName(): string {
        if (this.customConfig["client-class-name"] != null) {
            return this.customConfig["client-class-name"];
        }
        return `${upperFirst(camelCase(this.config.organization))}${this.ir.apiName.pascalCase.unsafeName}Client`;
    }

    public getRawClientClassReference(): csharp.ClassReference {
        return csharp.classReference({
            name: "RawClient",
            namespace: this.getCoreNamespace()
        });
    }

    public getEnvironmentsClassReference(): csharp.ClassReference {
        return csharp.classReference({
            name: "Environments",
            namespace: this.getCoreNamespace()
        });
    }

    public getClientOptionsClassReference(): csharp.ClassReference {
        return csharp.classReference({
            name: CLIENT_OPTIONS_CLASS_NAME,
            namespace: this.getCoreNamespace()
        });
    }

    public getRequestWrapperReference(serviceId: ServiceId, requestName: Name): csharp.ClassReference {
        const service = this.getHttpServiceOrThrow(serviceId);
        RelativeFilePath.of([...service.name.fernFilepath.allParts.map((path) => path.pascalCase.safeName)].join("/"));
        return csharp.classReference({
            name: requestName.pascalCase.safeName,
            namespace: this.getNamespaceForServiceId(serviceId)
        });
    }

    public getEndpointMethodName(endpoint: HttpEndpoint): string {
        return `${endpoint.name.pascalCase.safeName}Async`;
    }

    public getExtraDependencies(): Record<string, string> {
        return this.customConfig["extra-dependencies"] ?? {};
    }

    private getNamespaceFromFernFilepath(fernFilepath: FernFilepath): string {
        return [this.getNamespace(), ...fernFilepath.packagePath.map((path) => path.pascalCase.safeName)].join(".");
    }

    public isOptional(typeReference: TypeReference): boolean {
        switch (typeReference.type) {
            case "container":
                return typeReference.container.type === "optional";
            case "named": {
                const typeDeclaration = this.getTypeDeclarationOrThrow(typeReference.typeId);
                if (typeDeclaration.shape.type === "alias") {
                    return this.isOptional(typeDeclaration.shape.aliasOf);
                }
                return false;
            }
            case "unknown":
                return true;
            case "primitive":
                return false;
        }
    }
}
