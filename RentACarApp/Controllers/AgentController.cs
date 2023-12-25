using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos;
using RentACarApp.Services;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentController : Controller
    {
        private readonly IAgentService agentService;

        public AgentController(IAgentService _agentService)
        {
            agentService = _agentService;
        }

        [HttpPost]
        public async Task<IActionResult> BecomeAgent([FromBody] AgentDto agent, int userId)
        {
            await agentService.BecomeAgentAsync(agent, userId);

            return Ok();
        }
    }
}
