using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        private readonly ILoginService loginService;

        public LoginController(ILoginService _loginService) 
        {
            loginService = _loginService;
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginDto loginDto)
        {
            var token = loginService.Login(loginDto);

            if (!string.IsNullOrEmpty(token))
            {
                return Ok(new { Token = token });
            }

            return Unauthorized("Invalid credentials");
        }
    }
}
