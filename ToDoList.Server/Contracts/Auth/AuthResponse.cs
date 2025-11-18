namespace ToDoList.Server.Contracts.Auth
{
    public record AuthResponse
    (
        string accessToken,
        string refreshToken
        );
}
