namespace SeedExhaustive.Endpoints;

public record GetWithMultipleQuery
{
    public required string Query { get; init; }

    public required int Numer { get; init; }
}
