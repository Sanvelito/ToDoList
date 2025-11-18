namespace ToDoList.Server.Contracts.Auth
{
    public record LoginRequest
    (
        string Login,
        string Password
        );
}
