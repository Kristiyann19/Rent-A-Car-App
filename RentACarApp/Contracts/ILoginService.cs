using RentACarApp.Dtos.UserDtos;

namespace RentACarApp.Contracts
{
    public interface ILoginService
    {
        string Login(LoginDto login);
    }
}
