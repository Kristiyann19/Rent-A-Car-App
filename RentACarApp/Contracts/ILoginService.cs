using RentACarApp.Database.Models;

namespace RentACarApp.Contracts
{
    public interface ILoginService
    {
        public string Login(string username);
    }
}
