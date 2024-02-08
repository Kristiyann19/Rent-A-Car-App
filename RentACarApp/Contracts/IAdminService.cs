namespace RentACarApp.Contracts
{
    public interface IAdminService
    {
        Task DeleteUser(int userId);

        Task DeleteCar(int carId);
    }
}
