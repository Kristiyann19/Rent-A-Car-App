using RentACarApp.Database.Models;

namespace RentACarApp.Contracts
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();

        Task<User> GetUserByIdAsync(int  id);
    }
}
