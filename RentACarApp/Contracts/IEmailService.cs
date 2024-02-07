namespace RentACarApp.Contracts
{
    public interface IEmailService
    {
        void ConfirmEmailAddress(string token);

        void SendConfirmationEmail(string recipientEmail, string token);
    }
}
