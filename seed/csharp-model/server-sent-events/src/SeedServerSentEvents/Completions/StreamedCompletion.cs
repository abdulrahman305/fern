using System.Text.Json.Serialization;

#nullable enable

namespace SeedServerSentEvents;

public record StreamedCompletion
{
    [JsonPropertyName("delta")]
    public required string Delta { get; init; }

    [JsonPropertyName("tokens")]
    public int? Tokens { get; init; }
}
