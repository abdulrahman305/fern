using System.Net.Http;
using System.Text.Json;
using SeedExhaustive.Core;

#nullable enable

namespace SeedExhaustive.Endpoints;

public class PrimitiveClient
{
    private RawClient _client;

    public PrimitiveClient(RawClient client)
    {
        _client = client;
    }

    public async Task<string> GetAndReturnStringAsync(string request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/string",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<string>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<int> GetAndReturnIntAsync(int request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/integer",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<int>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<long> GetAndReturnLongAsync(long request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/long",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<long>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<double> GetAndReturnDoubleAsync(double request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/double",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<double>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<bool> GetAndReturnBoolAsync(bool request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/boolean",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<bool>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<DateTime> GetAndReturnDatetimeAsync(DateTime request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/datetime",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<DateTime>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<DateOnly> GetAndReturnDateAsync(DateOnly request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/date",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<DateOnly>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<Guid> GetAndReturnUuidAsync(Guid request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/uuid",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<Guid>(responseBody)!;
        }
        throw new Exception(responseBody);
    }

    public async Task<string> GetAndReturnBase64Async(string request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/primitive/base64",
                Body = request
            }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<string>(responseBody)!;
        }
        throw new Exception(responseBody);
    }
}
