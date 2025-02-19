using System.Text.Json.Serialization;
using SeedTrace.V2.V3;

#nullable enable

namespace SeedTrace.V2.V3;

public record TestCaseTemplate
{
    [JsonPropertyName("templateId")]
    public required string TemplateId { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("implementation")]
    public required TestCaseImplementation Implementation { get; init; }
}
