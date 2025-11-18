namespace ToDoList.Server.Contracts.Auth
{
    public record RegistrationRequest
    (
        string Login,
        string Password
        );
}
