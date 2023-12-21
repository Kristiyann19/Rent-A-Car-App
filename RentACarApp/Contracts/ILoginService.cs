using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ILoginService
    {
        string HashPassword(string password);
        string Login(LoginDto login);
    }
}
