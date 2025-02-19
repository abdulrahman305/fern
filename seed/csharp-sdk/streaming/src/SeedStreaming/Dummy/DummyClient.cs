using System.Net.Http;
using System.Text.Json;
using SeedStreaming;
using SeedStreaming.Core;

#nullable enable

namespace SeedStreaming;

public class DummyClient
{
    private RawClient _client;

    public DummyClient(RawClient client)
    {
        _client = client;
    }

    public async Task GenerateStreamAsync(GenerateStreamRequest request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "generate-stream",
                Body = request
            }
        );
    }

    public async Task<StreamResponse> GenerateAsync(Generateequest request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "generate",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<StreamResponse>(responseBody)!;
        }
        throw new Exception(responseBody);
    }
}
