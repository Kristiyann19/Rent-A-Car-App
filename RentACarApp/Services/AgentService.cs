using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
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
            //var user = context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            //TODO
            throw new ArgumentException();
        }
    }

}
