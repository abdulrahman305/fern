using System.Net.Http;
using System.Text.Json;
using SeedOauthClientCredentials.Auth;
using SeedOauthClientCredentials.Core;

#nullable enable

namespace SeedOauthClientCredentials.Auth;

public class AuthClient
{
    private RawClient _client;

    public AuthClient(RawClient client)
    {
        _client = client;
    }

    public async Task<TokenResponse> GetTokenAsync(GetTokenRequest request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/token",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<TokenResponse>(responseBody)!;
        }
        throw new Exception(responseBody);
    }
}
