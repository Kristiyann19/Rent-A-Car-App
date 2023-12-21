using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentACarApp.Database.Migrations
{
    /// <inheritdoc />
    public partial class ConfirmedEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailConfirmed",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
