﻿using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using System.Runtime.CompilerServices;

namespace RentACarApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;

        public UserController(IUserService _userService)
        {
            userService = _userService;
        }

        [HttpGet]
        public async Task<IActionResult> AllUsers()
        {
            var users = await userService.GetAllUsersAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> UserById([FromRoute] int id)
        {
            await userService.GetUserByIdAsync(id);
            return Ok();
        }
    }
}
