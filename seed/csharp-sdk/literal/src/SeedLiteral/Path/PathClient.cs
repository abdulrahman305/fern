using System.Net.Http;
using System.Text.Json;
using SeedLiteral;
using SeedLiteral.Core;

#nullable enable

namespace SeedLiteral;

public class PathClient
{
    private RawClient _client;

    public PathClient(RawClient client)
    {
        _client = client;
    }

    public async Task<SendResponse> SendAsync(string id)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest { Method = HttpMethod.Post, Path = $"path/{id}" }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<SendResponse>(responseBody)!;
        }
        throw new Exception(responseBody);
    }
}
