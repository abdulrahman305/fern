using System.Text.Json.Serialization;
using SeedTrace.V2;

#nullable enable

namespace SeedTrace.V2;

public record GetBasicSolutionFileRequest
{
    [JsonPropertyName("methodName")]
    public required string MethodName { get; init; }

    [JsonPropertyName("signature")]
    public required NonVoidFunctionSignature Signature { get; init; }
}
