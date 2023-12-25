using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Services
{
    public class AgentService : IAgentService
    {
        private readonly RentACarAppContext context;

        public AgentService(RentACarAppContext _context)
        {
            context = _context;
        }

        public async Task BecomeAgentAsync(AgentDto agent, int userId)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            
            if (user == null)
            {
                user.Id = userId;
                user.FirstName = agent.FirstName;
                user.LastName = agent.LastName;
                user.PhoneNumber = agent.PhoneNumber;
                user.RoleId = 2;

                await context.SaveChangesAsync();
            }
           
        }
    }

}
