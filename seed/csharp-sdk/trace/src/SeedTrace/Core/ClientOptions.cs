using System.Net.Http;
using SeedTrace.Core;

#nullable enable

namespace SeedTrace.Core;

public partial class ClientOptions
{
    /// <summary>
    /// The Base URL for the API.
    /// </summary>
    public string BaseUrl { get; init; } = Environments.PROD;

    /// <summary>
    /// The http client used to make requests.
    /// </summary>
    public HttpClient HttpClient { get; init; } = new HttpClient();

    /// <summary>
    /// The http client used to make requests.
    /// </summary>
    public int MaxRetries { get; init; } = 2;

    /// <summary>
    /// The timeout for the request in seconds.
    /// </summary>
    public int TimeoutInSeconds { get; init; } = 30;
}
