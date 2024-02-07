﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.CustomAttributes;
using RentACarApp.Dtos;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AuthorizeAdmin]
    public class AdminController : Controller
    {
        private readonly IUserService userService;
        private readonly ICarService carService;
        private readonly IAdminService adminService;

        public AdminController(IUserService _userService, ICarService _carService, IAdminService _adminService)
        {
            userService = _userService;
            carService = _carService;
            adminService = _adminService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUsersAsync();
            return Ok(users);
        }


        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteAccount(int userId)
        {
            await adminService.DeleteUser(userId);
            return Ok();
        }

        [HttpPut]
        [Route("UpdateAccount")]
        public async Task<IActionResult> UpdateAccount([FromBody] UserDto updateUser)
        {
            await userService.UpdateAccountAsync(HttpContext, updateUser);
            return Ok();
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


        //[HttpDelete("{carId}")]
        //public async Task<IActionResult> DeleteCar([FromRoute] int carId)
        //{
        //    await carService.DeleteCarAsync(carId, HttpContext);
        //    return Ok();
        //}
    }
}
