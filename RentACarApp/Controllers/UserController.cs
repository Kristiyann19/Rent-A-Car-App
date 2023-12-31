﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentACarApp.Contracts;
using RentACarApp.Dtos;
using System.Security.Claims;

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

        [HttpGet("currentData")]
        public async Task<IActionResult> GetUserData()
        {
            return Ok(await userService.GetUserDataAsync(HttpContext));
        }

        [HttpGet]
        [Route("All")]
        public async Task<IActionResult> AllUsers()
        {
            var users = await userService.GetAllUsersAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> UserById([FromRoute] int id)
        {
            var user = await userService.GetUserByIdAsync(id);
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> BecomeAgent([FromBody] AgentDto updatedToAgent)
        {
            //var test = HttpContext.User.FindFirst(ClaimTypes.Name);
            await userService.BecomeAgentAsync(HttpContext, updatedToAgent);
            return Ok();
        }
    }
}
