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

        [HttpGet("{carId:int}")]
        public async Task<IActionResult> CarById([FromRoute] int carId)
        {
            var reuslt = await carService.GetCarByIdAsync(carId);
            return Ok(reuslt);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchCar([FromQuery] CarDto car)
        {
            var result = await carService.SeachInCarAsync(car);

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCar([FromBody] CarDto updatedCar)
        {
            await carService.UpdateCarAsync(updatedCar);
            return Ok();
        }
    }
}
