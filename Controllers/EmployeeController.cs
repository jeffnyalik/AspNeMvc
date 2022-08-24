using AllCrud.Data.AppContext;
using AllCrud.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AllCrud.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly ProjectDbContext _context;
        public EmployeeController(ProjectDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {

            return Json(_context.Employees.ToList());
           
        }

        [HttpGet]
        public IActionResult AddOrEdit(int id = 0)
        {
            return View(new Employee());
        }
        [HttpPost]
        public IActionResult AddOrEdit(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return Json(new { success = true, message = "Saved successfully" });
        }
    }
}
