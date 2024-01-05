using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using System.IdentityModel.Tokens.Jwt;
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

        public  async Task<bool> BecomeAgentAsync(HttpContext httpContext, AgentDto updatedToAgent)
        {
            try
            {
                var existingUserClaim = httpContext.User.FindFirst(ClaimTypes.Name);

                if (existingUserClaim != null)
                {
                    var userName = existingUserClaim.Value;

                    var existingUser = context.Users.FirstOrDefault(x => x.UserName == userName);

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

            //mapper.Map(updatedToAgent, existingUser);                      
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
            => await context.Users.ToListAsync();

        public Task<User> GetUserByIdAsync(int id)
            => context.Users.FirstOrDefaultAsync(u => u.Id == id);
    }
}
