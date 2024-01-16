using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;


namespace RentACarApp.Hubs
{
    public class ChatHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            return base.OnConnectedAsync();
        }

        public Task SendMessageToGroup(string receiver, string message)
        {
            return Clients.Group(receiver).SendAsync("ReceiveMessage", Context.User.Identity.Name, message);
        }
    }
}
