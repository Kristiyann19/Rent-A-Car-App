using Microsoft.AspNetCore.Authorization;
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
        private readonly IAdminService adminService;

        public AdminController(IUserService _userService, IAdminService _adminService)
        {
            userService = _userService;
            adminService = _adminService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUsersAsync();
            return Ok(users);
        }


        [HttpDelete("User/{userId}")]
        public async Task<IActionResult> DeleteAccount([FromRoute] int userId)
        {
            await adminService.DeleteUser(userId);
            return Ok();
        }

        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCar([FromRoute] int carId)
        {
            await adminService.DeleteCar(carId);
            return Ok();
        }
    }
}
