using Microsoft.AspNetCore.Mvc;

namespace ToDoList.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RandomController : ControllerBase
    {
        private readonly ILogger<RandomController> logger;
        private readonly ApplicationContext context;
        public RandomController(ILogger<RandomController> logger, ApplicationContext context)
        {
            this.logger = logger;
            this.context = context;
        }

        [HttpGet("GetRandom")]
        public int GetRandom()
        {
            var random = new Random();
            return random.Next(101);
        }
    }
}
