using Microsoft.EntityFrameworkCore;
using ToDoList.Server.Models;

namespace ToDoList.Server
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => x.Login).IsUnique();
            });

            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.HasOne<User>().WithMany(u => u.ToDos).HasForeignKey(t => t.UserID);
            });
        }
    }
}
