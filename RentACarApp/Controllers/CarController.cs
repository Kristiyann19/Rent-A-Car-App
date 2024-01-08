using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CarController : Controller
    {
        private readonly ICarService carService;

        public CarController(ICarService _carService)
        {
            carService = _carService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> AllCars()
        {
            var cars = await carService.GetAllCarsAsync();

            return Ok(cars);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddCar([FromBody] AddCarDto car)
        {
            await carService.AddCarAsync(HttpContext, car);
            return Ok();
        }

        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCar([FromRoute] int carId)
        {
            await carService.DeleteCarAsync(carId);
            return Ok();
        }


        [AllowAnonymous]
        [HttpGet("{carId:int}")]
        public async Task<IActionResult> CarById([FromRoute] int carId)
        {
            var reuslt = await carService.GetCarByIdAsync(carId);
            return Ok(reuslt);
        }

        [AllowAnonymous]
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
