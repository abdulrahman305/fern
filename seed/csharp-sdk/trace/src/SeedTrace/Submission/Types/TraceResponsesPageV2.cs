using System.Text.Json.Serialization;
using SeedTrace;

#nullable enable

namespace SeedTrace;

public record TraceResponsesPageV2
{
    /// <summary>
    /// If present, use this to load subseqent pages.
    /// The offset is the id of the next trace response to load.
    /// </summary>
    [JsonPropertyName("offset")]
    public int? Offset { get; init; }

    [JsonPropertyName("traceResponses")]
    public IEnumerable<TraceResponseV2> TraceResponses { get; init; } = new List<TraceResponseV2>();
}
