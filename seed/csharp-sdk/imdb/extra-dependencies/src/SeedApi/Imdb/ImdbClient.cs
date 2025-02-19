using System.Net.Http;
using System.Text.Json;
using SeedApi;
using SeedApi.Core;

#nullable enable

namespace SeedApi;

public class ImdbClient
{
    private RawClient _client;

    public ImdbClient(RawClient client)
    {
        _client = client;
    }

    /// <summary>
    /// Add a movie to the database
    /// </summary>
    public async Task<string> CreateMovieAsync(CreateMovieRequest request)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                Method = HttpMethod.Post,
                Path = "/movies/create-movie",
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

    public async Task<Movie> GetMovieAsync(string movieId)
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest { Method = HttpMethod.Get, Path = $"/movies/{movieId}" }
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            return JsonSerializer.Deserialize<Movie>(responseBody)!;
        }
        throw new Exception(responseBody);
    }
}
