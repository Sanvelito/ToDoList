namespace ToDoList.Server.Contracts.Notes
{
    public record NoteResponse(
        int Id,
        string Name,
        string? Description,
        DateTime CreatedAt,
        string? Dificulty,
        string? Status,
        int UserID
        );
}
