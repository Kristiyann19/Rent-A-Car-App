using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : Controller
    {
        private readonly ICarService carService;

        public CarController(ICarService _carService)
        {
            carService = _carService;
        }

        [HttpGet]
        public async Task<IActionResult> AllCars()
        {
            var cars = await carService.GetAllCarsAsync();

            return Ok(cars);
        }
    }
}
