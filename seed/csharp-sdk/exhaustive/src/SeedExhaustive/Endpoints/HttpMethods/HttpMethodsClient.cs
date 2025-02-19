using System.Net.Http;
using System.Text.Json;
using SeedExhaustive.Core;
using SeedExhaustive.Types;

#nullable enable

namespace SeedExhaustive.Endpoints;

public class HttpMethodsClient
{
    private RawClient _client;

    public HttpMethodsClient(RawClient client)
    {
        _client = client;
    }

    public async Task<string> TestGetAsync(string id)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest { Method = HttpMethod.Get, Path = $"/http-methods/{id}" }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<string>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<ObjectWithOptionalField> TestPostAsync(ObjectWithRequiredField request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/http-methods",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<ObjectWithOptionalField>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<ObjectWithOptionalField> TestPutAsync(
        string id,
        ObjectWithRequiredField request
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Put,
                Path = $"/http-methods/{id}",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<ObjectWithOptionalField>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<ObjectWithOptionalField> TestPatchAsync(
        string id,
        ObjectWithOptionalField request
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethodExtensions.Patch,
                Path = $"/http-methods/{id}",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<ObjectWithOptionalField>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<bool> TestDeleteAsync(string id)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Delete,
                Path = $"/http-methods/{id}"
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<bool>(responseBody)!;
        }
        throw new Exception(responseBody);
    }
}
