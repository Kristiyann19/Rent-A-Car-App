using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;

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

        public async Task BecomeAgentAsync(AgentDto updatedToAgent)
        {
          
            var existingUser = await context.Users
                    .FirstOrDefaultAsync(x => x.Id == updatedToAgent.Id);

            mapper.Map(updatedToAgent, existingUser);
    
            //RoleId must be set to 2 automatically

            await context.SaveChangesAsync();
            
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
            => await context.Users.ToListAsync();

        public Task<User> GetUserByIdAsync(int id)
            => context.Users.FirstOrDefaultAsync(u => u.Id == id);
    }
}
