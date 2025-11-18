namespace ToDoList.Server.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Difficulty { get; set; }
        public string? Status { get; set; }
        public int UserID { get; set; }

    }
}
