using System.Text.Json.Serialization;
using SeedTrace;

#nullable enable

namespace SeedTrace;

public record WorkspaceStarterFilesResponse
{
    [JsonPropertyName("files")]
    public Dictionary<Language, WorkspaceFiles> Files { get; init; } =
        new Dictionary<Language, WorkspaceFiles>();
}
