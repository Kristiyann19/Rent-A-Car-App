using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using System.Security.Claims;

namespace RentACarApp.Services
{
    public class UserService : IUserService
    {
        private readonly RentACarAppContext context;
        private readonly IMapper mapper;


        public UserService(RentACarAppContext _context, IMapper _mapper)
        {
            context = _context;
            mapper = _mapper;
        }

        public async Task DeleteUserAsync(HttpContext httpContext)
        {
            var currentUser = await GetUserDataAsync(httpContext);

            var user = await context.Users.
                FirstOrDefaultAsync(x => x.Id == currentUser.Id);

            context.Users.Remove(user);

            await context.SaveChangesAsync();
        }

        public async Task UpdateAccountAsync(HttpContext httpContext, UserDto updateUser)
        {
            var user = await GetUserDataAsync(httpContext);

            var existingUser = await context.Users
                .FirstOrDefaultAsync(x => x.Id == user.Id);


            if (existingUser != null)
            {
                existingUser.UserName = updateUser.UserName;
                existingUser.Email = updateUser.Email;
                existingUser.FirstName = updateUser.FirstName;
                existingUser.LastName = updateUser.LastName;
                existingUser.PhoneNumber = updateUser.PhoneNumber;
            }

            await context.SaveChangesAsync();
        }


        public  async Task<bool> BecomeAgentAsync(HttpContext httpContext, AgentDto updatedToAgent)
        {
            try
            {
                var existingUserClaim = httpContext.User.FindFirst(ClaimTypes.Name);

                if (existingUserClaim != null)
                {
                    var userName = existingUserClaim.Value;

                    var existingUser = context.Users
                        .FirstOrDefault(x => x.UserName == userName);

                    if (existingUser != null)
                    {
                        existingUser.FirstName = updatedToAgent.FirstName;
                        existingUser.LastName = updatedToAgent.LastName;
                        existingUser.PhoneNumber = updatedToAgent.PhoneNumber;
                        existingUser.RoleId = 2;

                        await context.SaveChangesAsync();
                        return true;
                    }                  
                }
                return false;

            }
            catch (Exception)
            {

                return false;
            }

            
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
            => await context.Users.ToListAsync();

        public async Task<User> GetUserByIdAsync(int id)
            => await context.Users
            .Include(x => x.UserCars)
            .FirstOrDefaultAsync(u => u.Id == id);


        public async Task<UserDto> GetUserDataAsync(HttpContext httpContext)
        {
            var existingUserClaim = httpContext.User
                .FindFirst(ClaimTypes.Name);

            if (existingUserClaim != null)
            {
                var userName = existingUserClaim.Value;
                var existingUser = await context.Users
                    .Include(u => u.UserCars)
                    .Select(x => new UserDto 
                    {
                        Email = x.Email,
                        Id = x.Id,
                        RoleId = x.RoleId,
                        UserName = x.UserName,
                        RentalCars = x.RentalCars,
                        UserCars = x.UserCars,
                        FirstName = x.FirstName,
                        PhoneNumber = x.PhoneNumber,
                        LastName = x.LastName
                    })
                    .FirstOrDefaultAsync(x => x.UserName == userName);
                return existingUser;
            }

            return null;

        }


    }
}

