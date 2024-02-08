using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private readonly IRegisterService registerService;
        private readonly IEmailService emailService;

        public RegisterController(IRegisterService _registerService, IEmailService _emailService)
        {
            registerService = _registerService;
            emailService = _emailService;
        }

        [HttpPost]
        public ActionResult Register([FromBody] RegisterDto register)
        {
            registerService.Register(register);

            return Ok();
        }

        [HttpPut]
        [Route("confirm-email")]
        public IActionResult ConfirmEmail([FromQuery] string token)
        {
            emailService.ConfirmEmailAddress(token);


            return Ok("Email confirmed successfully");
        }


    }


}
