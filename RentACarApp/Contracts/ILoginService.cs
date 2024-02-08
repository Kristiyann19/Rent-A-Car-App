using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ILoginService
    {
        string Login(LoginDto login);
    }
}
