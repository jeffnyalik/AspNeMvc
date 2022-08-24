using Microsoft.AspNetCore.Mvc;

namespace AllCrud.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
