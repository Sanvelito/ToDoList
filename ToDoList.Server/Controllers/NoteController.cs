using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using ToDoList.Server.Contracts.Notes;
using ToDoList.Server.Models;
using ToDoList.Server.Services;

namespace ToDoList.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly IJwtService jwtService;
        private readonly ApplicationContext context;

        public NoteController(ApplicationContext context, IJwtService jwtService)
        {
            this.context = context;
            this.jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote(CreateNoteRequest req)
        {
            //user from Claims through Identity
            User? user = await context.Users.FirstOrDefaultAsync(l => l.Login == User.Identity!.Name);
            if (user is null)
            {
                return Unauthorized();
            }

            Note? note = new Note
            {
                Name = req.Name,
                Description = req.Description,
                CreatedAt = DateTime.UtcNow,
                Difficulty = req.Difficulty,
                Status = req.Status,
                UserID = user.Id,
            };

            //db
            await context.Notes.AddAsync(note);
            await context.SaveChangesAsync();

            return Ok(note);
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            User? user = await context.Users.FirstOrDefaultAsync(l => l.Login == User.Identity!.Name);
            if (user is null)
            {
                return Unauthorized();
            }
            List<Note> notes = await context.Notes.Where(n => n.UserID == user.Id).ToListAsync();
            return Ok(notes);
        }

        [HttpPut ("{noteId}")]
        public async Task<IActionResult> UpdateNote(CreateNoteRequest req, int noteId)
        {
            User? user = await context.Users.FirstOrDefaultAsync(l => l.Login == User.Identity!.Name);
            if (user is null)
            {
                return Unauthorized();
            }

            Note? note = await context.Notes.FindAsync(noteId);
            if (note is null)
            {
                return NotFound();
            }

            note.Name = req.Name;
            note.Status = req.Status;
            note.Difficulty = req.Difficulty;
            note.Description = req.Description;

            await context.SaveChangesAsync();

            return Ok(note);
        }

        [HttpDelete ("{noteId}")]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            User? user = await context.Users.FirstOrDefaultAsync(l => l.Login == User.Identity!.Name);
            if (user is null)
            {
                return Unauthorized();
            }
            Note? note = await context.Notes.FindAsync(noteId);
            if (note is null)
            {
                return NotFound();
            }

            //db
            context.Notes.Remove(note);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
