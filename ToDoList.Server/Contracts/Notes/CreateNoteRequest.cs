namespace ToDoList.Server.Contracts.Notes
{
    public record CreateNoteRequest(
        string Name,
        string? Description,
        string Difficulty,
        string Status
    );
}
