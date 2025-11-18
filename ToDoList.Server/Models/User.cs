namespace ToDoList.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;
        public List<Note> ToDos { get; set; } = null!;
        
    }
}
