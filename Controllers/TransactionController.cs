using AllCrud.Data.AppContext;
using AllCrud.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;
using System.Data;
namespace AllCrud.Controllers
{
    public class TransactionController : Controller
    {   
        private readonly ILogger _logger;
        private readonly ProjectDbContext _context;
        

        public TransactionController(ProjectDbContext context, ILogger<TransactionController>logger)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            
            return View();
        }

        public IActionResult LoadData()
        {
            var data = _context.Transactions.ToList();
            return Json(data);
        }

        public ActionResult Edit(int id = 0)
        {
            var data = (from li in _context.Transactions.AsEnumerable()
                        where li.Id == Convert.ToInt32(id)
                        select new
                        {
                            id = li.Id,
                            bankName = li.BankName,
                            swiftCode = li.SwiftCode,
                            amount = li.Amount,
                            phoneNumber = li.PhoneNumber
                        }).FirstOrDefault();
            return Json(data);
        }

        //check if a record exist then update if not 
        //create a new record
        [HttpPost]
        public ActionResult CreateEdit(Transaction empobj)
        {
            if(empobj.Id > 0)
            {
                var res = new Transaction()
                {   Id = empobj.Id,
                    Amount = empobj.Amount,
                    BankName = empobj.BankName,
                    PhoneNumber = empobj.PhoneNumber,
                    SwiftCode = empobj.SwiftCode
                };
                _context.Entry(res).State = EntityState.Modified;
                _context.SaveChanges();
                return Json(new { message = "Details updated successfully" });
            }
            else
            {
                var res = new Transaction()
                {   
                    
                    Amount = empobj.Amount,
                    BankName = empobj.BankName,
                    PhoneNumber = empobj.PhoneNumber,
                    SwiftCode = empobj.SwiftCode
                };
                _context.Transactions.Add(res);
                _context.SaveChanges();
                return Json(new { message = "Item created  successfully" });
            }
        }

        public JsonResult Delete(int id)
        {
            var data = _context.Transactions.FirstOrDefault(x => x.Id == id);
            _context.Transactions.Remove(data);
            _context.SaveChanges();
            return Json(new { message = "Data has been removed" });
        }
    }
}
