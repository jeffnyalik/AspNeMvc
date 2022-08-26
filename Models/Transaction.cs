using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AllCrud.Models
{
    public class Transaction : Base
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public string BankName { get; set; }
        [DisplayName("Swift Code")]
        public string SwiftCode { get; set; }
        public int Amount { get; set; }
        [DisplayName("Transaction Date")]
        public DateTime Date { get; set; } = DateTime.Today;
    }
}
