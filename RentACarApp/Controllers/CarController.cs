using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos;

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

        [HttpPost]
        public async Task<IActionResult> AddCar([FromBody] AddCarDto car)
        {
            await carService.AddCarAsync(car);
            return Ok();
        }

        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCar([FromRoute] int carId)
        {
            await carService.DeleteCarAsync(carId);
            return Ok();
        }
    }
}
