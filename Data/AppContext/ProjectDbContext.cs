using AllCrud.Models;
using Microsoft.EntityFrameworkCore;

namespace AllCrud.Data.AppContext
{
    public class ProjectDbContext : DbContext
    {
        public ProjectDbContext(DbContextOptions<ProjectDbContext> options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Transaction>Transactions { get; set; }
    }
}
