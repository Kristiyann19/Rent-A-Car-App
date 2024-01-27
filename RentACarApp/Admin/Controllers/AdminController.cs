using Microsoft.AspNetCore.Mvc;

namespace RentACarApp.Admin.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
