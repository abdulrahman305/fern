using System.Text.Json.Serialization;
using SeedTrace.V2;

#nullable enable

namespace SeedTrace.V2;

public record GetGeneratedTestCaseFileRequest
{
    [JsonPropertyName("template")]
    public TestCaseTemplate? Template { get; init; }

    [JsonPropertyName("testCase")]
    public required TestCaseV2 TestCase { get; init; }
}
