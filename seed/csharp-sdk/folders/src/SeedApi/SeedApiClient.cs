using System.Net.Http;
using SeedApi.A;
using SeedApi.Core;
using SeedApi.Folder;

#nullable enable

namespace SeedApi;

public partial class SeedApiClient
{
    private RawClient _client;

    public SeedApiClient(ClientOptions? clientOptions = null)
    {
        _client = new RawClient(
            new Dictionary<string, string>() { { "X-Fern-Language", "C#" }, },
            clientOptions ?? new ClientOptions()
        );
        A = new AClient(_client);
        Folder = new FolderClient(_client);
    }

    public AClient A { get; init; }

    public FolderClient Folder { get; init; }

    public async Task FooAsync()
    {
        await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest { Method = HttpMethod.Post, Path = "" }
        );
    }
}
