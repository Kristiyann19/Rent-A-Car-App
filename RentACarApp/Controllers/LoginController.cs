using Microsoft.AspNetCore.Mvc;
using RentACarApp.Dtos;
using RentACarApp.Services;

namespace RentACarApp.Controllers
{
    public class LoginController : Controller
    {

        private readonly LoginService loginService;

        public LoginController(LoginService _loginService)
        {
            loginService = _loginService;
        }

        public IActionResult Login(LoginDto loginDto)
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
