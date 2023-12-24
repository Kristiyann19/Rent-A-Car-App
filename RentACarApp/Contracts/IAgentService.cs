using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface IAgentService
    {
        Task BecomeAgentAsync(AgentDto agent, int userId);
    }
}
