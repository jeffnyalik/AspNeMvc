using AllCrud.Data.AppContext;
using AllCrud.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AllCrud.Controllers
{
    public class TransactionController : Controller
    {
        ProjectDbContext _context;
        public TransactionController(ProjectDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            return View();
        }

        public async Task<IActionResult> LoadData()
        {
            var data = await _context.Transactions.ToListAsync();
            return Json(data);
        }

        public ActionResult Edit(string id)
        {
            var data = (from li in _context.Transactions.AsEnumerable()
                        where li.Id == Convert.ToInt32(id)
                        select new
                        {
                            id = li.Id,
                            accountNumber = li.AccountNumber,
                            bankName = li.BankName,
                            benefeciaryName = li.BeneficiaryName,
                            swiftCode = li.SwiftCode,
                            amount = li.Amount,
                            phoneNumber = li.PhoneNumber
                        }).FirstOrDefault();
            return Json(data);
        }
        
      /*  public IActionResult GetTransactions()
        {
            
            var res = _context.Transactions.OrderBy(a =>a.CreatedAt).ToList();
            return Json(res);
        }*/

       
     /*   public JsonResult GetTransactionById(int id)
        {
            var transaction = _context.Transactions.Where(x => x.Id == id).FirstOrDefault();
           *//* if(transaction == null)
            {
                return Json(new { message = $"Transaction with ID={id} does not exist" });
            }*//*

            return Json(transaction);
        }*/

        /*public IActionResult Edit(int id)
        {
            var transaction = _context.Transactions.Where(x => x.Id == id).FirstOrDefault();
            return PartialView("EditPartial", transaction);
        }*/


        [HttpPost]
        public JsonResult Save(Transaction transaction)
        {
            if (ModelState.IsValid)
            {
                var res = new Transaction()
                {
                    AccountNumber = transaction.AccountNumber,
                    BeneficiaryName = transaction.BeneficiaryName,
                    BankName = transaction.BankName,
                    SwiftCode = transaction.SwiftCode,
                    Date = transaction.Date,
                    Amount = transaction.Amount,
                    PhoneNumber = transaction.PhoneNumber
                };
                _context.Transactions.Add(res);
                _context.SaveChanges();
                return Json(new { success = true, message = "Successfully added" });
            }

            return Json(new { success = false, message = "An error has occured" });
        }
    }
}
