using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos;
using RentACarApp.Services;

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
        public async Task<IActionResult> AllCars([FromQuery] int page = 1, [FromQuery] int pageSize = 12)
        {
            var cars = await carService.GetAllCarsAsync(page, pageSize);
         
            return Ok(cars);
        }

      

        [HttpPost]
        public async Task<IActionResult> AddCar([FromForm] AddCarDto car) //changed
        {
            await carService.AddCarAsync(HttpContext, car);
            return Ok();
        }

        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCar([FromRoute] int carId)
        {
            await carService.DeleteCarAsync(carId, HttpContext);
            return Ok();
        }

        [HttpDelete("RemoveRented/{carId}")]
        public async Task<IActionResult> RemoveFromRented([FromRoute] int carId)
        {
            await carService.RemoveFromRentedAsync(carId, HttpContext);
            return Ok();
        }


        [HttpGet("{carId:int}")]
        public async Task<IActionResult> CarById([FromRoute] int carId)
        {
            var reuslt = await carService.GetCarByIdAsync(carId);
            return Ok(reuslt);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchCar([FromQuery] SearchCarDto car)
        {
            var result = await carService.SeachInCarAsync(car);

            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCar([FromRoute] int id, [FromBody] CarDto updatedCar)
        {
            await carService.UpdateCarAsync(id, updatedCar, HttpContext);
            return Ok();
        }

        [HttpGet("RentedCars")]
        public async Task<IActionResult> RentedCars()
        {
            var rentedCars = await carService.GetRentedCarsAsync(HttpContext);
            return Ok(rentedCars);
        }

        [HttpPost("{carId}")]
        public async Task<IActionResult> RentCar([FromRoute] int carId)
        {
            await carService.RentCarAsync(carId, HttpContext);
            return Ok();
        }

        [HttpGet("AgentCars")]
        public async Task<IActionResult> PostedCars()
        {
            var postedCars = await carService.GetPostedCarsAsync(HttpContext);
            return Ok(postedCars);
        }

    }
}
