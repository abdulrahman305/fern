using System.Text.Json.Serialization;
using SeedTrace;

#nullable enable

namespace SeedTrace;

public record BinaryTreeValue
{
    [JsonPropertyName("root")]
    public string? Root { get; init; }

    [JsonPropertyName("nodes")]
    public Dictionary<string, BinaryTreeNodeValue> Nodes { get; init; } =
        new Dictionary<string, BinaryTreeNodeValue>();
}
