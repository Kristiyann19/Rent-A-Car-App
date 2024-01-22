using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Migrations;
using RentACarApp.Database.Models;
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

        [HttpGet]
        [Route("Count")]
        public async Task<IActionResult> TotalCars()
        {
            var totalCars = await carService.GetCarsCount();
            return Ok(totalCars);
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


        [HttpGet("{carId:int}/Image")]
        public async Task<IActionResult> GetFirstCarImage([FromRoute] int carId)
        {
            var car = await carService.GetCarImageByIdAsync(carId);

            if (car.Images.Any())
            {
                var firstCarImage = car.Images.OrderBy(e => e.Id).First();

                return File(firstCarImage.Bytes, "image/jpg", firstCarImage.Description);
            }

            return Ok();
        }


        [HttpGet("{carId:int}/Images")]
        public async Task<IActionResult> GetCarImages([FromRoute] int carId)
        {
            var car = await carService.GetCarImageByIdAsync(carId);

            var base64Images = new List<string>();

            if (car.Images.Any())
            {
                var images = car.Images.OrderBy(e => e.Id).ToList();

                foreach (var image in images)
                {
                    var base64string = Convert.ToBase64String(image.Bytes);

                    base64Images.Add(base64string);
                }
            }
            return Ok(base64Images);
        }


    }

}


//[HttpGet("{carId:int}/Images")]
//public async Task<IActionResult> GetCarImage([FromRoute] int carId)
//{
//    var car = await carService.GetCarImageByIdAsync(carId);

//    if (car.Images.Any())
//    {
//        var images = car.Images.OrderBy(e => e.Id).ToList();

//        var fileResponses = new List<FileContentResult>();

//        foreach (var image in images)
//        {
//            var fileResponse = File(image.Bytes, "image/jpg", image?.Description);
//            fileResponses.Add(fileResponse);
//        }

//        return fileResponses;
//    }

//    return Ok();
//}



//[HttpGet("{carId:int}/Images")]
//public async Task<IActionResult> GetCarImage([FromRoute] int carId)
//{
//    var car = await carService.GetCarImageByIdAsync(carId);

//    if (car.Images.Any())
//    {
//        var images = car.Images.OrderBy(e => e.Id).ToList();

//        var fileResponses = new List<object>();

//        foreach (var image in images)
//        {
//            var base64string = Convert.ToBase64String(image.Bytes);
//            var imageResponse = new Image
//            {
//                Description = image.Description,
//            }
//                }

//        return fileResponses;
//    }

//    return Ok();
//}