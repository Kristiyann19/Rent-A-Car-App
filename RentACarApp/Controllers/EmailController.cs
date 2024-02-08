using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        private readonly IEmailService emailService;

        public EmailController(IEmailService _emailService)
        {
            emailService = _emailService;
        }


        [HttpPost]
        [Route("confirm-email")]
        public IActionResult ConfirmEmail([FromQuery] string token)
        {
            emailService.ConfirmEmailAddress(token);


            return Ok("Email confirmed successfully");
        }

    }
}
