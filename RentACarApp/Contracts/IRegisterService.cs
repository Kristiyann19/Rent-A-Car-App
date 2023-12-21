using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface IRegisterService
    {
        string HashPassword(string password);
        void Register(RegisterDto register);
    }
}
