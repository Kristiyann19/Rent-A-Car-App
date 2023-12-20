using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using RentACarApp.Services;

namespace RentACarApp.Controllers
{
    [ApiController]
    public class RegisterController : Controller
    {
        private readonly RegisterService registerService;

        public RegisterController(RegisterService _registerService)
        {
            registerService = _registerService;
        }

        [HttpPost]
        public ActionResult Register([FromBody]RegisterDto register)
        {
            registerService.Register(register);

            return Ok();
        }   

        
    }
}
