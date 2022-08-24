using AllCrud.Data.AppContext;
using AllCrud.Models;
using Microsoft.AspNetCore.Mvc;

namespace AllCrud.Controllers
{
    public class ContactController : Controller
    {
        private ProjectDbContext _context;
        ContactViewModel cVModel = new ContactViewModel();
        public ContactController(ProjectDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(Contact contact)
        {
            if (ModelState.IsValid)
            {
                _context.Contacts.Add(contact);
                _context.SaveChanges();
                return Json(new { success = true, message = "Successfully added" });
            }

            return View(contact);
            
        }
    }
}
