using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface IRegisterService
    {
        void Register(RegisterDto register);

        public bool CheckUserNameAvailability(string userName);
    }
}
