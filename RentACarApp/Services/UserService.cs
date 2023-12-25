using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;

namespace RentACarApp.Services
{
    public class UserService : IUserService
    {
        private readonly RentACarAppContext context;

        public UserService(RentACarAppContext _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
            => await context.Users.ToListAsync();

        public Task<User> GetUserByIdAsync(int id)
            => context.Users.FirstOrDefaultAsync(u => u.Id == id);
    }
}
