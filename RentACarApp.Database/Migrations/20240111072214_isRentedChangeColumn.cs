using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentACarApp.Database.Migrations
{
    /// <inheritdoc />
    public partial class isRentedChangeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isActive",
                table: "Cars",
                newName: "isRented");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isRented",
                table: "Cars",
                newName: "isActive");
        }
    }
}
