using System.Net.Http;
using System.Text.Json;
using SeedExhaustive.Core;
using SeedExhaustive.Types;

#nullable enable

namespace SeedExhaustive.Endpoints;

public class ContainerClient
{
    private RawClient _client;

    public ContainerClient(RawClient client)
    {
        _client = client;
    }

    public async Task<IEnumerable<string>> GetAndReturnListOfPrimitivesAsync(
        IEnumerable<string> request
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/container/list-of-primitives",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<IEnumerable<string>>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<IEnumerable<ObjectWithRequiredField>> GetAndReturnListOfObjectsAsync(
        IEnumerable<ObjectWithRequiredField> request
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/container/list-of-objects",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<IEnumerable<ObjectWithRequiredField>>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<HashSet<string>> GetAndReturnSetOfPrimitivesAsync(HashSet<string> request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/container/set-of-primitives",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<HashSet<string>>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<HashSet<ObjectWithRequiredField>> GetAndReturnSetOfObjectsAsync(
        HashSet<ObjectWithRequiredField> request
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/container/set-of-objects",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<HashSet<ObjectWithRequiredField>>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<Dictionary<string, string>> GetAndReturnMapPrimToPrimAsync(
        Dictionary<string, string> request
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/container/map-prim-to-prim",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<Dictionary<string, string>>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<
        Dictionary<string, ObjectWithRequiredField>
    > GetAndReturnMapOfPrimToObjectAsync(Dictionary<string, ObjectWithRequiredField> request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/container/map-prim-to-object",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<Dictionary<string, ObjectWithRequiredField>>(
                responseBody
            )!;
        }
        throw new Exception(responseBody);
    }

    public async Task<ObjectWithRequiredField?> GetAndReturnOptionalAsync(
        ObjectWithRequiredField? request
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/container/opt-objects",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<ObjectWithRequiredField?>(responseBody)!;
        }
        throw new Exception(responseBody);
    }
}
