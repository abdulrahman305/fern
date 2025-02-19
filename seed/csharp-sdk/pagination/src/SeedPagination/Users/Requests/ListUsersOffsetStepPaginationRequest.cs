using SeedPagination;

#nullable enable

namespace SeedPagination;

public record ListUsersOffsetStepPaginationRequest
{
    /// <summary>
    /// Defaults to first page
    /// </summary>
    public int? Page { get; init; }

    /// <summary>
    /// The maxiumum number of elements to return.
    /// This is also used as the step size in this
    /// paginated endpoint.
    /// </summary>
    public int? Limit { get; init; }

    public Order? Order { get; init; }
}
