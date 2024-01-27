using Microsoft.AspNetCore.Mvc;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        [HttpGet]
        public IActionResult AdminPage()
        {

            return Ok();
        }
    }
}
