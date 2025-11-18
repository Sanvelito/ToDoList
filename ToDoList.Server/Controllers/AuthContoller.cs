using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using ToDoList.Server.Contracts.Auth;
using ToDoList.Server.Models;
using ToDoList.Server.Services;

namespace ToDoList.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase

    {
        private readonly IJwtService jwtService;
        private readonly ApplicationContext context;

        public AuthController(ApplicationContext context, IJwtService jwtService)
        {
            this.context = context;
            this.jwtService = jwtService;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration(RegistrationRequest req)
        {
            User? user = await context.Users.FirstOrDefaultAsync(l => l.Login == req.Login);
            if (user is not null)
            {
                return BadRequest(new {message = "This Login is alredy used!"});
            }
            user = new User { Login = req.Login};

            using HMACSHA512 hsha = new();
            using Stream stream = new MemoryStream(Encoding.UTF8.GetBytes(req.Password));
            byte[] passwardHash = await hsha.ComputeHashAsync(stream);

            user.PasswordHash = passwardHash;
            user.PasswordSalt = hsha.Key;

            //db
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            //jwt tokens
            var accessJwt = jwtService.GenerateToken(user.Login);
            var refreshJwt = jwtService.GenerateRefreshToken(user.Login);
            return Ok(new AuthResponse(accessJwt, refreshJwt));
        }

        [HttpPost ("login")]
        public async Task<IActionResult> Login(LoginRequest req)
        {
            User? user = await context.Users.FirstOrDefaultAsync(l => l.Login == req.Login);
            if (user is null)
            {
                return BadRequest(new { message = "Wrong login or password :(" });
            }

            using HMACSHA512 hsha = new(user.PasswordSalt);
            using Stream stream = new MemoryStream(Encoding.UTF8.GetBytes(req.Password));
            byte[] passwardHash = await hsha.ComputeHashAsync(stream);

            if(!user.PasswordHash.SequenceEqual(passwardHash))
            {
                return BadRequest(new { message = "Wrong login or password :(" });
            }

            //jwt tokens
            var accessJwt = jwtService.GenerateToken(user.Login);
            var refreshJwt = jwtService.GenerateRefreshToken(user.Login);
            return Ok(new AuthResponse(accessJwt, refreshJwt));
        }

        [Authorize("refreshPolicy")]
        [HttpGet ("refresh")]
        public async Task<IActionResult> Refresh()
        {
            //user from Claims through Identity
            User? user = await context.Users.FirstOrDefaultAsync(l => l.Login == User.Identity!.Name);
            if (user is null)
            {
                return Unauthorized();
            }

            //jwt tokens
            var accessJwt = jwtService.GenerateToken(user.Login);
            var refreshJwt = jwtService.GenerateRefreshToken(user.Login);
            return Ok(new AuthResponse(accessJwt, refreshJwt));
        }
    }
}
