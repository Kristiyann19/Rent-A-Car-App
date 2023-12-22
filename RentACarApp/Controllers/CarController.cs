using Microsoft.AspNetCore.Mvc;

namespace RentACarApp.Controllers
{
    public class CarController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
