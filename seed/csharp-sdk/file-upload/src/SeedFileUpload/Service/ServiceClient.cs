using System.Net.Http;
using SeedFileUpload;
using SeedFileUpload.Core;

#nullable enable

namespace SeedFileUpload;

public class ServiceClient
{
    private RawClient _client;

    public ServiceClient(RawClient client)
    {
        _client = client;
    }

    public async Task PostAsync(MyRequest request)
    {
        await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest { Method = HttpMethod.Post, Path = "" }
        );
    }

    public async Task JustFileAsync(JustFileRequet request)
    {
        await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest { Method = HttpMethod.Post, Path = "/just-file" }
        );
    }

    public async Task JustFileWithQueryParamsAsync(JustFileWithQueryParamsRequet request)
    {
        var _query = new Dictionary<string, object>()
        {
            { "integer", request.Integer.ToString() },
            { "listOfStrings", request.ListOfStrings },
        };
        if (request.MaybeString != null)
        {
            _query["maybeString"] = request.MaybeString;
        }
        if (request.MaybeInteger != null)
        {
            _query["maybeInteger"] = request.MaybeInteger.ToString();
        }
        if (request.OptionalListOfStrings != null)
        {
            _query["optionalListOfStrings"] = request.OptionalListOfStrings;
        }
        await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/just-file-with-query-params",
                Query = _query
            }
        );
    }
}
