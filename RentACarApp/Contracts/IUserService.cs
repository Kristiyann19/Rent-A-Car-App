﻿using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();

        Task<User> GetUserByIdAsync(int id);

        Task<bool> BecomeAgentAsync(HttpContext httpContext, AgentDto updatedToAgent);

        Task<UserDto> GetUserDataAsync(HttpContext httpContext);

        Task DeleteUserAsync(HttpContext httpContext);
    }
}
