using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface IRegisterService
    {
        void Register(RegisterDto register);

        void ConfirmEmailAddress(string token);

        void SendConfirmationEmail(string recipientEmail, string token);
    }
}
