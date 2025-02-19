using System.Text.Json.Serialization;
using SeedTrace;

#nullable enable

namespace SeedTrace;

public record GetDefaultStarterFilesResponse
{
    [JsonPropertyName("files")]
    public Dictionary<Language, ProblemFiles> Files { get; init; } =
        new Dictionary<Language, ProblemFiles>();
}
