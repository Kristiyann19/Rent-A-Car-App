using RentACarApp.Contracts;
using RentACarApp.Database;

namespace RentACarApp.Services
{
    public class AdminService : IAdminService
    {
        private readonly RentACarAppContext context;

        public AdminService(RentACarAppContext _context)
        {
            context = _context;
        }
        public async Task DeleteUser(int userId)
        {
            var user = context.Users.FirstOrDefault(u => u.Id == userId);

            if (user != null)
            {
                context.Users.Remove(user);
            }

            await context.SaveChangesAsync();
        }
    }
}
