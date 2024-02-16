using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos.UserDtos;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private readonly IRegisterService registerService;

        public RegisterController(IRegisterService _registerService)
        {
            registerService = _registerService;
        }

        [HttpPost]
        public ActionResult Register([FromBody] RegisterDto register)
        {
            registerService.Register(register);

            return Ok();
        }

        [HttpGet("check-username/{username}")]
        public ActionResult UserNameValidation(string username)
        {
            var isAvailable = registerService.CheckUserNameAvailability(username);

            return Ok(isAvailable);
        }

        [HttpGet("check-email/{email}")]
        public ActionResult EmailValidation(string email)
        {
            var isAvailable = registerService.CheckEmailAvailability(email);

            return Ok(isAvailable);
        }
    }
}
