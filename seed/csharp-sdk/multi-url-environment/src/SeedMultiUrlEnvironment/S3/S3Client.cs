using System.Net.Http;
using System.Text.Json;
using SeedMultiUrlEnvironment;
using SeedMultiUrlEnvironment.Core;

#nullable enable

namespace SeedMultiUrlEnvironment;

public class S3Client
{
    private RawClient _client;

    public S3Client(RawClient client)
    {
        _client = client;
    }

    public async Task<string> GetPresignedUrlAsync(GetPresignedUrlRequest request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/s3/presigned-url",
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
